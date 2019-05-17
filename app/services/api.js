import axios from 'axios';
import store from './storage';

const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/v1' : 'http://decrm.powercode.pro:5000/api/v1';

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
