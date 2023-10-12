import * as React from 'react';
import cl from './AnalysesTable.module.scss';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '../UI/Button/Button';
import getDataFromUrl from "../../utils/getDataFromUrl";
import LoaderContext from '../../context/LoaderContext/LoaderContext';
import Loader from '../Loader/Loader';

interface Row {
  id: number;
  description: string;
  price: number;
  category: number;
}

const AnalysesTable = () => {
  const [rows, setRows] = React.useState<Row[]>([]);
  const [filteredRows, setFilteredRows] = React.useState<Row[]>([]);
  const [clickedRows, setClickedRows] = React.useState<{ [key: number]: boolean }>({});

  const { hideLoader, showLoader } = React.useContext(LoaderContext);

  const handleAddItem = (row: Row) => {
    const isItemInCart = isItemInLocalStorage(row.id);

    if (!isItemInCart) {
      addItemToLocalStorage(row);
    } else {
      removeItemFromLocalStorage(row.id);
    }
  };

  React.useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        showLoader();
        const url = "http://localhost:3001/rows";
        const result: Row[] = await getDataFromUrl(url);
        setRows(result);
        setFilteredRows(result);
        setClickedRows(result.reduce((acc, row) => ({ ...acc, [row.id]: isItemInLocalStorage(row.id) }), {}));
      } catch (error) {
        console.error(error);
      } finally {
        hideLoader();
      }
    };

    fetchAndSetData();
  }, []);

  const isItemInLocalStorage = (itemId: number) => {
    const cartDataString = localStorage.getItem('shoppingCart');
    const cartData = cartDataString ? JSON.parse(cartDataString) : [];
    return cartData.some((item: Row) => item.id === itemId);
  };

  const addItemToLocalStorage = (row: Row) => {
    const cartDataString = localStorage.getItem('shoppingCart');
    const cartData = cartDataString ? JSON.parse(cartDataString) : [];
    cartData.push(row);
    localStorage.setItem('shoppingCart', JSON.stringify(cartData));
  };

  const removeItemFromLocalStorage = (itemId: number) => {
    const cartDataString = localStorage.getItem('shoppingCart');
    let cartData = cartDataString ? JSON.parse(cartDataString) : [];
    cartData = cartData.filter((item: Row) => item.id !== itemId);
    localStorage.setItem('shoppingCart', JSON.stringify(cartData));
  };


  return (
    <>
      <div className={cl.AnalysesTable}>
        <TableContainer className={cl.AnalysesTable__Table} component={Paper}>
          <Table>
            <TableHead>
              <TableRow className={cl.AnalysesTable__Header}>
                <TableCell>Перелік аналізів</TableCell>
                <TableCell>Ціна</TableCell>
                <TableCell>Термін виконання</TableCell>
                <TableCell>Додати в кошик</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row: Row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">
                    <button
                      style={{ filter: clickedRows[row.id] ? 'grayscale(100%)' : 'none' }}
                      className={cl.AnalysesTable__AddBtn}
                      onClick={() => {
                        handleAddItem(row);
                        setClickedRows((prevState) => ({
                          ...prevState,
                          [row.id]: !isItemInLocalStorage(row.id),
                        }));
                      }}
                    >
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={cl.AnalysesTable__ButtonContainer}>
          <Button active className={cl.AnalysesTable__Button}>Завантажити ще</Button>
        </div>
      </div>
    </>
  );
};

export default AnalysesTable;
