import { prisma } from '../lib/prisma';
import { footballDataService } from '../services/footballData.service';


const DELAY_MS = 6500

function sleep(ms:number){
    return new Promise(((resolve)=>setTimeout(resolve,ms)))
}

export async function enrichAllTeams(){
    const teams = await prisma.team.findMany({
        where:{
            OR:[{stadium:null},{founded:null}]
        }
    })
    console.log(`🔧 Enriching ${teams.length} teams with stadium/founded/manager data...`);

    for (const team of teams){
        try{
            const detail = await footballDataService.getTeam(team.id);
            await prisma.team.update({
              where: { id: team.id },
              data: {
                stadium: detail.venue ?? null,
                founded: detail.founded ?? null,
                manager: detail.coach?.name ?? null,
                clubColors: detail.clubColors ?? null,
              },
            });
            console.log(`✅ Enriched ${team.name} (stadium: ${detail.venue ?? 'N/A'}, founded: ${detail.founded ?? 'N/A'})`);
        }catch(err){
            console.error(`❌ Failed to enrich team ${team.id} (${team.name}):`, (err as Error).message);
        }
        await sleep(DELAY_MS);
    }
    console.log('🎉 Team enrichment complete');

}