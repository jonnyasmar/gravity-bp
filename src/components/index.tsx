import * as React from "react";
import { render } from "react-dom";
import { store } from '../utils/store';
import { register } from '../utils/sw';
import App from './App'
import '../styles/index.scss';
const {Provider} = require('react-redux');

render(
  <Provider store={store}>
    <App compiler="TypeScript" framework="React"/>
  </Provider>,
  document.getElementById('root')
);

register();