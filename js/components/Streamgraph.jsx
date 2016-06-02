import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import d3 from 'd3';
import _ from 'lodash';

class Streamgraph extends Component {
  render(){

    const color = d3.scale.category10();

    var stackerfun = d3.layout.stack()
    .offset("silhouette")
    .values(function(d) { return d.values; });

    const area = d3.svg.area()
      .x(d => d.x * 15 )
      .y0(d => d.y0 * 20 )
      .y1(d => (d.y0 + d.y) * 20 );

    function renderPath(d, i){
      const path = area(d.values);

      return <path
        id={'fqs'+i}
        fill={color(i)}

        stroke="white"
        d={path}
        className="storyPath" />
    }

    // console.log(this.props.layers);
    const stacked = stackerfun(this.props.layers)

    return (
      <svg width="100%" height="500" className="line-chart">
        {stacked.map(renderPath)}
      </svg>
    )
  }
}

export default branch(Streamgraph,{cursors:{layers:'layers'}})

