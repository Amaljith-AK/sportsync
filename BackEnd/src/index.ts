import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import cors from 'cors';
import http from 'http';
import footballRoutes from './routes/football.routes';
import { startScheduler } from './jobs/scheduler';
import { initLiveGateway } from './sockets/liveGateway';
import { startLiveCheckJob } from './jobs/liveCheck.job';


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/football',footballRoutes)

startScheduler();
startLiveCheckJob();

const server = http.createServer(app)
initLiveGateway(server)

const PORT = process.env.PORT || 4000
server.listen(PORT,()=>console.log(`SportSync API running on port ${PORT}`))