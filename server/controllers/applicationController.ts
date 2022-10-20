import applicationModel from '../models/applicationModel';
import { ApplicationController } from '../serverTypes';

const applicationController: ApplicationController = {
// middleware to get all applications
  getApplications: async (req: any, res, next) => {
    try {
      const id = req.user?.id;
      console.log('id', id);
      const queryString = `
      SELECT a.id AS app_id, a.company, a.location, a.position, a.notes, u.userID, a.modified_at, s.status_name, s.status_rank, s.created_at AS status_created_at, s.modified_at AS status_modified_at, s.id AS status_id
          FROM applications AS a
          INNER JOIN users AS u
          ON a.user_id = u.userid
          INNER JOIN status AS s
          ON a.id = s.app_id
          WHERE u.userID = ($1)
      `;
      const params = [id];
      applicationModel.query(queryString, params, (err, result) => {
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
  // add application information and corresponding status
  addApplication: (req: any, res, next) => {
    const userId = req.user?.id;
    console.log('userid', userId);
    const { company, location, position, notes, status_name, status_rank } = req.body;
    const addApplicationQuery = 'INSERT INTO applications (company, location, position, notes, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id';

    const params = [company, location, position, notes, userId];

    applicationModel.query(addApplicationQuery, params, (err, app) => {
      if (err) return next({
        log: `applicationController: Error: ${err}`,
        message: { error: 'Error in applicationController: addApplication' },
        status: 500,
      });
      else {
        const appId = app?.rows[0].id;
        const addStatusQuery = 'INSERT INTO status (status_name, status_rank, app_id) VALUES ($1, $2, $3)';
        const params1 = [status_name, status_rank, appId];
        applicationModel.query(addStatusQuery, params1, (err) => {
          if (err) return next({
            log: `applicationController: Error: ${err}`,
            message: { error: 'Error in applicationController: addApplication' },
            status: 500,
          });
          else {
            const appInfoQuery = 'SELECT a.id AS app_id, a.company, a.location, a.position, a.notes AS app_notes, a.created_at AS app_created_at, a.modified_at AS app_modified_at, s.status_name, s.status_rank, s.modified_at AS status_modified_at, s.created_at AS status_created_at FROM applications AS a INNER JOIN status AS s ON a.id = s.app_id WHERE a.id = ($1)';
            const params2 = [appId];
            applicationModel.query(appInfoQuery, params2, (err, app) => {
              if (err) return next({
                log: `applicationController: Error: ${err}`,
                message: { error: 'Error in applicationController: addApplication' },
                status: 500,
              });
              else {
                res.locals.createdApp = app?.rows[0];
                return next();
              }
            });
          }
        });
      }
    });

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

  // update application and status information for interviewing stage
  updateApplication: async (req: any, res, next) => {
    const userId = req.user?.id;
    const appId = req.body.app_id;
    const updateAppOptions = ['company', 'location', 'position', 'notes'];
    const updateAppFields: string[] = [];
    const updateAppValues: string[] = [];
    updateAppOptions.forEach((option) => {
      if (req.body[option]) {
        updateAppFields.push(option);
        updateAppValues.push(req.body[option]);
      }
    });
    if (!updateAppFields.length) return next();

    const updateStatusOptions = ['status_name', 'status_rank'];
    const updateStatusFields: string[] = [];
    const updateStatusValues: string[] = [];
    updateStatusOptions.forEach((option) => {
      if (req.body[option]) {
        updateStatusFields.push(option);
        updateStatusValues.push(req.body[option]);
      }
    });
    if (!updateStatusFields.length) return next();

    let updateAppInfoQuery = 'UPDATE applications SET ';
    for (let i = 0; i < updateAppFields.length; i++) {
      if (i !== updateAppFields.length - 1) updateAppInfoQuery += `${updateAppFields[i]} = '${updateAppValues[i]}', `;
      else {
        updateAppInfoQuery += `${updateAppFields[i]} = '${updateAppValues[i]}' WHERE user_id=($1) AND id=($2)`;
      }
    }

    let updateStatusInfoQuery = 'UPDATE status SET ';
    for (let i = 0; i < updateStatusFields.length; i++) {
      if (i !== updateStatusFields.length - 1) updateStatusInfoQuery += `${updateStatusFields[i]} = '${updateStatusValues[i]}', `;
      else {
        updateStatusInfoQuery += `${updateStatusFields[i]} = '${updateStatusValues[i]}' WHERE app_id=($1)`;
      }
    }
    const params = [userId, appId];

    applicationModel.query(updateAppInfoQuery, params, (err, app) => {
      if (err) return next({
        log: `applicationController: Error: ${err}`,
        message: { error: 'Error in applicationController: updateApplication' },
        status: 500,
      });
      else {
        const params1 = [appId];
        applicationModel.query(updateStatusInfoQuery, params1, (err) => {
          if (err) return next({
            log: `applicationController: Error: ${err}`,
            message: { error: 'Error in applicationController: updateApplication' },
            status: 500,
          });
          else {
            const appInfoQuery = 'SELECT a.id AS app_id, a.company, a.location, a.position, a.notes AS app_notes, a.created_at AS app_created_at, a.modified_at AS app_modified_at, s.status_name, s.status_rank, s.modified_at AS status_modified_at, s.created_at AS status_created_at FROM applications AS a INNER JOIN status AS s ON a.id = s.app_id WHERE a.id = ($1)';
            applicationModel.query(appInfoQuery, params1, (err, app) => {
              if (err) return next({
                log: `applicationController: Error: ${err}`,
                message: { error: 'Error in applicationController: updateApplication' },
                status: 500,
              });
              else {
                console.log('response: ', app?.rows[0]);
                res.locals.appInfo = app?.rows[0];
                return next();
              }
            });
          }
        });
      }
    });

  },

}; 


export default applicationController;