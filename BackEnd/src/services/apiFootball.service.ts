import axios from "axios";


const client = axios.create({
    baseURL:process.env.API_FOOTBALL_BASE_URL || 'https://v3.football.api-sports.io',
    headers:{
        'x-apisports-key':process.env.API_FOOTBALL_KEY
    }
})

export const apiFootballService = {
    async getFixtureById(fixtureId:number){
        const res = await client.get('/fixtures',{params:{id:fixtureId}})
        return res.data.response[0]
    }
}