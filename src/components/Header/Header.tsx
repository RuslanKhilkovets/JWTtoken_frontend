import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { Button } from '@mui/material';


import AuthContext from '../../context/AuthContext/AuthContext';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

import { removeToken } from '../../API/cookies';


import cl from './Header.module.scss';



export const Header: React.FC = () => {
  const navigate = useNavigate();

  const { changeIsAuth } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = useSelector((state: any) => state.shoppingCart.shoppingCartItems)
  const [shoppingItemsCount, setShoppingItemsCount] = useState(items.length)





  const handleLogOut = () => {
    removeToken('jwtToken');
    removeToken('refreshToken');
    changeIsAuth();
    localStorage.removeItem('formData');
    localStorage.removeItem('shoppingCart');
    navigate('../login');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setShoppingItemsCount(items.length)
  }, [items])


  return (
    <header className={cl.Header}>
      <div className={cl.Header__Container}>
        <Link to={"../"} className={cl.Header__Logo_Link}>
            Synevo
        </Link>
        <div className={cl.Header__UI}>
          <Link to={"../CKeditor"} className={cl.Header__Link}>
              CKeditor
          </Link>
          <button data-text={shoppingItemsCount} className={cl.Header__AddBtn} onClick={openModal}></button>
         
          <Button variant="contained" color="success" onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      </div>
      <ShoppingCart isOpen={isModalOpen} onClose={closeModal}  />
    </header>
  );
};


export default Header;