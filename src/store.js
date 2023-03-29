import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"
import rootReducer from './Reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

const initialState = {
    cart : {
       cartSubTotal :  JSON.parse(localStorage.getItem('cart-subtotal')) || 0,
       cartItems : JSON.parse(localStorage.getItem('cart-items')) || []
    },
    user : {
        isAuthenticated : false,
        user : {}
    }
}

export const store = createStore(rootReducer, initialState,composedEnhancer);
console.log('store.getState()')
console.log(store.getState())
// export store