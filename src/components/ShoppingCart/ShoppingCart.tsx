import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


import Button from '../UI/Button/Button';
import IShoppingCartProps from '../../types/IShoppingCartProps';
import IFormData from '../../types/IFormData';

import { useDispatch, useSelector } from 'react-redux';
import { getItemFromStorage, setItemInStorage } from '../../utils/localStorageItems';
import { ITableRow } from '../../types/ITableRow';
import { clearShoppingCart, removeItemFromShoppingCart } from '../../store/shoppingCart/actions';


import "./ShoppingCart.scss"



const ShoppingCart: React.FC<IShoppingCartProps> = ({ isOpen, onClose }) => {

  const dispatch = useDispatch()

  const items = useSelector((state: any) => state.shoppingCart.shoppingCartItems)
  const [cartData, setCartData] = useState(items)
  const [totalPriceCount, setTotalPriceCount] = useState(0);
  const [isMobileDevice, setIsMobileDevice] = React.useState<boolean>(false);
  const [isBigTable, setIsBigTable] = React.useState(false)



  useEffect(() => {
    const total = cartData.reduce((acc: number, item: any) => {
      return acc + item.price;
    }, 0);
    setTotalPriceCount(total);
    setCartData(items)
  }, [items]);

  
  useEffect(() => {
    const windowSize = window.innerWidth;
    if(windowSize <= 768){
        setIsMobileDevice(true);
    } else {
        setIsMobileDevice(false);
    }
  }, []);



  const navigate = useNavigate();

  const handleRemoveItem = (row: any) => {
    const updatedCartData = cartData.filter((item: any) => item.id !== row.id);
    setItemInStorage('shoppingCart', updatedCartData)
    console.log(items)
    dispatch(removeItemFromShoppingCart(row))
    setCartData(() => updatedCartData)

    setTotalPriceCount(updatedCartData.reduce((acc: number, item: ITableRow) => acc + item.price, 0));
  };

  const handleClearCart = () => {
    dispatch(clearShoppingCart())
    localStorage.removeItem('shoppingCart');
    setCartData([])
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
            <div className='modal-table_container'>
            {
              isMobileDevice && !isBigTable
              ?
              <>
              <TableContainer component={Paper} className='modal-table'>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Перелік аналізів</TableCell>
                      <TableCell>Ціна</TableCell>
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
                        <TableCell>
                          <button className="delete-button" onClick={() => handleRemoveItem(row)}></button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

            </TableContainer>
                            {
                              (isMobileDevice && !isBigTable) 
                              &&
                              <button className="modal__see-more-button" onClick={() => setIsBigTable(true)}>
                                <span className="modal__see-more-button__text">+</span> 
                              </button>
                            }
                            </>
            :
            <TableContainer component={Paper} className='modal-table'>
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
                          <button className="delete-button" onClick={() => handleRemoveItem(row)}></button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
            }

            </div>
              <div className="modal-buttons">
                <div className="modal-btns">
                  <div className="clear-cart" onClick={handleClearCart}>
                    <div className="clear-cart__icon"></div>
                    <p className="clear-cart__text">Очистить корзину</p>
                  </div>
                  <div className="total-count">
                    <p className="total-count__text">Итого: {totalPriceCount.toFixed(2)} $</p>
                </div>
              </div>
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
