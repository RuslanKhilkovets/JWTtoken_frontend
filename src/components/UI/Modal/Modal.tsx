import React, { useState, useEffect } from 'react';
import './Modal.scss';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearShoppingCart, removeItemFromShoppingCart } from '../../../store/shoppingCart/actions';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateCartData: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [totalPriceCount, setTotalPriceCount] = useState(0);
  const [cartData, setCartData] = useState([]); 
  const cartDataString = localStorage.getItem('shoppingCart');
  const dispatch = useDispatch();

  useEffect(() => {
    const cartDataString = localStorage.getItem('shoppingCart');
    const cartData = cartDataString ? JSON.parse(cartDataString) : [];
    setCartData(cartData); 
    const total = cartData.reduce((acc: number, item: any) => {
      return acc + item.price;
    }, 0);
    setTotalPriceCount(total);
  }, [cartDataString]);

  const navigate = useNavigate();

  const handleRemoveItem = (row: any) => {
    const updatedCartData = cartData.filter((item: any) => item.id !== row.id);
    setCartData(updatedCartData); 
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCartData));
    setTotalPriceCount(updatedCartData.reduce((acc, item) => acc + item.price, 0));
    dispatch(removeItemFromShoppingCart(row))
  };
  
  const handleClearCart = () => {
    setCartData([]); 
    localStorage.removeItem("shoppingCart");
    dispatch(clearShoppingCart())
  };

  const onNavigate = (tabNumber: number) => {
    navigate(`../tab${tabNumber}`);
    handleClose();
  };
  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-header__heading">
            <div className="modal-header__icon"></div>
            <p className="modal-header__title">Моя корзина</p>
          </div>
          <button className="close-button" onClick={handleClose}></button>
        </div>
        <div className="modal-content">
          {cartData.length !== 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Перелік аналізів</TableCell>
                      <TableCell>Ціна</TableCell>
                      <TableCell>Термін виконання</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartData.map((row: any) => (
                      <TableRow key={row.description}>
                        <TableCell component="th" scope="row">
                          {row.description}
                        </TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{row.category}</TableCell>
                        <TableCell>
                          <button
                            className={"delete-button"}
                            onClick={() => handleRemoveItem(row)}
                          ></button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="clear-cart" onClick={handleClearCart}>
                <div className="clear-cart__icon"></div>
                <p className="clear-cart__text">Очистить корзину</p>
              </div>
              <div className="total-count">
                <p className="total-count__text">Итого: {totalPriceCount.toFixed(2)} $</p>
              </div>
              <div className="modal-buttons">
                <Button active onClick={() => onNavigate(1)}>
                  Добавить анализы
                </Button>
                <Button active onClick={() => onNavigate(2)}>
                  Оформить заказ
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="modal-buttons">
                <Button active onClick={() => onNavigate(1)}>
                  Добавить анализы
                </Button>
                <Button active onClick={() => onNavigate(2)}>
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
