import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { footballDataService } from '../services/footballData.service';


const router = Router()

router.get('/matches/:code',async(req,res)=>{
    try{
        const matches = await prisma.match.findMany({
            where:{
                competitionCode: req.params.code,
                utcDate:{
                    gte:new Date(Date.now()-86400000),
                    lte:new Date(Date.now() + 7 * 86400000)
                },
            },
            include:{
                homeTeam:true,
                awayTeam:true
            },
            orderBy:{
                utcDate:'asc'
            }
        });
        res.json(matches);
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Failed to fetch matches'})
    }
})

router.get('/matches/live', async(req,res)=>{
    try{
        const matches = await prisma.match.findMany({
            where:{
                status:{
                    in:['IN_PLAY','PAUSED']
                }
            },
            include:{
                homeTeam:true,
                awayTeam:true
            }
        });
        res.json(matches);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch live matches' });
    }
})


router.get('/matches/:id',async(req,res)=>{
    try{
        const match = await prisma.match.findUnique({
            where:{
                id:Number(req.params.id)
            },
            include:{
                homeTeam:true,
                awayTeam:true
            }
        });
        res.json(match)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch match' });
    }
})


router.get('/standings/:code',async(req,res)=>{
    try{
        const data = await footballDataService.getStandings(req.params.code)
        res.json(data)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch standings' });
    }
})

export default router;