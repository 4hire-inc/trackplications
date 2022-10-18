import express, { NextFunction, Request, Response, Router } from 'express';
import passport, { authController } from '../controllers/authController';

const router: Router = express.Router();

router.get('/error', (req: Request, res: Response): Response => {
  console.log('in error');
  return res.send('Unknown Error');
});

router.get('/linkedin', passport.authenticate('linkedin', { state: '' }));

router.get('/linkedin/callback', (req: Request, res: Response, next: NextFunction) => {
  console.log('in callback before authenticate');
  return next();  
}, passport.authenticate('linkedin', {
  failureRedirect: '/error'
}), authController.getUserId, (req: any, res: Response): void => {
  console.log('in callback');
  res.cookie('code', req.query.code);
  res.cookie('email', req.user?.emails[0].value);
  res.cookie('username', req.user?.username);
  res.cookie('isLoggedIn', true);
  return res.redirect('../../');
});

router.post('/logout', (req: Request, res: Response, next: NextFunction): void => {
  req.logout({ keepSessionInfo: false }, next);
  return res.redirect('../../');
});

export default router;