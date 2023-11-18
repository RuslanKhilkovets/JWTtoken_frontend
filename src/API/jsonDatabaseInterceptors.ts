import axios from "axios";
import { removeToken, setToken } from "./cookies";

const API_URL = 'http://localhost:3001';

const databaseAxiosInterceptors = axios.create({
    baseURL: API_URL
});

databaseAxiosInterceptors.interceptors.request.use(
    async (config) => {
        setToken("loader", "true");
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



databaseAxiosInterceptors.interceptors.response.use(
    (response) => {
        removeToken("loader");
        return response;
    },
    async (error) => {
        removeToken("loader");
        return Promise.reject(error);
    }
);

export default databaseAxiosInterceptors;
