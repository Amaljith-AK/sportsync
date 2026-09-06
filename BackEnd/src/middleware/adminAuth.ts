import { Request, Response, NextFunction } from 'express';

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const key = req.headers['x-admin-key'];

  if (!process.env.ADMIN_SECRET_KEY) {
    console.error('ADMIN_SECRET_KEY is not set in environment variables');
    return res.status(500).json({ message: 'Server misconfiguration' });
  }

  if (key !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
}