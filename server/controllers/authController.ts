import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { Profile, Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import db from '../models/applicationModel';

type linkedInSettingsType = {
  clientID: string,
  clientSecret: string,
  callbackURL: string,
  scope: string[],
}

type authType = {
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => void;
  getUserId: (req: Request, res: Response, next: NextFunction) => void;
};

type DoneType = (err: Error | null, user: Express.User) => void



const linkedInSettings: linkedInSettingsType = {
  clientID: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  callbackURL: 'http://localhost:3000/auth/linkedin/callback',
  scope:['r_emailaddress', 'r_liteprofile'],
};

passport.serializeUser(function (user: Express.User, done: DoneType) {
  done(null, user);
});

passport.deserializeUser(function (user: Express.User, done: DoneType) {
  done(null, user);
});

passport.use(
  new LinkedInStrategy(linkedInSettings, (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: DoneType,
  ) => {
    process.nextTick(() => {
      return done(null, profile);
    });
  })
);

export const authController: authType = {
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.isAuthenticated()) {
      return res.status(401).json('Error: User not authorized');
    }
    return next();
  },
  // add user to database if new user
  getUserId: (req: any, res: Response, next: NextFunction) => {
    const email = req.user.emails[0].value;
    const userId = req.user.id;
    if (!email) return next({
      log: 'email not found on request body',
      status: 400,
      message: 'an error occurred in attempting to get the user ID in getUserId'
    });
    const checkUserExistsQuery = 'SELECT userid from users WHERE userid=($1)';
    const params1 = [userId];
    const createUserQuery = `
      INSERT INTO users(email, userid)
      VALUES($1, $2)
      `;
    const params2 = [email, userId];
    db.query(checkUserExistsQuery, params1, (err, user) => {
      if (err) return next({ log: `error in auth controller getUserId: ${err}`,
        status: 500,
        message: 'error occurred in auth controller getUserId' });
      else {
        if (user?.rows[0]) {
          return next();
        }
        else {
          db.query(createUserQuery, params2, (err) => {
            if (err) return next({ log: `error in auth controller getUserId: ${err}`,
              status: 500,
              message: 'error occurred in auth controller getUserId' });
            else {
              return next();
            }
          });
        }
      }
    });
  },
};

export default passport;

