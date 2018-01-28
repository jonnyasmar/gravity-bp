import * as React from 'react';
import { connected, IProps } from '../utils/redux';
import style from '../styles/App';

export class App extends React.Component<IProps>{
  newMessage = (): void =>{
    this.props._App.newMessage();
  };

  render(){
    return <section id='App' style={style}>
      <h1>{this.props.App.message}</h1>
      <button onClick={this.newMessage}>Click Me!</button>
    </section>;
  }
}

export default connected(App);