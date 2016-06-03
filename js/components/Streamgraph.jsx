import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import d3 from 'd3';
import _ from 'lodash';

class Streamgraph extends Component {
  render(){

    const color = d3.scale.category10();
    const offsetx = 12, offsety = 100;
    const width = 1000, height = 500;


    function renderLines(d,i){

      return <line
          x1={i * offsetx}
          y1={0}
          x2={i * offsetx}
          y2={4 * offsety}
          className="eventLine"
        ><title>{d.shortName}</title></line>

    }


    const stack = d3.layout.stack()
      .values(function(d) { return d.values; });

    const area = d3.svg.area()
      .x(function(d)  { return offsetx * (d.x); })
      .y0(function(d) { return offsety * (d.y0); })
      .y1(function(d) { return offsety * (d.y0 + d.y); });

    function renderPath(d, i){
      return <path
        id={'fqs'+i}
        fill={color((i+5)%10)}
        d={area(d.values)}
        className="storyPath" >
          <title>{d.name}</title>
        </path>
    }

    const stacked = stack(_.cloneDeep(this.props.layers));


    return (
      <svg width={width} height={height} className="line-chart">
        <g>{this.props.events.map(renderLines)}</g>
        <g>{stacked.map(renderPath)}</g>
      </svg>
    )
  }
}

export default branch(Streamgraph,{cursors:{layers:'layers', events:'events'}})

