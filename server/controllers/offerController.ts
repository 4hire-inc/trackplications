import applicationModel from '../models/applicationModel';
import { OfferController } from 'server/serverTypes';

const offerController: OfferController = {
  updateOffer: (req: any, res, next) => {
    const offerId = req.body.offerId;

    const updateOptions = ['salary', 'sign_on_bonus', 'start_date', 'notes'];
    const updateFields: string[] = [];
    const updateValues: string[] = [];
    updateOptions.forEach((option) => {
      if (req.body[option]) {
        updateFields.push(option);
        updateValues.push(req.body[option]);
      }
    });
    if (!updateFields.length) return next();
    let updateOfferInfoQuery = 'UPDATE offers SET ';
    for (let i = 0; i < updateFields.length; i++) {
      if (i !== updateFields.length - 1) updateOfferInfoQuery += `${updateFields[i]} = '${updateValues[i]}', `;
      else {
        updateOfferInfoQuery += `${updateFields[i]} = '${updateValues[i]}' WHERE id=($1) RETURNING *`;
      }
    }
    const params = [offerId];
    applicationModel.query(updateOfferInfoQuery, params, (err, offer) => {
      if (err) return next({
        log: `offerController: Error: ${err}`,
        message: { error: 'Error in offerController updateOffer' },
        status: 500,
      });
      else {
        res.locals.offerInfo = offer?.rows[0];
        return next();
      }
    });
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

export default offerController;