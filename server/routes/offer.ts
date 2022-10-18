import { Router, Request, Response } from 'express';
import offerController from '../controllers/offerController';

const router = Router();

router.patch('/', offerController.updateOffer, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.offerInfo);
});

export default router;