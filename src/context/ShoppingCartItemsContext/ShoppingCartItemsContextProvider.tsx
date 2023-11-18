// contexts/LoaderContext.js
import * as React from 'react';


import ShoppingCartItems from './ShoppingCartItemsContext';
import { getItemFromStorage } from '../../utils/localStorageItems';

  
export function ShoppingCartItemsContextProvider({ children }: any) {
  const shoppingCart = getItemFromStorage("shoppingCart") || [];
  
  const [items, setItems] = React.useState(shoppingCart);

  const itemsWithAddedItem = (item: any) => {
    setItems((items: any) => [...items, item])
  }

  const itemsWithRemovedItem = (item: any) => {
    setItems((items: any) => items.filter((existingItem: any) => existingItem.id !== item.id));
  }

  const clearItems = () => {
    setItems([])
  }
  
  return (
    <ShoppingCartItems.Provider value={{ items, itemsWithAddedItem, itemsWithRemovedItem, clearItems }}>
        {children}
    </ShoppingCartItems.Provider>
  );
}

export default ShoppingCartItemsContextProvider;           