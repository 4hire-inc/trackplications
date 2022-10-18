import applicationModel from '../models/applicationModel';
import { NextFunction, Request, Response } from 'express';
import { ApplicationController } from '../serverTypes';

const applicationController: ApplicationController = {
// middleware to get all applications
  getApplications: async (req: Request, res: Response, next: NextFunction) => {
    console.log('req.body:', req.body);
    try {
      const queryString = 'SELECT * FROM Users';
      // const result: Array<any> = await applicationModel.query(queryString, undefined, () => console.log('test'));
      applicationModel.query(queryString, undefined, (err, result) => {
        if (err) return next({ err });
        res.locals.applications = result?.rows;
        return next();
      });  
    } catch (error) {
      return next({
        log: `applicationController: Error: ${error}`,
        message: { error: 'Error in applicationController getApplications' },
        status: 500,
      });
    }
  },
}; 




export default applicationController;