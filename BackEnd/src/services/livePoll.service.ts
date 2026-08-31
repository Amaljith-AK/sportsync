import axios from "axios";
import { prisma } from "../lib/prisma";
import { broadcastLiveUpdate } from "../sockets/liveGateway";


const client = axios.create({
    baseURL: process.env.API_FOOTBALL_BASE_URL || 'https://v3.football.api-sports.io',
    headers: { 'x-apisports-key': process.env.API_FOOTBALL_KEY }
})

const activePolls = new Map<number,NodeJS.Timeout>()

async function resolveApiFootballFixtureId(matchId:number):Promise<number | null>{
    const match = await prisma.match.findUnique({
        where:{
            id:matchId
        },
        include:{
            homeTeam:true,
            awayTeam:true
        }
    })

    if(!match) return null

    const res = await client.get('/fixtures',{params:{live:'all'}})
    const candidates = res.data.response;

    const found = candidates.find((f:any)=>{
        f.teams.home.name.includes(match.homeTeam.name.split(' ')[0]) &&
        f.teams.away.name.includes(match.awayTeam.name.split(' ')[0])
    })

    return found ? found.fixture.id : null
}


export const livePollService = {
    async startPolling(matchId:number){
        if(activePolls.has(matchId)) return

        const apiFootballId = await resolveApiFootballFixtureId(matchId)
        if(!apiFootballId){
            console.warn(`⚠️ Could not resolve API-Football fixture for match ${matchId}`);
            return;
        }

        const interval = setInterval(async ()=>{
            try{
                const res = await client.get('/fixtures',{params:{id:apiFootballId}})
                const fixture = res.data.response[0]

                if(!fixture) return

                const status = fixture.fixture.status.short //? 1H, HT, 2H, FT
                const homeScore = fixture.goals.home
                const awayScore = fixture.goals.away

                const mappedStatus = status == 'FT' ? 'FINISHED' : 'IN_PLAY'

                await prisma.match.update({
                    where:{
                        id:matchId
                    },
                    data:{
                        status:mappedStatus,
                        homeScore,
                        awayScore
                    }
                })

                broadcastLiveUpdate({matchId,homeScore,awayScore,status:mappedStatus})

                if(mappedStatus == 'FINISHED'){
                    this.stopPolling(matchId);
                }

            }catch(err){
                console.error(`❌ Live poll failed for match ${matchId}:`, err)
            }
        },60_000) //? Every 60s trigger
    
        activePolls.set(matchId,interval)
        console.log(`▶️ Started live polling for match ${matchId}`);

    },

    stopPolling(matchId:number){
        const interval = activePolls.get(matchId)
        if(interval){
            clearInterval(interval)
            activePolls.delete(matchId)
            console.log(`⏹️ Stopped live polling for match ${matchId}`);
        }
    }

}