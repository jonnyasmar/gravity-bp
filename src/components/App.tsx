import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connected, IProps } from 'utils/redux';
import * as routes from 'utils/routes';
import * as components from 'components/index';
import * as g from 'styles/index';

export class App extends React.Component<IProps, any> {
  keepAlive;
  es;

  getMessage = async () => {
    await this.props._App.newMessage();
  };

  startStream = () => {
    this.keepAlive = null;
    if (this.es) this.es.close();
    this.es = new EventSource(process.env.FANOUT_URL || '');
    this.es.onerror = err => {
      console.error(err);
    };
    this.es.onmessage = e => {
      let data = JSON.parse(e.data);
      console.dir(data.text);
      this.props._App.setMessage(data.text);
    };
    this.es.onopen = () => {
      console.dir('connected');
    };

    window.onbeforeunload = () => {
      console.dir('disconnected');
      this.es.close();
    };

    /*this.keepAlive = setTimeout(() => {
      this.startStream();
    }, 15000);*/
  };

  constructor(props: IProps) {
    super(props);
    this.getMessage();
    this.startStream();
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
