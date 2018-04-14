import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connected, IProps } from 'utils/redux';
import * as routes from 'utils/routes';
import * as components from './';
import * as g from 'styles/index';

export class App extends React.Component<IProps, any> {
  getMessage = async () => {
    await this.props._App.newMessage();
  };

  constructor(props: IProps) {
    super(props);
    this.getMessage();
  }

  render() {
    return (
      <Router>
        <g.main layout="flexible vertical">
          <g.header layout="flexible">
            <g.div text="align">Header</g.div>
          </g.header>

          <g.section layout="stretch:1-1-100%">
            <Switch>
              <Route exact path={routes.Home} component={components.Home} />
              <Route component={components.NotFound} />
            </Switch>
          </g.section>

          <g.footer layout="flexible">
            <g.div text="align">Footer</g.div>
          </g.footer>
        </g.main>
      </Router>
    );
  }
}

export default connected(App, false);
