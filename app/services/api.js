import axios from 'axios';
import store from './storage';

require('dotenv').config();

const baseURL = process.env.NODE_ENV === 'development' ? process.env.STAGING_API_URI : process.env.PROD_API_URI;

const generateInstance = () => {
  const token = store.get('token');
  const instance = axios.create({
    baseURL,
    timeout: 2000,
    headers: { Authorization: token ? `Bearer ${token}` : '' },
  });
  const resetToken = (newToken) => {
    instance.defaults.headers.Authorization = `Bearer ${newToken}`;
  };
  return {
    instance,
    resetToken,
  };
};
export default generateInstance();
