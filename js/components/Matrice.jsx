import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import d3 from 'd3';
import _ from 'lodash';

class matrice extends Component {
  render(){

    const color = d3.scale.category10();
    const spacingX = 50, spacingY = 11, offsetY = 30;
    const width = 700, height = (this.props.events.length + 2) * spacingY + offsetY ;

    let eventY = {}, actorsX = {}, actorsColor = {};

    this.props.events.forEach( (d, i) => {
      eventY[d.recId] = spacingY * i + offsetY;
    });

    this.props.actors.forEach( (d, i) => {
      actorsX[d.recId] = spacingX * i;
      actorsColor[d.recId] = color(i);
    });


    const opacityScale = d3.scale.linear().domain([0,12]).range([0.2,1]);

    console.log(eventY);

    function eventLabels(event){
      return (
        <g>
          <line
            className="eventLine"
            x1={0}
            y1={eventY[event.recId] + spacingY/2}
            x2={spacingX*5.5}
            y2={eventY[event.recId] + spacingY/2}
          ><title>{event.shortName}</title></line>

          <text x={spacingX*5.5} y={eventY[event.recId] + 9}>
            • {event.startDate} — {event.shortName}
          </text>
        </g>
        )
    }

    function actorsLabels(actor){
      return (
        <g>
          <line
            className="eventLine"
            x1={actorsX[actor.recId] + spacingX/2}
            y1={offsetY - spacingY/2}
            x2={actorsX[actor.recId] + spacingX/2}
            y2={height}
          ><title>{actor.recTitle}</title></line>
          <text className="actors" x={actorsX[actor.recId] + spacingX/2} y={offsetY - spacingY/2}>
            {actor.recTitle}
          </text>
        </g>
      )
    }

    function cells(link, links){

      const mentions = _.filter(links,{target:link.target, source:link.source});
      const color = actorsColor[link.target];


      return (
        <g opacity={opacityScale(mentions.length)}>
          <rect
          style={{fill:color}}
          x={actorsX[link.target] + 3}
          y={eventY[link.source] + 1} width={spacingX-6} height={spacingY-2}>
            <title>{link.recTitle} ( {mentions.length} mentions )

              {mentions.map((mention,i) => '\n\t '+(i+1)+'. '+mention.relDescription+'\n')}

            </title>
          </rect>
        </g>
        )
    }

    return (
      <svg width={width} height={height} className="matrice">
        <g>{this.props.events.map(eventLabels)}</g>
        <g>{this.props.actors.map(actorsLabels)}</g>
        <g>{this.props.links.map(cell => cells(cell, this.props.links))}</g>
      </svg>
    )
  }
}

export default branch(matrice,{cursors:{events:'events', actors:'actors', links:['graph','links']}})
