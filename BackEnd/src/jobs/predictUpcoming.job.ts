import cron from 'node-cron'
import { prisma } from '../lib/prisma'
import { mlPredictionService } from '../services/mlPrediction.service';


function sleep(ms:number){
    return new Promise((resolve)=>setTimeout(resolve,ms))
}

async function predictUpcomingFixtures(){

    const ONE_HOUR = 60 * 60 * 1000;

    const upcoming = await prisma.match.findMany({
        where:{
            status:{in:['SCHEDULED','TIMED']},
            utcDate:{
                gte:new Date(),
                lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // next 7 days
            }
        },
        include:{prediction:true}
    })

    const needsPrediction = upcoming.filter((m)=>{
        if(!m.prediction) return true
        return Date.now() - m.prediction.computedAt.getTime() > ONE_HOUR
    })

    console.log(`🔮 Predicting ${needsPrediction.length} fixtures (${upcoming.length} total upcoming)...`)

    for (const match of upcoming){
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
        await sleep(500); // small pause between calls, gentle on Django's cold-start-prone free tier
    }

    console.log('🎉 Prediction sweep complete');
}


export function startPredictionScheduler(){
    cron.schedule('*/10 * * * *',()=>{
        predictUpcomingFixtures().catch(console.error)
    })
    console.log('📅 Prediction scheduler initialized — running every 10m')
}

export { predictUpcomingFixtures };