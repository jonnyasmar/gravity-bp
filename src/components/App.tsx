import * as React from 'react';
import { connected, IProps } from 'reducers';
import { components } from 'components';
import { process } from 'utils/publish';
import { g } from 'styles';

interface IWindow {
  width: number;
  height: number;
}

interface IState {
  window: IWindow;
}

class Main extends React.Component<IProps, IState> {
  state = {
    window: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };

  constructor(props: IProps) {
    super(props);

    const { Actions } = props;

    Actions.Events.subscribe('messages', {
      onmessage: async e => {
        let event = JSON.parse(e.data);
        console.log(`Received on messages...`, event.data);
        await process(Actions, event.action)(event.data);
      },
    });

    window.addEventListener('resize', () => {
      this.setState({
        window: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
    });
  }

  render() {
    const { Router } = components;
    const { Main, Section, Header, Div } = g;

    return (
      <Main layout="flexible vertical" window={this.state.window}>
        <Header layout="flexible stretch:0-0-auto">
          <Div text="align">~ Gravity Boilerplate ~</Div>
        </Header>

        <Section layout="flexible vertical">
          <Router />
        </Section>

        {/*<g.footer layout="flexible">
            <g.div text="align">Footer</g.div>
          </g.footer>*/}
      </Main>
    );
  }
}

export const App = connected(Main);
