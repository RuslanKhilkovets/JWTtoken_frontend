import * as React from 'react';
import { getItemFromStorage } from '../../utils/localStorageItems';

const shoppingCart = getItemFromStorage("shoppingCart");
const shoppingItemsCount = shoppingCart ? shoppingCart.length : 0;


export const ShoppingCartItemsCountContext = React.createContext({
  itemsCount: shoppingItemsCount,
  getItemsCount: () => {},
  addItemsCount: () => {},
  clearItemsCount: () => {}
});

export default ShoppingCartItemsCountContext;