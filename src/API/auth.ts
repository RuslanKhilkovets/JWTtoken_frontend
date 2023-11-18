import axiosInstance from './api';


import { IGetLoginData } from '../pages/LogIn/LogInPage';
import ILoginResponse from '../types/ILoginResponse';





const API_URL = 'http://localhost:5000/api/Authenticate'; 


export const login = async (logInData: IGetLoginData): Promise<ILoginResponse> => {
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