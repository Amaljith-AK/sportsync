import { Router } from 'express';
import { prisma } from '../lib/prisma';


const router = Router()


router.get('/matches/:code',async(req,res)=>{
    try{
        const recentPast = await prisma.match.findMany({
            where:{
                competitionCode: req.params.code,
                utcDate:{
                    gte:new Date(Date.now()- 7 * 86400000),
                    lt:new Date()
                },
            },
            include:{
                homeTeam:true,
                awayTeam:true,
                prediction:true
            },
            orderBy:{
                utcDate:'desc'
            },
            take:10
        });


        const upcoming = await prisma.match.findMany({
            where:{
                competitionCode:req.params.code,
                utcDate:{
                    gte:new Date()
                }
            },
            include:{
                homeTeam:true,awayTeam:true,prediction:true
            },
            orderBy:{
                utcDate:'asc'
            },
            take:10
        })

        res.json([...recentPast.reverse(),...upcoming]);
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
        const standings = await prisma.standing.findMany({
            where:{
                competitionCode: req.params.code
            },
            include:{
                team:true
            },
            orderBy:{
                position:'asc'
            }
        });
        res.json(standings);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch standings' });
    }
})
    
router.get('/health',(req,res)=>{
    res.json({status:'ok',time:new Date().toISOString()})
})

export default router;