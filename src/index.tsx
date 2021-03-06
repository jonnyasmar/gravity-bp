import * as React from 'react';
import { render } from 'react-dom';
import { store } from 'utils/store';
import { register } from 'utils/sw';
import { App } from 'components/App';
import 'views/index.twig';
import 'styles/index.scss';

const { Provider } = require('react-redux');

render(
  <Provider store={store}>
    <App compiler="TypeScript" framework="React" />
  </Provider>,
  document.getElementsByTagName('div')[0]
);

register(store);

if (module.hot) module.hot.accept();
