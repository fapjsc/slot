import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DeviceState from './context/device/DeviceState';

ReactDOM.render(
  <React.StrictMode>
    <DeviceState>
      <App />
    </DeviceState>
  </React.StrictMode>,
  document.getElementById('root')
);
