import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { App } from './app';

import createHistory from './stores/history';
import { authStore as auth } from 'stores';
import { StoreProvider } from 'components';

const history = createHistory();

const root = document.querySelector('#root');

function render(): void {
  ReactDOM.render(
    <Router history={history}>
      <StoreProvider stores={{ auth }}>
        <App />
      </StoreProvider>
    </Router>,
    root,
  );
}

render();
