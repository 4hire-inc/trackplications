import applicationModel from '../models/applicationModel';
import { ApplicationController } from '../serverTypes';
import { Request, Response, NextFunction } from 'express';

const applicationController: ApplicationController = {
// middleware to get all applications
  getApplications: async (req: any, res, next) => {
    try {
      const id = req.user?.id;
      const queryString = `
      SELECT a.id, a.company, a.location, a.position, a.notes, u.userID, a.modified_at, o.salary, o.sign_on_bonus, o.start_date, o.notes as offer_notes, o.id as offer_id,  o.created_at as offer_created_at, o.modified_at as offer_modified_at,s.status_name, s.status_rank, s.created_at AS status_created_at, s.modified_at AS status_modified_at, s.id AS status_id
          FROM applications AS a
          INNER JOIN users AS u
          ON a.user_id = u.userid
          INNER JOIN offers AS o
          ON a.id = o.app_id
          INNER JOIN status AS s
          ON a.id = o.app_id
          WHERE u.userID = ($1)
      `;
      const params = [id];
      applicationModel.query(queryString, params, (err, result) => {
        if (err) return next({ err });
        // console.log('result:', result?.rows);
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
  // delete application and associated status and offer information
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