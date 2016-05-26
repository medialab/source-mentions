import React,{Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {increment} from './../actions.js';

class Counter extends Component {

  render(){
    return (
      <div>
        <span>{this.props.counter}</span>
        <button onClick={this.props.actions.increment}>plus</button>
      </div>
    )
  }
}

export default branch(Counter,{cursors:{counter:'counter'},actions:{increment}})
