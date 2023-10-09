import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx';
import './index.css';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';

const reactRoot = createRoot(document.getElementById('root'));

reactRoot.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
