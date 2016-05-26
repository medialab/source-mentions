import React,{Component} from 'react';
import {branch} from 'baobab-react/higher-order';

class Message extends Component {
  render(){
    return (
      <h1>{this.props.what}</h1>
    )
  }
}

export default branch(Message,{cursors:{what:['data','reccount']}})
