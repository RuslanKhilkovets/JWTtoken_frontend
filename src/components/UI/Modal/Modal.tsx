import React, { useState, useEffect } from 'react';
import './Modal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { clearShoppingCart, removeItemFromShoppingCart } from '../../../store/shoppingCart/actions';
import Button from '../Button/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [totalPriceCount, setTotalPriceCount] = useState(0);
  const { shoppingCartItems } = useSelector((state: any) => state.shoppingCart);
  const dispatch = useDispatch();

  useEffect(() => {
    const total = shoppingCartItems.reduce((acc: number, item: any) => {
      return acc + item.price;
    }, 0);

    setTotalPriceCount(total);
    console.log(shoppingCartItems)

  }, [shoppingCartItems]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  const handleRemoveItem = (row: any) => {
    dispatch(removeItemFromShoppingCart(row));
  };

  const handleClearCart = () => {
    dispatch(clearShoppingCart());
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
          {shoppingCartItems.length !== 0 ? (
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
                    {shoppingCartItems.map((row: any) => (
                      <TableRow key={row.description}>
                        <TableCell component="th" scope="row">
                          {row.name}
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
                <Button active>
                  Добавить анализы
                </Button>
                <Button active>
                  Оформить заказ
                </Button>
              </div>
            </>
          ) : (
            <p>Корзина пуста</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
