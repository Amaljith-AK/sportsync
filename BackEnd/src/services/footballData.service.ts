import axios from "axios";

const client = axios.create({
    baseURL:process.env.FOOTBALL_DATA_BASE_URL || 'https://api.football-data.org/v4',
    headers:{'X-Auth-Token':process.env.FOOTBALL_DATA_KEY}
})

export const footballDataService = {
    async getMatches(competitionCode:string){
        const res = await client.get(`/competitions/${competitionCode}/matches`)
        return res.data
    },

    async getStandings(competitionCode:string){
        const res = await client.get(`/competitions/${competitionCode}/standings`)
        return res.data
    }
}