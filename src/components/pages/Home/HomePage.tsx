import * as React from 'react';
import cl from "./HomePage.module.scss"
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const HomePage: React.FC = () => {
    return(
        <div className={cl.HomePage}>
            <div className={cl.HomePage__Content}>
                <Typography variant="h2" gutterBottom textAlign={"center"}>
                    System
                </Typography>
                <Typography variant="h4" gutterBottom textAlign={"center"}>
                    Увійдіть щоб отримати доступ 
                </Typography>
                <Link href="/login">Увійти</Link>
                <Typography variant="h5" gutterBottom textAlign={"center"}>
                    Не маєте акаунт?
                </Typography>
                <Link href="/registration" className={cl}>Реєстрація</Link>
                
            </div>
        </div>
    )
}

export default HomePage;