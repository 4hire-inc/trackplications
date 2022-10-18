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
  deleteApplication: (req: any, res, next) => {
    const appId = req.params.id;
    const userId = req.user?.id;
    
    const deleteStatusQuery = `DELETE FROM status WHERE app_id='${appId}'`;
    const deleteOfferQuery = `DELETE FROM offers WHERE app_id='${appId}'`;

    const deleteApplicationQuery = 'DELETE FROM applications WHERE id=($1) AND user_id=($2)';
    const params = [appId, userId];

    applicationModel.query(deleteStatusQuery, undefined, (err) => {
      if (err) return next({
        log: `applicationController: Error: ${err}`,
        message: { error: 'Error in applicationController: deleteApplication (delete status)' },
        status: 500,
      });
      applicationModel.query(deleteOfferQuery, undefined, (err) => {
        if (err) return next({
          log: `applicationController: Error: ${err}`,
          message: { error: 'Error in applicationController: deleteApplication (delete offer)' },
          status: 500,
        });
        else {
          applicationModel.query(deleteApplicationQuery, params, (err) => {
            if (err) return next({
              log: `applicationController: Error: ${err}`,
              message: { error: 'Error in applicationController: deleteApplication (delete application)' },
              status: 500,
            });
            else {
              res.locals.deleted = {
                id: appId,
                confirmation: true,
              };
              return next();
            }
          });
        }
      });
    });
  }

}; 


export default applicationController;