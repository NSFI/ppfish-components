import * as dev from './dev';
import * as prod from './prod';
export const getConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return prod;
  }
  return dev;
};
