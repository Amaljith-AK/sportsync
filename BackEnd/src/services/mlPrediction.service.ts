import axios from 'axios'

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

export const mlPredictionService = {
    async predict(homeTeamId:number,awayTeamId:number){
        const res = await axios.post(`${ML_SERVICE_URL}/api/predict`,{
            homeTeamId,awayTeamId
        })
        return res.data as {
            home_win_pct:number,
            draw_pct:number,
            away_win_pct:number,
        }
    }
}