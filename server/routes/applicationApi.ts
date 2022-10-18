import express, { Request, Response } from 'express';
import applicationController from '../controllers/applicationController';

const router = express.Router();

// Get Request: route to send back all application info
router.get('/', applicationController.getApplications, (req: Request, res: Response) => {
  console.log('got applications!');
  res.status(200).json(res.locals.applications);
});

router.delete('/:id', applicationController.deleteApplication, (req: Request, res: Response) => {
  res.status(200).send(res.locals.deleted);
});

//Post Request: route to add offer
router.post('/', applicationController.postOffer, (req: Request, res: Response)=> {
  res.status(200).send('posted the offer!');
});

router.patch('/', applicationController.updateApplication, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.appInfo);
});




export default router; 