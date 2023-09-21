import { axiosInstance } from './ApiClient';
import interceptors from './interceptors';

export default axiosInstance.interceptors.response.use(
  (response) => response,
  interceptors.refreshToken
);
