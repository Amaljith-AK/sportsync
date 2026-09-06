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
    },

    async syncStandings(code:string){
        const data = await footballDataService.getStandings(code)

        const total = data.standings.find((s:any)=>s.type === 'TOTAL')
        if(!total) return;

        for (const row of total.table){
            await prisma.team.upsert({
                where:{id:row.team.id},
                update:{
                    name: row.team.name,
                    tla: row.team.tla,
                    crestUrl: row.team.crest
                },
                create:{
                    id: row.team.id,
                    name: row.team.name,
                    tla: row.team.tla,
                    crestUrl: row.team.crest
                }
            });

            await prisma.standing.upsert({
                where:{
                    competitionCode_teamId:{
                        competitionCode: code,
                        teamId: row.team.id
                    }
                },
                update:{
                    season: data.season.id,
                    position: row.position,
                    playedGames: row.playedGames,
                    won: row.won,
                    draw: row.draw,
                    lost: row.lost,
                    points: row.points,
                    goalsFor: row.goalsFor,
                    goalsAgainst: row.goalsAgainst,
                    goalDifference: row.goalDifference
                },
                create:{
                    competitionCode: code,
                    season: data.season.id,
                    teamId: row.team.id,
                    position: row.position,
                    playedGames: row.playedGames,
                    won: row.won,
                    draw: row.draw,
                    lost: row.lost,
                    points: row.points,
                    goalsFor: row.goalsFor,
                    goalsAgainst: row.goalsAgainst,
                    goalDifference: row.goalDifference
                }
            })
        }
        console.log(`✅ Synced standings for ${code}`)
    }
}