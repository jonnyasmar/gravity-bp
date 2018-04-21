import * as React from 'react';
import { connected, IProps } from 'utils/redux';
import { RealisticTyper } from 'react-realistic-typer';
import * as g from 'styles';
import { request } from 'utils/request';

class Main extends React.Component<IProps> {
  input: string;

  constructor(props) {
    super(props);
    this.input = '';
  }

  render() {
    return (
      <>
        <g.h1>
          <RealisticTyper message={this.props.App.message || ''} />
        </g.h1>

        <br />
        <br />

        <form
          onSubmit={e => {
            e.preventDefault();
            request('events/messages/send', {
              method: 'POST',
              data: {
                message: this.input,
              },
            });
          }}
        >
          <input
            placeholder="Send a message..."
            onChange={e => {
              this.input = e.target.value;
            }}
          />
          <button type="submit">Send</button>
        </form>
      </>
    );
  }
}

export const Home = connected(Main);
