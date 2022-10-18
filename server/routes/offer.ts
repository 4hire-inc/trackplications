import { Router, Request, Response } from 'express';
import offerController from '../controllers/offerController';

const router = Router();

router.patch('/', offerController.updateOffer, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.offerInfo);
});

//Post Request: route to add offer
router.post('/', offerController.postOffer, (req: Request, res: Response)=> {
  res.status(200).send('posted the offer!');
});

export default router;