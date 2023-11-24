import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { Hidden, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';

import { ITableRow } from '../../../types/ITableRow';
import LoaderContext from '../../../context/LoaderContext/LoaderContext';

import getDataFromUrl from '../../../utils/getDataFromUrl';

import { setItemInStorage } from '../../../utils/localStorageItems';
import { addItemToShoppingCart, removeItemFromShoppingCart } from '../../../store/shoppingCart/actions';
import generatePDFDataUrl from '../../../utils/generatePDFDataUrl ';


import cl from './AnalysesTable.module.scss';
import { useTranslation } from 'react-i18next';




const AnalysesTable = ({ searchParam, tabData }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();



  const items = useSelector((state: any) => state.shoppingCart.shoppingCartItems);
  const { hideLoader, showLoader } = useContext(LoaderContext);

  const [filteredRows, setFilteredRows] = useState<ITableRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);




  const itemsPerPage = 5;

  const loadMoreItems = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleItem = (row: ITableRow) => {
    const itemId = row.id;
    const isCurrentlySelected = isItemInLocalStorage(itemId);

    if (!isCurrentlySelected) {
      addItemToLocalStorage(row);
      dispatch(addItemToShoppingCart(row));
    } else {
      removeItemFromLocalStorage(itemId);
      dispatch(removeItemFromShoppingCart(row));
    }
  };

  const isItemInLocalStorage = (itemId: number) => items.some((item: ITableRow) => item.id === itemId);

  const addItemToLocalStorage = (row: ITableRow) => {
    const updatedCartData = [...items, row];
    setItemInStorage('shoppingCart', updatedCartData);
  };

  const removeItemFromLocalStorage = (itemId: number) => {
    const cartData = items.filter((item: ITableRow) => item.id !== itemId);
    setItemInStorage('shoppingCart', cartData);
  };

  const fetchAndSetData = useCallback(async (tabData: string) => {
    try {
      showLoader();
      const url = `http://localhost:3001/${tabData}`;
      const result: ITableRow[] = await getDataFromUrl(url);

      const filtered = result.filter((row) =>
        row.description.toLowerCase().includes(searchParam.toLowerCase())
      );

      setFilteredRows(filtered);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader, searchParam]);

  const generatePDF = async (pdfTextContent: string) => {
    const pdfDataUrl = await generatePDFDataUrl(pdfTextContent);
    navigate(`/pdfReader/${encodeURIComponent(pdfDataUrl)}`)
  };


  useEffect(() => {
    fetchAndSetData(tabData);
  }, [tabData]);


  const renderTableRow = (row: ITableRow) => (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {row.description}
      </TableCell>
      <TableCell align="center">{row.price}</TableCell>
        <Hidden mdDown>
          <TableCell align="center">{row.category}</TableCell>
          <TableCell align="center">
            <button
              className={cl.AnalysesTable__PrintBtn}
              onClick={() => generatePDF(row.description)}
            ></button>
          </TableCell>
        </Hidden>
        <TableCell align="center">
          <button
            style={{ filter: isItemInLocalStorage(row.id) ? 'grayscale(100%)' : 'none' }}
            className={cl.AnalysesTable__AddBtn}
            onClick={() => handleItem(row)}
          ></button>
        </TableCell>
    </TableRow>
  );

  return (
    <div className={cl.AnalysesTable}>
      {error ? (
        <>
          <div className={cl.error}>{error}</div>
          <Button active onClick={() => fetchAndSetData(tabData)}>
            Refresh
          </Button>
        </>
      ) : (
        <>
            {filteredRows && filteredRows.length > 0 ? (
              <TableContainer className={cl.AnalysesTable__Table} component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow className={cl.AnalysesTable__Header}>
                      <TableCell>{t('listOfAnalyses')}</TableCell>
                      <TableCell align="center">{t('price')}</TableCell>
                      <Hidden mdDown>
                        <TableCell align="center">{t('executionTerm')}</TableCell>
                        <TableCell align="center">{t('print')}</TableCell>
                      </Hidden>
                      <TableCell align="center">{t('add')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{filteredRows.slice(0, currentPage * itemsPerPage).map(renderTableRow)}</TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Loader />
            )}

          {filteredRows.length > currentPage * itemsPerPage && (
            <div className={cl.AnalysesTable__ButtonContainer}>
              <Button active={true} onClick={loadMoreItems} className={cl.AnalysesTable__Button}>
                {t("loadMore")}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AnalysesTable;