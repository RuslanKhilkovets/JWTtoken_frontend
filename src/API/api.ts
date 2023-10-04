    import axios from 'axios';
    import { getToken, setToken, removeToken } from './localStorage';
    import { refresh } from './auth';

    const API_URL = 'http://localhost:5000'; 

    const axiosInstance = axios.create({
        baseURL: API_URL,
    });

    
    axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    );

    axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getToken('refreshToken');
        const accessToken = getToken('jwtToken')
        if (refreshToken) {
            try {
            const newAccessToken = await refresh(refreshToken, accessToken);
            setToken('jwtToken', newAccessToken);
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
            } catch (refreshError) {
                removeToken('jwtToken');
                removeToken('refreshToken');
            }
        }
        }
        return Promise.reject(error);
    }
    );

    export default axiosInstance;