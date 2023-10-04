import { ADD_ITEM, REMOVE_ALL, REMOVE_ITEM } from "./actions";

interface IShoppingCart {
    id: number;
    name: string;
    price: number;
    deadline: number;
}


export type TShoppingCart = {
    shoppingCartItems: IShoppingCart[]
}

const initialState: TShoppingCart= {
    shoppingCartItems: []
}

export const shoppingCartReducer = (state = initialState, action: any) => {
    switch(action.type){
        case ADD_ITEM: return {...state, shoppingCartItems: [ ...state.shoppingCartItems, action.payload]}
        case REMOVE_ITEM: 
            return { 
                ...state,
                shoppingCartItems: state.shoppingCartItems
                    .filter(item => item.id !== action.payload.id) 
            };
        default: return state;
        case REMOVE_ALL: return {...state, shoppingCartItems: []}

    }
}

export default shoppingCartReducer;