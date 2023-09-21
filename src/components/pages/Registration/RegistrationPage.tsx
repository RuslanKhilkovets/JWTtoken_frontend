import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from "axios"
import cl from "./RegistrationPage.module.scss"
import registration from '../../../API/registration';
import { validateEmail, validatePassword } from '../../../utils/validations';


export interface IGetRegisterData {
    Password: string;
    Username: string;
    Email: string;
}



export const RegistrationPage: React.FC = () => {

    const [registerData, setRegisterData] = React.useState<IGetRegisterData>({
        Password: "",
        Username: "",
        Email: ""
    });

    const [validationErrors, setValidationErrors] = React.useState<Partial<IGetRegisterData>>({});

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors: Partial<IGetRegisterData> = {};

        if (!registerData.Email || !validateEmail(registerData.Email)) {
            errors.Email = "Введіть дійсну електронну пошту";
        }
        
        if (!registerData.Username) {
            errors.Username = "Введіть ім'я користувача";
        }

        if (!registerData.Password || !validatePassword(registerData.Password)) {
            errors.Password = "Пароль має містити як мінімум одну велику букву, символ та цифру і бути довшим 6";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const registerAPIUrl = "http://localhost:5000/api/Authenticate/register"
            await registration(registerAPIUrl, registerData);
        }
    };

    return (
        <div className={cl.RegistrationPage}>
            <div className={cl.RegistrationPage__Container}>
                <Typography variant="h2" gutterBottom>
                    Реєстрація
                </Typography>
                <form className={cl.RegistrationPage__Form} onSubmit={handleFormSubmit}>
                    <FormControl className={cl.RegistrationPage__FormControl}>
                        <TextField
                            id="email-input"
                            name="Email"
                            color="success"
                            fullWidth
                            label="Електронна пошта"
                            variant="outlined"
                            className={cl.RegistrationPage__Input}
                            value={registerData.Email}
                            onChange={handleInputChange}
                            error={!!validationErrors.Email}
                            helperText={validationErrors.Email}
                            sx={{
                                mb: 2
                            }}
                        />
                        <TextField
                            id="username-input"
                            name="Username"
                            color="success"
                            fullWidth
                            label="Ім'я користувача"
                            variant="outlined"
                            className={cl.RegistrationPage__Input}
                            value={registerData.Username}
                            onChange={handleInputChange}
                            error={!!validationErrors.Username}
                            helperText={validationErrors.Username}
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
                            type="password"
                            className={cl.RegistrationPage__Input}
                            value={registerData.Password}
                            onChange={handleInputChange}
                            error={!!validationErrors.Password}
                            helperText={validationErrors.Password}
                            sx={{
                                mb: 2
                            }}
                        />
                        <Button type='submit' variant="contained" color="success">
                            Зареєструватися
                        </Button>
                    </FormControl>
                </form>
            </div>
        </div>
    )
}

export default RegistrationPage;
