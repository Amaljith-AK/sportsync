import cron from 'node-cron';
import { syncService } from '../services/sync.service';


const COMPETITIONS = ['PL', 'PD', 'BL1', 'SA'];

export function startScheduler() {
    cron.schedule('0 */6 * * *',async ()=>{

        for(const code of COMPETITIONS){
            console.log(`⏰ Running scheduled sync for ${code}...`)
            try{
                await syncService.syncCompetition(code);
            }catch(err){
                console.error(`❌ Scheduled sync failed for ${code}:`, err);
            }
        }
    });

    console.log('📅 Scheduler initialized — syncing every 6 hours',COMPETITIONS.join(', '))
}