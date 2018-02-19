import * as React from 'react';
import { connected, IProps } from '../utils/redux';
import style from '../styles/App';
import { RealisticTyper } from 'react-realistic-typer';

export class App extends React.Component<IProps>{
  componentWillMount(){
    this.props._App.newMessage();
  }

  render(){
    return <section id='App' style={style}>
      <h1><RealisticTyper message={this.props.App.message || ''}/></h1>
      <button onClick={this.props._App.newMessage}>Click Me!</button>
    </section>;
  }
}

export default connected(App);