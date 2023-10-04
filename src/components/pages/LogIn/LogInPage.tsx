import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'; // Додано IconButton
import InputAdornment from '@mui/material/InputAdornment'; // Додано InputAdornment
import Visibility from '@mui/icons-material/Visibility'; // Додано іконку для відображення пароля
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Додано іконку для приховання пароля
import cl from './LogInPage.module.scss';
import { login } from '../../../API/auth';
import { setToken } from '../../../API/localStorage';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext/AuthContext';

export interface IGetLoginData {
  password: string;
  username: string;
}

export const LogInPage: React.FC = () => {
  const [loginData, setLoginData] = React.useState<IGetLoginData>({
    password: '',
    username: '',
  });
  const [showPassword, setShowPassword] = React.useState<boolean>(false); // Додано стан для відображення/приховування пароля
  const navigate = useNavigate();
  const { isAuth, changeIsAuth } = React.useContext(AuthContext);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(loginData);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword); // Зміна стану для відображення/приховування пароля
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const { token, refreshToken } = await login(loginData);
        setToken('jwtToken', token);
        setToken('refreshToken', refreshToken);
        changeIsAuth();
        console.log(isAuth);
        navigate('/data-table');
    } catch (e) {
        console.log(e);
    }
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
              name="username"
              color="success"
              fullWidth
              label="Логін"
              variant="outlined"
              className={cl.LogInPage__Input}
              value={loginData.username}
              onChange={handleInputChange}
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="password-input"
              name="password"
              color="success"
              fullWidth
              label="Пароль"
              variant="outlined"
              type={showPassword ? 'text' : 'password'} // Використовуємо стан для відображення/приховування пароля
              className={cl.LogInPage__Input}
              value={loginData.password}
              onChange={handleInputChange}
              sx={{
                mb: 2,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleTogglePasswordVisibility}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />} 
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="success">
              Увійти
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
