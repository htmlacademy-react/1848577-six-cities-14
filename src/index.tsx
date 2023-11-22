import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {offers} from './mocks/mocks';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store = {store}>
    <React.StrictMode>
      <App offers={offers} />
    </React.StrictMode>
  </Provider>
);
