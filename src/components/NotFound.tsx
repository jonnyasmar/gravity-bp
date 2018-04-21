import * as React from 'react';
import { connected, IProps } from 'utils/redux';
import { RealisticTyper } from 'react-realistic-typer';
import * as g from 'styles';

class Main extends React.Component<IProps> {
  render() {
    return (
      <>
        <g.h1>
          <RealisticTyper message="Sorry, nothing to see here..." />
        </g.h1>
        <button
          onClick={() => {
            this.props.history.push('/');
          }}
        >
          Go Back
        </button>
      </>
    );
  }
}

export const NotFound = connected(Main);
