import mongoose from 'mongoose';
import config from '../config';

export const connect = (url = `${config.mongoURI}/${config.db}`, opts = {}) => {
  return mongoose.connect(url);
};
