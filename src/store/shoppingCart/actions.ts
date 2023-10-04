export const ADD_ITEM = "ADD_ITEM"
export const REMOVE_ITEM = "REMOVE_ITEM"
export const REMOVE_ALL = "REMOVE_ALL"



export const addItemToShoppingCart = (payload: any) => ({type: ADD_ITEM, payload})
export const removeItemFromShoppingCart = (payload: any) => ({type: REMOVE_ITEM, payload})
export const clearShoppingCart = () => ({type: REMOVE_ALL})