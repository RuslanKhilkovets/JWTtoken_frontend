import React, { useState, useContext, useEffect } from 'react';
import cl from './Header.module.scss';
import { Typography, Button } from '@mui/material';
import { removeToken } from '../../API/localStorage';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '../UI/Modal/Modal';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { changeIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Initialize productsCount with the initial value from local storage
  const initialCartData = localStorage.getItem('shoppingCart');
  const [cartData, setCartData] = useState(initialCartData ? JSON.parse(initialCartData) : []);
  const [productsCount, setProductsCount] = useState(cartData.length);

  useEffect(() => {
    // Watch for changes in the shopping cart and update productsCount accordingly
    setProductsCount(cartData.length);
  }, [cartData]);

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
        <Typography variant="h4" gutterBottom>
          Synevo
        </Typography>
        <div className={cl.Header__UI}>
          <button data-text={productsCount} className={cl.Header__AddBtn} onClick={openModal}>
          </button>
          <Button variant="contained" color="success" onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Header;