import express, { NextFunction, Request, Response, Router } from 'express';
import { authController } from '../controllers/authController';
import passport from '../controllers/authController';

const router: Router = express.Router();

router.get('/error', (req: Request, res: Response): Response => {
  console.log('in error');
  return res.send('Unknown Error');
});

router.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));

router.get('/linkedin/callback', (req: Request, res: Response, next: NextFunction) => {
  console.log('in callback before authenticate');
  return next();  
}, passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/'
}), authController.getUserId, (req: any, res: Response): void => {
  console.log('in callback');
  res.cookie('code', req.query.code);
  res.cookie('email', req.user.emails[0].value);
  res.cookie('username', req.user.username);
  res.cookie('isLoggedIn', true);
  return res.redirect('../../');
});

router.post('/logout', (req: any, res: Response, next: NextFunction): void => {
  req.logout();
  return res.redirect('../../');
});

export default router;