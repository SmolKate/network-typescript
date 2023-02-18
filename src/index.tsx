import reportWebVitals from './reportWebVitals.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
// @ts-ignore
import store from './redux/redux-store';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <HashRouter basename='/'>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </React.StrictMode>
);




reportWebVitals();
