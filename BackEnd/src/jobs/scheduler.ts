import cron from 'node-cron';
import { syncService } from '../services/sync.service';
import { predictUpcomingFixtures } from './predictUpcoming.job';


const COMPETITIONS = ['PL', 'PD', 'BL1', 'SA'];

export function startScheduler() {
    cron.schedule('0 * * * *',async ()=>{

        for(const code of COMPETITIONS){
            console.log(`⏰ Running scheduled sync for ${code}...`)
            try{
                await syncService.syncCompetition(code);
                await syncService.syncStandings(code);
            }catch(err){
                console.error(`❌ Scheduled sync failed for ${code}:`, err);
            }
        }

        try{
            await predictUpcomingFixtures();
        }catch(err){
            console.error('❌ Prediction sweep failed:', err);
        }
    });

    console.log('📅 Scheduler initialized — syncing every hour',COMPETITIONS.join(', '))
}


export async function runManualSync(){
    for (const code of COMPETITIONS){
        await syncService.syncCompetition(code);
        await syncService.syncStandings(code);
    }
}