import axios from 'axios';
import { IGetLoginData } from '../components/pages/LogIn/LogInPage';
import axiosInstance from './api';

const API_URL = 'http://localhost:5000/api/Authenticate'; 

interface LoginResponse {
  token: string;
  refreshToken: string;
}

export const login = async (logInData: IGetLoginData): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post(`${API_URL}/login`, logInData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refresh = async (refreshToken: string | null, accessToken: string | null): Promise<string> => {
    if (refreshToken && accessToken) {
        try {
            const response = await axiosInstance.post(`${API_URL}/refresh-token`, { refreshToken, accessToken });
            return response.data.accessToken;
        } catch (error) {
            throw error;
        }
    } else {
        throw new Error("Missing refreshToken or accessToken");
    }
};