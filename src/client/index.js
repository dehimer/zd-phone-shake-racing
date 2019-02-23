import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { StoreContext } from 'redux-react-hook';

import App from './components/App';
import configureStore from './store/configureStore';
import 'typeface-roboto';

import './index.css';


const store = configureStore();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);
