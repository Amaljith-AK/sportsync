
import { Router } from 'express';
import { runManualSync } from '../jobs/scheduler';
import { predictUpcomingFixtures } from '../jobs/predictUpcoming.job';
import { enrichAllTeams } from '../jobs/enrichTeams.job';
import { adminAuth } from '../middleware/adminAuth';


const router = Router();

router.use(adminAuth);
router.post('/verify', (req, res) => {
  res.json({ valid: true });
});

router.post('/sync-now', async (req, res) => {
  try {
    await runManualSync();
    res.json({ message: 'Sync + standings complete' });
  } catch (err) {
    res.status(500).json({ message: 'Sync failed', error: String(err) });
  }
});

router.post('/predict-now', async (req, res) => {
  predictUpcomingFixtures().catch(console.error);
  res.json({ message: 'Prediction sweep started — check logs' });
});

router.post('/enrich-teams', async (req, res) => {
  enrichAllTeams().catch(console.error);
  res.json({ message: 'Team enrichment started — check logs' });
});

export default router;