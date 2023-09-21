import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import cl from "./LogInPage.module.scss"
import logIn from '../../../API/logIn';


export interface IGetLoginData {
    Password: string;
    Username: string;
}

export const LogInPage: React.FC = () => {

    const [loginData, setLoginData] = React.useState<IGetLoginData>({
        Password: "",
        Username: "",
    })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log(loginData)
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const logInAPIUrl = "http://localhost:5000/api/Authenticate/login"
        await logIn(logInAPIUrl, loginData).then(res => {console.log(res)});
    };

    return (
        <div className={cl.LogInPage}>
            <div className={cl.LogInPage__Container}>
                <Typography variant="h2" gutterBottom>
                    Вхід
                </Typography>
                <form className={cl.LogInPage__Form} onSubmit={handleFormSubmit}>
                    <FormControl className={cl.LogInPage__FormControl}>
                        <TextField
                            id="username-input"
                            name="Username"
                            color="success"
                            fullWidth
                            label="Логін"
                            variant="outlined"
                            className={cl.LogInPage__Input}
                            value={loginData.Username}
                            onChange={handleInputChange}
                            sx={{
                                mb: 2
                            }}
                        />
                        <TextField
                            id="password-input"
                            name="Password"
                            color="success"
                            fullWidth
                            label="Пароль"
                            variant="outlined"
                            type='password'
                            className={cl.LogInPage__Input}
                            value={loginData.Password}
                            onChange={handleInputChange}
                            sx={{
                                mb: 2
                            }}
                        />
                        <Button type='submit' variant="contained" color="success">
                            Увійти
                        </Button>
                    </FormControl>
                </form>
            </div>
        </div>
    )
}

export default LogInPage;
