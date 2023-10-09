import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import App from './App.jsx';
import './index.css';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
);
