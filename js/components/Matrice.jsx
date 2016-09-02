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

    const color = d3.scale.category10();
    const width = this.props.width, height = this.props.height;
    const spacingX = 35,
          spacingY = (this.props.height/this.props.events.length),
          offsetY = 15,
          cellMargin = 1;

    let eventY = {}, actorsX = {}, actorsColor = {};

    this.props.events.forEach( (d, i) => {
      eventY[d.recId] = spacingY * i + offsetY;
    });

    this.props.actors.forEach( (d, i) => {
      actorsX[d.recId] = spacingX * i;
      actorsColor[d.recId] = color(i);
    });

    const opacityScale = d3.scale.linear().domain([0,12]).range([0.2,1]);

    function mentionsInfos(mention, i){

      const title = mention.recTitle.replace('| is mentioned by - &gt;',' — ');

      return <div>
        <h3>{(i > 0)|| title}</h3>
        <blockquote>{mention.relDescription}</blockquote>
        <hr/>
      </div>;

    }

    function eventLabels(event){
      return (
        <g >
          <line
            key={'event'+event.recId}
            className="eventLine"
            x1={0}
            y1={eventY[event.recId] + spacingY/2}
            x2={spacingX*5.5}
            y2={eventY[event.recId] + spacingY/2}
          ><title>{event.shortName}</title></line>

          <text
            x={spacingX*5.5}
            y={eventY[event.recId] + spacingY/2}
            // style={{'font-size':spacingY+'px'}}
          >
            {event.startDate} — {_.truncate(event.shortName, {'length': 140})}
          </text>
        </g>
        )
    }

    function actorsLabels(actor){
      return (
        <g>
          <line
            key={'actor'+actor.recId}
            className="eventLine"
            x1={actorsX[actor.recId] + spacingX/2}
            y1={offsetY}
            x2={actorsX[actor.recId] + spacingX/2}
            y2={height}
          >
            <title>{actor.recTitle}</title>
          </line>
          <text
            className="actors"
            x={actorsX[actor.recId] + spacingX/2}
            y={offsetY}>
            {actor.recTitle}
          </text>
        </g>
      )
    }

    function cells(link, links, handleClick){

      const mentions = _.filter(links,{target:link.target, source:link.source});
      const color = actorsColor[link.target];

      if(_.isUndefined(eventY[link.source])) return '';
      return (
        <g opacity={opacityScale(mentions.length)}>
          <rect
            className='cell'
            key={'cell'+actorsX[link.target].recId+'-'+eventY[link.source]}
            style={{fill:color}}
            x={actorsX[link.target]}
            y={eventY[link.source]} width={spacingX-cellMargin} height={spacingY-cellMargin}
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
        <div >
          <svg width={width} height={height} className="matrice">
            <g>{this.props.events.map(eventLabels)}</g>
            <g>{this.props.actors.map(actorsLabels)}</g>
            <g>{this.props.links.map(cell => cells(cell, this.props.links, this.handleClick))}</g>
          </svg>
        </div>
        <div>
          {this.props.selectedMentions.map(mentionsInfos)}
        </div>
      </div>
    )
  }
}

export default branch(
    measured({width: '100%',height: '100%'}, matrice),
    { cursors:{
        events:'events',
        actors:'actors',
        links:['graph','links'],
        selectedMentions:'selectedMentions'
    }}
  )

