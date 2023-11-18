import { legacy_createStore as createStore, combineReducers } from 'redux';
import shoppingCartReducer from './shoppingCart/shoppingCartReducer';


const rootReducer = combineReducers({
        shoppingCart: shoppingCartReducer,
    }
)

export const store = createStore(rootReducer);

export default store;