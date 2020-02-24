import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { App } from './app';

import createHistory from './store/history';

const history = createHistory();

const root = document.querySelector('#root');

function render(): void {
  ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    root,
  );
}

render();
