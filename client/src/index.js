import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>                               {/*Envuelvo la App con BrowserRouter para darle (a la App) la capacidad de definir rutas*/}
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
