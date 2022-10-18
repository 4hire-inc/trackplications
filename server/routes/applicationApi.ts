import express, { NextFunction, Request, Response } from 'express';
import applicationController from '../controllers/applicationController';

const router = express.Router();

// Get Request: route to send back all application info
router.get('/', applicationController.getApplications, (req: Request, res: Response)=> {
  res.status(200);
});


export default router; 