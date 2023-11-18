import * as React from 'react';

import { useNavigate } from 'react-router-dom';



import Card from '../../../components/Card/Card';
import Button from '../../../components/UI/Button/Button';


import { getItemFromStorage } from '../../../utils/localStorageItems';
import renderInfoAnalyses from './renderInfoAnalyses';


import ShoppingCartItemsCountContext from '../../../context/ShoppingCartItemsContext/ShoppingCartItemsContext';
import { ITableRow } from '../../../types/ITableRow';


import cl from "./DataConfirmation.module.scss";








export const DataConfirmation = () => {
    const navigate = useNavigate();
    const { clearItems } = React.useContext(ShoppingCartItemsCountContext)




    const formData = getItemFromStorage("formData")
    const shoppingCart = getItemFromStorage("shoppingCart")

    const total = shoppingCart.reduce((acc: number, item: ITableRow) => acc + item.price, 0);

    const handleRedirectToCompletePage = () => {
        localStorage.removeItem("shoppingCart");
        clearItems();
        navigate("../../payload");
    };
    
    return (
        <div className={cl.DataConfirmation}>
            <div className={cl.DataConfirmation__Container}>

                {renderInfoAnalyses(formData)}

                <Card title="Перечень анализов">
                    <div className={cl.DataConfirmation__Analysis_List}>
                        <div className={cl.DataConfirmation__Analyses}>
                            {
                                shoppingCart.length > 0 
                                ? 
                                (
                                    shoppingCart.map((item: ITableRow, index: number) => (
                                        <div key={index} className={cl.DataConfirmation__Analys}>
                                            <p className={cl.DataConfirmation__Text}>{item.description}</p>
                                            <p className={cl.DataConfirmation__Text}>{item.price} $</p>
                                        </div>
                                    ))
                                ) 
                                :
                                (
                                    <p className={cl.DataConfirmation__NoItems}>Немає аналізів</p>
                                )
                            }
                        </div>
                        <p className={cl.DataConfirmation__Total}>Разом: {total.toFixed(2)} $</p>
                    </div>
                </Card>
            </div>
            <div className={cl.DataConfirmation__ButtonContainer}>
                <Button active className={cl.DataConfirmation__Button} onClick={handleRedirectToCompletePage}>
                    Подтвердить заказ
                </Button>
            </div>
        </div>
    );
};

export default DataConfirmation;