import * as React from 'react';
import { connected, IProps } from 'utils/redux';
import { RealisticTyper } from 'react-realistic-typer';
import * as g from 'styles';

class Main extends React.Component<IProps> {
  render() {
    return (
      <>
        <g.h1>
          <RealisticTyper message={this.props.App.message || ''} />
        </g.h1>
      </>
    );
  }
}

export const Home = connected(Main);
