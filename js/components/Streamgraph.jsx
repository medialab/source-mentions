import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {scaleLinear} from 'd3-scale';
import _ from 'lodash';

class Streamgraph extends Component {
  render(){

    const events = this.props.events;

    console.log(events);

    const minYear = _.minBy(events, 'startDate').startDate,
          maxYear = _.maxBy(events, 'startDate').startDate

    console.log(minYear, maxYear, _.minBy(events, 'startDate'));


    const x = scaleLinear()
      .domain([minYear, maxYear])
      .range([0, 1000]);

    function renderItem(d,i) {
      return (
        <circle
          key={d.recId}
          className="event"
          cx={10 + x(d.startDate)}
          cy={10 + (i*6)}
          r={2} />
      )
    }
    return (
      <svg width="100%" height="500" className="line-chart">
        {this.props.events.map(renderItem)}
      </svg>)
  }
}

export default branch(Streamgraph,{cursors:{events:'events'}})

