import * as React from 'react';
import { getItemFromStorage } from '../../utils/localStorageItems';


const shoppingItems = getItemFromStorage("shoppingCart");


export const ShoppingCartItemsContext = React.createContext({
  items: shoppingItems,
  itemsWithAddedItem: (item: any) => {},
  itemsWithRemovedItem: (item: any) => {},
  clearItems: () => {}
});

export default ShoppingCartItemsContext;