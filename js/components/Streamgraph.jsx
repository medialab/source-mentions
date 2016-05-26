import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';

class Streamgraph extends Component {
  render(){

    function renderItem(res,i) {
      return (
        <circle className="event" cx={100 + (res.startDate - 1900)*3} cy={50 + i} r={5} />
      )
    }
    return (
      <svg width="100%" height="200" className="line-chart">
        {this.props.events.map(renderItem)}
      </svg>)
  }
}

export default branch(Streamgraph,{cursors:{events:'events'}})
