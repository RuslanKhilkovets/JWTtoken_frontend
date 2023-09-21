import axios from "axios";
import { IGetLoginData } from "../components/pages/LogIn/LogInPage";

export default async function logIn(url: string, logInData: IGetLoginData){
    const headers = {
        'Content-Type': 'application/json'
    }
    
    try{
        const response = await axios.post(url, logInData, {
            headers,
        })
        const { token } = response.data;
        localStorage.setItem('token', token);
        return token;
    }
    catch(e){
        console.log(e)
    }
}
