import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connected, IProps } from '../utils/redux';
import * as routes from '../utils/routes';
import * as components from './';
import style from '../styles/App';

export class App extends React.Component<IProps>{
  render(){
    return (
      <Router>
        <section id='App' style={style}>
          <Switch>
            <Route
              exact
              path={routes.Home}
              component={components.Home}
            />
            <Route
              component={components.NotFound}
            />
          </Switch>
        </section>
      </Router>
    );
  }
}

export default connected(App, false);