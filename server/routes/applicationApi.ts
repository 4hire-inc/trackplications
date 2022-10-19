import express, { Request, Response } from 'express';
import applicationController from '../controllers/applicationController';
import { authController } from '../controllers/authController';

const router = express.Router();

// Get Request: route to send back all application info
router.get('/', applicationController.getApplications, (req: Request, res: Response) => {
  console.log('got applications!');
  res.status(200).json(res.locals.applications);
});

router.post('/', applicationController.addApplication, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.createdApp);
});

router.delete('/:id', applicationController.deleteApplication, (req: Request, res: Response) => {
  res.status(200).send(res.locals.deleted);
});

router.patch('/', applicationController.updateApplication, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.appInfo);
});




export default router; 