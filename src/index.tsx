import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { App } from './app';

import { history } from 'libs/history';
import { authStore as auth, carsStore as cars } from 'stores';
import { AlertProvider, StoreProvider } from 'components';

const root = document.querySelector('#root');
function render(): void {
  ReactDOM.render(
    <Router history={history}>
      <StoreProvider stores={{ auth, cars }}>
        <AlertProvider>
          <App />
        </AlertProvider>
      </StoreProvider>
    </Router>,
    root,
  );
}

render();
