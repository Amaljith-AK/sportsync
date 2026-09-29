import cron from 'node-cron'
import { prisma } from '../lib/prisma'
import { mlPredictionService } from '../services/mlPrediction.service';
import { COMPETITIONS } from '../models/competition.model';


function sleep(ms:number){
    return new Promise((resolve)=>setTimeout(resolve,ms))
}

const ONE_HOUR = 60 * 60 * 1000;
const UPCOMING_PER_LEAGUE = 10;

async function predictWithRetry(homeTeamId: number, awayTeamId: number, retries = 2): Promise<any> {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await mlPredictionService.predict(homeTeamId, awayTeamId);
        } catch (err: any) {
            if (attempt === retries) throw err;
            const status = err?.response?.status;
            const wait = status === 429 ? 30000 : 20000; // ← changed
            console.log(`⏳ Retry ${attempt + 1} for Django in ${wait / 1000}s (status: ${status ?? 'unknown'})`);
            await sleep(wait);
        }
    }
}

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
                const result = await predictWithRetry(match.homeTeamId, match.awayTeamId);

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
