import applicationModel from '../models/applicationModel';
import { ApplicationController } from '../serverTypes';

const applicationController: ApplicationController = {
// middleware to get all applications
  getApplications: async (req: any, res, next) => {
    try {
      let id = req.user?.id;
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

  //middleware to add an offer
  postOffer: async (req, res, next) => {
    console.log('req.body:', req.body);
    try {
      const { salary, sign_on_bonus, start_date, notes } = req.body;
      const queryString = `
      INSERT INTO offers (salary, sign_on_bonus, start_date, notes)
      VALUES ($1, $2, $3, $4);`;
      const params = [salary, sign_on_bonus, start_date, notes];
      applicationModel.query(queryString, params, (err, result) => {
        if (err) return next({ err });
        // console.log('result:', result);
        res.locals.offers = result;
        return next();
      });
    } catch (error) {
      return next({
        log: `applicationController: Error: ${error}`,
        message: { error: 'Error in applicationController getApplications' },
        status: 500,
      });
    }
  }
 

}; 


export default applicationController;