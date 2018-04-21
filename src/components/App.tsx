import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connected, IProps } from 'utils/redux';
import * as routes from 'utils/routes';
import * as components from 'components';
import * as g from 'styles';

export class App extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);

    this.props._Events.subscribe('messages', {
      onmessage: e => {
        let data = JSON.parse(e.data);
        console.dir(`Received ${data} on messages...`);
        this.props._App.setMessage(data);
      },
    });
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
