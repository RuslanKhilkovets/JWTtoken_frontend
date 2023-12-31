import axios from "axios";
import { IGetRegisterData } from "../types/IGetRegisterData";



export default async function registration(url: string, registerData: IGetRegisterData){
    const headers = {
        'Content-Type': 'application/json'
    }
    try{
        const postRegister = await axios.post(url, registerData, {
            headers,
        })
        return postRegister;
    }
    catch(e){
        console.log(e)
    }
}
