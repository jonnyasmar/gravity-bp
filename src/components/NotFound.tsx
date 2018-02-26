import * as React from 'react';
import { connected, IProps } from '../utils/redux';
import { RealisticTyper } from 'react-realistic-typer';

class Main extends React.Component<IProps>{
  render(){
    return (
      <section id='NotFound'>
        <h1><RealisticTyper message="Sorry, nothing to see here..."/></h1>
        <button onClick={()=>{
          this.props.history.push('/');
        }}>Go Back</button>
      </section>
    );
  }
}

export const NotFound = connected(Main);