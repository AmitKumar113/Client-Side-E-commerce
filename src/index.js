import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import { getAllProducts, getSellerProducts } from './Actions/productActions'
import { setUserByAuthtoken } from './Actions/userActions'
// import { getSellerProducts } from ''

store.dispatch(getAllProducts)
store.dispatch(setUserByAuthtoken)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
