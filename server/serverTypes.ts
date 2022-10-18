import { RequestHandler } from 'express';

export type GlobalError = {
  log: string;
  status: number;
  message: { err: string };
};

export type ApplicationController = {
  getApplications: RequestHandler;
  postOffer: RequestHandler;
}

