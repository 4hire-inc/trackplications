import { RequestHandler } from 'express';

export type GlobalError = {
  log: string;
  status: number;
  message: { err: string };
};

export type ApplicationController = {
  getApplications: RequestHandler,
  deleteApplication: RequestHandler,
  updateApplication: RequestHandler,
  addApplication: RequestHandler,
}

export type OfferController = {
  updateOffer: RequestHandler,
  postOffer: RequestHandler,
}

