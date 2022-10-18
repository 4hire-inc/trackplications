import applicationModel from '../models/applicationModel';
import { ApplicationController } from '../serverTypes';
import { Request, Response, NextFunction } from 'express';

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
  // update application information for interviewing stage
  updateApplication: async (req: any, res, next) => {
    const userId = req.user?.id;
    const appId = req.body.appId;

    const updateOptions = ['company', 'location', 'position', 'notes'];
    const updateFields: string[] = [];
    const updateValues: string[] = [];
    updateOptions.forEach((option) => {
      if (req.body[option]) {
        updateFields.push(option);
        updateValues.push(req.body[option]);
      }
    });
    if (!updateFields.length) return next();
    let updateAppInfoQuery = 'UPDATE applications SET ';
    for (let i = 0; i < updateFields.length; i++) {
      if (i !== updateFields.length - 1) updateAppInfoQuery += `${updateFields[i]} = '${updateValues[i]}', `;
      else {
        updateAppInfoQuery += `${updateFields[i]} = '${updateValues[i]}' WHERE user_id=($1) AND id=($2) RETURNING *`;
      }
    }
    const params = [userId, appId];
    applicationModel.query(updateAppInfoQuery, params, (err, app) => {
      if (err) return next({
        log: `applicationController: Error: ${err}`,
        message: { error: 'Error in applicationController updateApplication' },
        status: 500,
      });
      else {
        res.locals.appInfo = app?.rows[0];
        return next();
      }
    });

  },
}; 


export default applicationController;