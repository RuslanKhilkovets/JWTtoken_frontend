import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import AuthContext from '../../context/AuthContext/AuthContext';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

import { removeToken } from '../../API/cookies';
import { getItemFromStorage, setItemInStorage } from '../../utils/localStorageItems';

import cl from './Header.module.scss';
import ShoppingCartItemsCount, { ShoppingCartItemsCountContext } from '../../context/ShoppingCartItemsCountContext/ShoppingCartItemsCountContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { changeIsAuth } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { itemsCount } = React.useContext(ShoppingCartItemsCountContext)


  const [shoppingItemsCount, setShoppingItemsCount] = useState(itemsCount)

  useEffect(() => {setShoppingItemsCount(itemsCount)}, [itemsCount])

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

  return (
    <header className={cl.Header}>
      <div className={cl.Header__Container}>
        <Link to={"../"} className={cl.Header__Link}>
          Synevo
        </Link>
        <div className={cl.Header__UI}>
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
