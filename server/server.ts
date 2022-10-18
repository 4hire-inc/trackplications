import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';

import { GlobalError } from './serverTypes';
import authRoutes from './routes/auth';
import applicationRouter from './routes/applicationApi';


const app = express();
const PORT = 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET || ''
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/auth', authRoutes);
app.use('/api/app', applicationRouter);

app.use(
  '/stylesheets',
  express.static(path.join(__dirname, '../client/stylesheets'))
);

app.use(
  '/assets',
  express.static(path.join(__dirname, '../client/assets'))
);


app.get('/bundle.js', (req: Request, res: Response) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js'));
});



app.get('*', (req: Request, res: Response) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});


app.use((req: Request, res: Response) => {
  return res.status(404);
});

app.use((err: GlobalError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});

export default app;