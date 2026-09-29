import cron from 'node-cron'
import { prisma } from '../lib/prisma'
import { mlPredictionService } from '../services/mlPrediction.service';
import { COMPETITIONS } from '../models/competition.model';


function sleep(ms:number){
    return new Promise((resolve)=>setTimeout(resolve,ms))
}

const ONE_HOUR = 60 * 60 * 1000;
const UPCOMING_PER_LEAGUE = 10;

async function predictUpcomingFixtures(){

    // Fetch each league's next fixtures in parallel (cheap DB reads)
    const upcomingByLeague = await Promise.all(
        COMPETITIONS.map((leagueCode)=>
            prisma.match.findMany({
                where:{
                    status:{in:['SCHEDULED','TIMED']},
                    competitionCode:leagueCode
                },
                select:{
                    id:true,
                    homeTeamId:true,
                    awayTeamId:true,
                    prediction:{select:{computedAt:true}}
                },
                orderBy:{utcDate:'asc'},
                take:UPCOMING_PER_LEAGUE
            })
        )
    )

    for (const [i, upcoming] of upcomingByLeague.entries()){
        const leagueCode = COMPETITIONS[i]

        const needsPrediction = upcoming.filter((m)=>{
            if(!m.prediction) return true
            return Date.now() - m.prediction.computedAt.getTime() > ONE_HOUR
        })

        console.log(`🔮 [${leagueCode}] Predicting ${needsPrediction.length} fixtures (${upcoming.length} total upcoming)...`)

        // ML calls stay sequential, gentle on Django's cold-start-prone free tier
        for (const match of needsPrediction){
            try{
                const result = await mlPredictionService.predict(match.homeTeamId,match.awayTeamId)

                await prisma.prediction.upsert({
                    where:{matchId:match.id},
                    update:{
                        homeWinPct:result.home_win_pct,
                        drawPct:result.draw_pct,
                        awayWinPct:result.away_win_pct,
                        computedAt:new Date()
                    },
                    create:{
                        matchId:match.id,
                        homeWinPct:result.home_win_pct,
                        drawPct:result.draw_pct,
                        awayWinPct:result.away_win_pct
                    }
                })
                console.log(`✅ Predicted match ${match.id}`);
            }catch(err){
                console.error(`❌ Failed to predict match ${match.id}:`, err);
            }
            await sleep(3000); // small pause between calls
        }
    }

    console.log('🎉 Prediction sweep complete');
}

// Temp unused
export function startPredictionScheduler(){
    cron.schedule('*/10 * * * *',()=>{
        predictUpcomingFixtures().catch(console.error)
    })
    console.log('📅 Prediction scheduler initialized — running every 10m')
}

export { predictUpcomingFixtures };
