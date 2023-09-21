import axios from 'axios';
import store from '../_enchancers/configureStore';
import Storage from '../_helpers/Storage';
import { setUserContracts } from '../_reducers/contractReducer';
import { setRole } from '../_reducers/userReducer';
import authenticationService from '../_services/authentication.service';

const refreshToken = async (error) => {
  // console.log(error)
  const originalReq = error.config;
  if (error.response === undefined) {
    return Error(error.message);
  }
  if (error.response.status === 401) {
    let currentUser = Storage.getItem('currentUser');

    if (!currentUser) throw Error('Unauthorized');
    // истек срок жизни токена
    const data = {
      accessToken: currentUser.accessToken,
      refreshToken: currentUser.refreshToken,
      refreshTokenExpiryTime: new Date(),
    };
    currentUser = await authenticationService.refresh(data);

    if (currentUser) {
      Storage.saveItem('currentUser', currentUser);

      store.dispatch(setRole(currentUser.userRole));
      store.dispatch(setUserContracts(currentUser.userContracts));

      originalReq.headers.Authorization = `Bearer ${currentUser.accessToken}`;
    } else {
      await authenticationService.logout();
      return null;
    }

    return axios(originalReq);
  }
  if (error.response.status === 501) {
    // TODO: добавить повторный запрос на каптчу
  }
  return error.response;
};

export default { refreshToken };
