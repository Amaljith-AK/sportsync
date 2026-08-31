import cron from 'node-cron'
import { prisma } from '../lib/prisma';
import { livePollService } from '../services/livePoll.service';


export function startLiveCheckJob(){
    // Runs every 5 minutes
    cron.schedule('*/5 * * * *',async ()=>{
        try{
            const now = new Date();

            const candidates = await prisma.match.findMany({
                where:{
                    status:'SCHEDULED',
                    utcDate:{
                        lte:now,
                        gte:new Date(now.getTime() - 150 * 60 * 1000)
                    }
                }
            })

            for (const match of candidates){
                console.log(`🔍 Match ${match.id} kicked off, starting live polling...`);
                await livePollService.startPolling(match.id)
            }

        }catch(err){
            console.error('❌ Live check job failed:', err);
        }
    });
    console.log('📡 Live check job initialized — checking every 5 minutes')
}