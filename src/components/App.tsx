import * as React from 'react';
import { connected, IProps } from '../utils/redux';
import '../styles/App.scss';

export class App extends React.Component<IProps>{
  newMessage = (): void =>{
    this.props._App.newMessage();
  };

  constructor(props: IProps){
    super(props);
  }

  render(){
    return <section id="App">
      <h1>{this.props.App.message}</h1>
      <button onClick={this.newMessage}>Click Me!</button>
    </section>;
  }
}

export default connected(App);