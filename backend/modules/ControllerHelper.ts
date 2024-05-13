import { Response } from 'express';

export const setResponse = (obj: Object, response: Response) => {
  response.status(200);
  response.json(obj);
};

export const setError = (err: Error, response: Response) => {
  console.log('Error is here' + err);
  response.status(500);
  response.json(err);
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
