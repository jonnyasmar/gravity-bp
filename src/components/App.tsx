import * as React from 'react';
import { connected, IProps } from 'reducers';
import { components } from 'components';
import { g } from 'styles';

class Main extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);

    const { Actions } = props;

    Actions.Events.subscribe('messages', {
      onmessage: async e => {
        let data = JSON.parse(e.data);
        console.log(`Received ${data.text} on messages...`);
        await Actions.Chat.newMessage(data);
      },
    });

    this.state = {
      window: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

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
          <Div text="align">Gravity Boilerplate</Div>
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
