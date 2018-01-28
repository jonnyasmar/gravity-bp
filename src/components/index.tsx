import * as React from 'react';
import { render } from 'react-dom';
import { store } from '../utils/store';
import { register } from '../utils/sw';
import App from './App'
import '../views/index.twig'

const {Provider} = require('react-redux');

document.write('<main id="root"></main>');

render(
  <Provider store={store}>
    <App compiler='TypeScript' framework='React'/>
  </Provider>,
  document.getElementById('root')
);

register();

if(module.hot) module.hot.accept();