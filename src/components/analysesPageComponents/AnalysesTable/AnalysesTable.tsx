import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ITableRow } from '../../../types/ITableRow';
import LoaderContext from '../../../context/LoaderContext/LoaderContext';
import getDataFromUrl from '../../../utils/getDataFromUrl';
import { getItemFromStorage, setItemInStorage } from '../../../utils/localStorageItems';
import ShoppingCartItemsCountContext from '../../../context/ShoppingCartItemsCountContext/ShoppingCartItemsCountContext';
import Button from '../../UI/Button/Button';
import cl from './AnalysesTable.module.scss';

const AnalysesTable = ({ searchParam, tabData }: any) => {
  // Context and state declarations
  const { addItemsCount, getItemsCount } = useContext(ShoppingCartItemsCountContext);
  const { hideLoader, showLoader } = useContext(LoaderContext);
  const [rows, setRows] = useState<ITableRow[]>([]);
  const [filteredRows, setFilteredRows] = useState<ITableRow[]>([]);
  const [clickedRows, setClickedRows] = useState<{ [key: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Local storage handling
  const itemsFromStorage = getItemFromStorage('shoppingCart');
  const cartDataFromLocalStorage = itemsFromStorage ? itemsFromStorage : [];

  // Load more items
  const loadMoreItems = () => {
    setCurrentPage(currentPage + 1);
  };

  // Handle adding/removing items to/from the shopping cart
  const handleAddItem = (row: ITableRow) => {
    const itemId = row.id;
    const isCurrentlySelected = isItemInLocalStorage(itemId);

    if (!isCurrentlySelected) {
      addItemToLocalStorage(row);
      addItemsCount();
    } else {
      removeItemFromLocalStorage(itemId);
      getItemsCount();
    }

    setClickedRows((prevClickedRows) => ({
      ...prevClickedRows,
      [itemId]: !isCurrentlySelected,
    }));
  };

  // Check if an item is in local storage
  const isItemInLocalStorage = (itemId: number) => {
    return cartDataFromLocalStorage.some((item: ITableRow) => item.id === itemId);
  };

  // Add an item to local storage
  const addItemToLocalStorage = (row: ITableRow) => {
    cartDataFromLocalStorage.push(row);
    setItemInStorage('shoppingCart', cartDataFromLocalStorage);
  };

  // Remove an item from local storage
  const removeItemFromLocalStorage = (itemId: number) => {
    const cartData = cartDataFromLocalStorage.filter((item: ITableRow) => item.id !== itemId);
    setItemInStorage('shoppingCart', cartData);
  };

  // Fetch and set data from the API
  const fetchAndSetData = useCallback(async (tabData: string) => {
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
  }, [showLoader, hideLoader, searchParam]);

  // Set rows from local storage when available
  useEffect(() => {
    setRows(cartDataFromLocalStorage);
  }, [cartDataFromLocalStorage]);

  // Fetch and set data when searchParam or tabData changes
  useEffect(() => {
    fetchAndSetData(tabData);
  }, [searchParam, tabData, fetchAndSetData]);

  // JSX rendering
  return (
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
            {filteredRows.slice(0, currentPage * itemsPerPage).map((row: ITableRow) => (
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
      {filteredRows.length > currentPage * itemsPerPage && (
        <div className={cl.AnalysesTable__ButtonContainer}>
          <Button
            active={true}
            onClick={loadMoreItems}
            className={cl.AnalysesTable__Button}
          >
            Завантажити ще
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnalysesTable;
