import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import d3 from 'd3';
import _ from 'lodash';
import measured from '@yomguithereal/react-utilities/measured';

class matrice extends Component {

  handleClick(source, target, links) {
    const mentions = _.filter(links, {'source':source,'target':target});
    tree.set('selectedMentions', mentions);
  };

  render(){

    const color = d3.scale.category10(),
          width = this.props.width,
          height = this.props.height,
          spacingX = 30,
          offsetY = 30,
          offsetX = 50,
          spacingY = (this.props.height-offsetY)/this.props.events.length,
          cellMargin = 4,
          fontSizeMax = 12,
          actorsCount = this.props.actors.length,
          fontSize = Math.min(spacingY,fontSizeMax);


    let eventY = {}, actorsX = {}, actorsColor = {};
    this.props.events.forEach( (d, i) => {
      eventY[d.recId] = spacingY * i + offsetY;
    });

    this.props.actors.forEach( (d, i) => {
      actorsX[d.recId] = spacingX * i + offsetX;
      actorsColor[d.recId] = color(i);
    });

    const opacityScale = d3.scale.linear().domain([0,12]).range([0.2,1]);

    function eventLabels(event){
      return (
        <g >
          <rect
            className='cell'
            key={'event'+event.recId}
            style={{fill:'#EDEDED'}}
            x={offsetX}
            y={eventY[event.recId]}
            width={spacingX * actorsCount}
            height={spacingY-cellMargin}
          >
            <title>{event.shortName}</title>
          </rect>

          <text
            x={spacingX*(actorsCount+0.5)+offsetX}
            y={eventY[event.recId] + spacingY/2}
            style={{'font-size':fontSize+'px'}}
          >
            {_.truncate(event.shortName, {'length': 140})}
          </text>

          <text
            x={0}
            y={eventY[event.recId] + spacingY/2}
            style={{'font-size':fontSize+'px'}}
          >
            {event.startDate}
          </text>
        </g>
      )
    }

    function actorsLabels(actor, i){
      return (
        <text
          className="actors"
          x={actorsX[actor.recId] + spacingX/2}
          y={offsetY/2}>
          {i+1}
        </text>
      )
    }

    function cells(link, links, handleClick, selectedMentions){

      const mentions = _.filter(links,{target:link.target, source:link.source});
      const color = actorsColor[link.target];

      console.log(
        _(selectedMentions)
          .map(mention => { return [mention.source,mention.target]})
          .flatten()
          .value()
      )

      if(_.isUndefined(eventY[link.source])) return '';

      return (
        <g opacity={opacityScale(mentions.length)}>
          <rect
            className='cell'
            key={'cell'+actorsX[link.target].recId+'-'+eventY[link.source]}
            style={{fill:color}}
            x={actorsX[link.target]}
            y={eventY[link.source]}
            width={spacingX}
            height={spacingY-cellMargin}
            onClick={e => { handleClick(link.source, link.target, links) }}
            recId={link.recId}
          >
            <title>{link.recTitle} ( {mentions.length} mentions )
              {mentions.map((mention,i) => '\n—\t '+(i+1)+'. '+mention.relDescription+'\n')}
            </title>
          </rect>
        </g>
      )
    }

    return (
      <div className="maticeBox">
        <svg width={width} height={height} className="matrice">
          <g>{this.props.events.map(eventLabels)}</g>
          <g>{this.props.actors.map(actorsLabels)}</g>
          <g>{this.props.links.map(cell => cells(cell, this.props.links, this.handleClick, this.props.selectedMentions))}</g>
        </svg>
      </div>
    )
  }
}

export default branch(
  measured(
    { width: '100%', height: '100%'},
    matrice
  ),
  {
    cursors:{
      events:'events',
      actors:'actors',
      links:['graph','links'],
      selectedMentions:'selectedMentions'
    }
  }
)

