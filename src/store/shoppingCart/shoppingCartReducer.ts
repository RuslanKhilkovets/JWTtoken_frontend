import { TShoppingCart } from "../../types/IShoppingCart";
import { getItemFromStorage } from "../../utils/localStorageItems";

import { ADD_ITEM, ADD_ITEMS, REMOVE_ALL, REMOVE_ITEM } from "./actions";



const itemsFromStorage = getItemFromStorage("shoppingCart") || [];


const initialState: TShoppingCart = {
    shoppingCartItems: itemsFromStorage,
};


export const shoppingCartReducer = (state = initialState, action: any) => {
    switch(action.type){
        case ADD_ITEM: return {...state, shoppingCartItems: [ ...state.shoppingCartItems, action.payload]}
        case ADD_ITEMS: return {...state, shoppingCartItems: [ ...action.payload]}
        case REMOVE_ITEM: 
            return { 
                ...state,
                shoppingCartItems: state.shoppingCartItems
                    .filter(item => item.id !== action.payload.id) 
            };
        case REMOVE_ALL: return {...state, shoppingCartItems: []}
        default: return state;
    }
}

export default shoppingCartReducer;