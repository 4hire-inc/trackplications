import applicationModel from '../models/applicationModel';
import { ApplicationController } from '../serverTypes';

const applicationController: ApplicationController = {
// middleware to get all applications
  getApplications: async (req, res, next) => {
    try {
      const queryString = `
      SELECT *
      FROM applications AS a, users AS u, offers AS o, status AS s
      WHERE a.user_id = u.userid
      AND a.status_id = s.id
      AND a.offer_id = o.id
      `;
      // const result: Array<any> = await applicationModel.query(queryString, undefined, () => console.log('test'));
      applicationModel.query(queryString, undefined, (err, result) => {
        if (err) return next({ err });
        console.log('result:', result?.rows);
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