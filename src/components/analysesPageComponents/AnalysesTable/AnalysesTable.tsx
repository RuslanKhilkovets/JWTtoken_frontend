import React, { useState, useEffect, useContext } from 'react';
import cl from './AnalysesTable.module.scss';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '../../UI/Button/Button';
import getDataFromUrl from '../../../utils/getDataFromUrl';
import LoaderContext from '../../../context/LoaderContext/LoaderContext';
import { getItemFromStorage, setItemInStorage } from '../../../utils/localStorageItems';
import { ITableRow } from '../../../types/ITableRow';
import ShoppingCartItemsCountContext from '../../../context/ShoppingCartItemsCountContext/ShoppingCartItemsCountContext';





const AnalysesTable = ({ searchParam, tabData }: any) => {

  const { addItemsCount, getItemsCount } = useContext(ShoppingCartItemsCountContext)


  const [rows, setRows] = useState<ITableRow[]>([]);
  const [filteredRows, setFilteredRows] = useState<ITableRow[]>([]);
  const [clickedRows, setClickedRows] = useState<{ [key: number]: boolean }>({});
  const { hideLoader, showLoader } = React.useContext(LoaderContext);
  const cartDataString = localStorage.getItem('shoppingCart');
  const cartDataFromLocalStorage = cartDataString ? getItemFromStorage('shoppingCart') : [];
  
  const handleAddItem = (row: ITableRow) => {
    const itemId = row.id;
    const isCurrentlySelected = isItemInLocalStorage(itemId);
  
    if (!isCurrentlySelected) {
      addItemToLocalStorage(row);
      addItemsCount()
    } else {
      removeItemFromLocalStorage(itemId);
      getItemsCount()
    }
  
    setClickedRows((prevClickedRows) => ({
      ...prevClickedRows,
      [itemId]: !isCurrentlySelected, 
    }));
  };
  

  const isItemInLocalStorage = (itemId: number) => {
    return cartDataFromLocalStorage.some((item: ITableRow) => item.id === itemId);
  };

  const addItemToLocalStorage = (row: ITableRow) => {
    cartDataFromLocalStorage.push(row);
    setItemInStorage('shoppingCart', cartDataFromLocalStorage);
  };

  const removeItemFromLocalStorage = (itemId: number) => {
    const cartData = cartDataFromLocalStorage.filter((item: ITableRow) => item.id !== itemId);
    setItemInStorage('shoppingCart', cartData);
  };

  const fetchAndSetData = async (tabData: string) => {
    try {
      showLoader();
      const url = `http://localhost:3001/${tabData}`;
      const result: ITableRow[] = await getDataFromUrl(url);
      setRows(result);

      const filtered = result.filter((row) =>
        row.description.toLowerCase().includes(searchParam.toLowerCase())
      );

      setFilteredRows(filtered);

      setClickedRows(result.reduce((acc, row) => ({ ...acc, [row.id]: isItemInLocalStorage(row.id) }), {}));
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  };


  useEffect(() => {
    console.log(cartDataFromLocalStorage)
    setRows(cartDataFromLocalStorage)
  }, [cartDataString]);


  useEffect(() => {
    fetchAndSetData(tabData);
  }, [searchParam, tabData]);

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
              {filteredRows.map((row: ITableRow) => (
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
                      onClick={() => handleAddItem(row)}
                    ></button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    </>
  );
};

export default AnalysesTable;
