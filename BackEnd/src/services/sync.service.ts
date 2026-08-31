import { prisma } from "../lib/prisma";
import { footballDataService } from "./footballData.service";

export const syncService = {
    async syncCompetition(code:string){
        const data = await footballDataService.getMatches(code)

        for (const m of data.matches){
            await prisma.team.upsert({
                where:{id:m.homeTeam.id},
                update:{
                    name: m.homeTeam.name,
                    tla: m.homeTeam.tla,
                    crestUrl: m.homeTeam.crest
                },
                create:{
                    id: m.homeTeam.id,
                    name: m.homeTeam.name,
                    tla: m.homeTeam.tla,
                    crestUrl: m.homeTeam.crest
                }
            });

            await prisma.team.upsert({
                where:{id:m.awayTeam.id},
                update:{
                    name:m.awayTeam.name,
                    tla:m.awayTeam.tla,
                    crestUrl:m.awayTeam.crest
                },
                create:{
                    id:m.awayTeam.id,
                    name:m.awayTeam.name,
                    tla:m.awayTeam.tla,
                    crestUrl:m.awayTeam.crest
                }
            });

            await prisma.match.upsert({
                where:{id:m.id},
                update:{
                    status:m.status,
                    homeScore:m.score.fullTime.home,
                    awayScore:m.score.fullTime.away,
                    winner: m.score.winner
                },
                create:{
                    id: m.id,
                    competitionCode: code,
                    season: m.season.id,
                    matchday: m.matchday,
                    utcDate: m.utcDate,
                    status: m.status,
                    homeTeamId: m.homeTeam.id,
                    awayTeamId: m.awayTeam.id,
                    homeScore: m.score.fullTime.home,
                    awayScore: m.score.fullTime.away,
                    winner: m.score.winner,
                }
            })
        }
        console.log(`✅ Synced ${data.matches.length} matches for ${code}`)
    }
}