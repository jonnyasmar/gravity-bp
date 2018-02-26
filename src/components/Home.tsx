import * as React from 'react';
import { connected, IProps } from '../utils/redux';
import { RealisticTyper } from 'react-realistic-typer';

class Main extends React.Component<IProps>{
  componentWillMount(){
    this.props._App.newMessage();
  }

  render(){
    return (
      <section id='Home'>
        <h1><RealisticTyper message={this.props.App.message || ''}/></h1>
        <button onClick={this.props._App.newMessage}>Click Me!</button>
      </section>
    );
  }
}

export const Home = connected(Main);