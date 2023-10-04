import * as React from 'react';
import cl from './AnalysesTable.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { addItemToShoppingCart } from '../../store/shoppingCart/actions';
import Button from '../UI/Button/Button';
import getDataFromUrl from "../../utils/getDataFromUrl"
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
    const [clickedRows, setClickedRows] = React.useState<{ [key: number]: boolean }>({});

    const dispatch = useDispatch();


    const { hideLoader, showLoader } = React.useContext(LoaderContext);
    const { shoppingCartItems } = useSelector((state: any) => state.shoppingCart);

    
    const handleAddItem = (row: Row) => {
        const isItemInCart = shoppingCartItems.some((item: any) => item.id === row.id);
        if (!isItemInCart) {
            dispatch(addItemToShoppingCart(row));
        }
    };

    React.useEffect(() => {
        const fetchAndSetData = async () => {
            try {
                showLoader(); 
                const url = "http://localhost:3001/rows";
                const result: Row[] = await getDataFromUrl(url);
                setRows(result);
                setClickedRows(result.reduce((acc, row) => ({ ...acc, [row.id]: false }), {}));
            } 
            catch (error) {
                console.error(error);
            }
            finally{
                hideLoader(); 
            }
        };
        
        fetchAndSetData(); 

    }, []);

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
                            {
                                rows.map((row: Row) => (
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
                                                        [row.id]: true,
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
