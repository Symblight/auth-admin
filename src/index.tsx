import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { App } from './app';

import { history } from 'libs/history';
import { AlertProvider } from 'components';

const root = document.querySelector('#root');
function render(): void {
  ReactDOM.render(
    <Router history={history}>
      <AlertProvider>
        <App />
      </AlertProvider>
    </Router>,
    root,
  );
}

render();
