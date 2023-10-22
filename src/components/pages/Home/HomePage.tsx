import * as React from 'react';
import { useNavigate } from 'react-router-dom';


import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';


import cl from "./HomePage.module.scss"


export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    return(
        <div className={cl.HomePage}>
            <div className={cl.HomePage__Content}>
                <Typography variant="h2" gutterBottom textAlign={"center"}>
                    System
                </Typography>
                <Typography variant="h4" gutterBottom textAlign={"center"}>
                    Увійдіть щоб отримати доступ 
                </Typography>
                <Button variant='contained' color='success' onClick={() => navigate("./login")}>Увійти</Button>
                <Typography variant="h5" gutterBottom textAlign={"center"}>
                    Не маєте акаунт?
                </Typography>
                <Button variant='contained' color='success' onClick={() => navigate("./registration")}>Зареєструватися</Button>                
            </div>
        </div>
    )
}

export default HomePage;