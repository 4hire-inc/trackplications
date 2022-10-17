import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { Profile, Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';

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
  clientID: '78mfkk2j9t89tb',
  clientSecret: 'KSIcKntJ36iDuOd2',
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
  getUserId: async (req: Request, res: Response, next: NextFunction) => {
    console.log('in getUserId');
    return next();
  },
};

export default passport;

