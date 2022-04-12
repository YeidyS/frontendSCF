import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Log from './login/ILogin'
import Logs from './login/Login'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
