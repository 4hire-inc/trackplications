import express, { NextFunction, Request, Response, Router } from 'express';
import passport, { authController } from '../controllers/authController';

const router: Router = express.Router();

router.get('/error', (req: Request, res: Response): Response => {
  return res.send('Unknown Error');
});

router.get('/linkedin', passport.authenticate('linkedin', { state: '' }));

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect: '/error'
}), authController.getUserId, (req: any, res: Response): void => {
  res.cookie('code', req.query.code);
  res.cookie('email', req.user?.emails[0].value);
  return res.redirect('../../authenticate');
});

router.post('/logout', (req: Request, res: Response, next: NextFunction): void => {
  req.logout({ keepSessionInfo: false }, next);
  return res.redirect('../../');
});

export default router;