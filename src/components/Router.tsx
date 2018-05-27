import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from 'utils/routes';
import { components } from 'components';

export class Router extends React.Component<{}> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.Home} component={components.Chat} />
          <Route component={components.NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
