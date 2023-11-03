// contexts/LoaderContext.js
import * as React from 'react';


import ShoppingCartItemsCount from './ShoppingCartItemsCountContext';
import { getItemFromStorage } from '../../utils/localStorageItems';

  
export function ShoppingCartItemsCountContextProvider({ children }: any) {
  const shoppingCart = getItemFromStorage("shoppingCart");
  const shoppingItemsCount = shoppingCart ? shoppingCart.length : 0;
  
  const [itemsCount, setItemsCount] = React.useState(shoppingItemsCount)

  const addItemsCount = () => {
    setItemsCount(itemsCount + 1)
  }

  const getItemsCount = () => {
    setItemsCount(itemsCount - 1)
  }

  const clearItemsCount = () => {
    setItemsCount(0)
  }
  
  return (
    <ShoppingCartItemsCount.Provider value={{ itemsCount, addItemsCount, getItemsCount, clearItemsCount }}>
        {children}
    </ShoppingCartItemsCount.Provider>
  );
}
export default ShoppingCartItemsCountContextProvider;           