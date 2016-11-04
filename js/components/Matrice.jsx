import React, {Component} from 'react'
import classNames from 'classnames'
import {branch} from 'baobab-react/higher-order'
import d3 from 'd3'
import _ from 'lodash'
import Measure from 'react-measure'

class matrice extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dimensions: {
        width: 500,
        height: 500
      }
    }
  }

  handleClick(source, target, links) {
    const mentions = _.filter(links, {'source':source,'target':target})
    tree.set('activeMentions', mentions)
  }

  render(){
    const { width, height } = this.state.dimensions
    const color = d3.scale.category10(),
          spacingX = 30,
          offsetY = 30,
          offsetX = 50,
          spacingY = (height-offsetY)/this.props.events.length,
          cellMargin = 4,
          fontSizeMax = 12,
          actorsCount = this.props.actors.length,
          fontSize = Math.min(spacingY,fontSizeMax)

    let eventY = {},
        actorsX = {},
        actorsColor = {},
        yearsEventFirstEvent = _.sortedUniqBy(this.props.events,'startDate')

    this.props.events.forEach( (d, i) => {
      eventY[d.recId] = spacingY * i + offsetY
    })

    this.props.actors.forEach( (d, i) => {
      actorsX[d.recId] = spacingX * i + offsetX
      actorsColor[d.recId] = color(i)
    })

    const opacityScale = d3.scale.linear().domain([0,12]).range([0.2,1])

    function eventLabels(event, handleClick){
      return (
        <g>
          <rect
            classNames='cell'
            key={'event'+event.recId}
            style={{fill:'#EDEDED'}}
            x={offsetX}
            y={eventY[event.recId]}
            width={spacingX * actorsCount}
            height={spacingY-cellMargin}
            onClick={e => { handleClick(0, 0, []) }}
          >
            <title>{event.shortName}</title>
          </rect>

          <text
            x={spacingX*(actorsCount+0.5)+offsetX}
            y={eventY[event.recId] + spacingY/2}
            style={{'fontSize':fontSize+'px'}}
          >
            {_.truncate(event.shortName, {'length': 140})}
          </text>
        </g>
      )
    }

    function yearsLabels(event){
      return (
        <text
          x={0}
          y={eventY[event.recId] + spacingY/2}
          style={{'fontSize':fontSize+'px'}}
        >
          {event.startDate}
        </text>
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

    function cells(link, links, handleClick, activeMentions, activeEntityIds){

      const mentions = _.filter(links,{target:link.target, source:link.source})
      const isConcerned = _.indexOf(activeEntityIds,link.source) != -1 || _.indexOf(activeEntityIds,link.target) != -1
      const isActive = _.indexOf(activeEntityIds,link.source) != -1 && _.indexOf(activeEntityIds,link.target) != -1
      const color = actorsColor[link.target]
      const opacity = isActive ? '1':opacityScale(mentions.length)

      if(_.isUndefined(eventY[link.source])) return ''

      return (
        <g>
          <rect
            className={classNames({
              'cell': true,
              'active': isActive,
              'concerned': isConcerned
            })}
            key={'cell'+actorsX[link.target].recId+'-'+eventY[link.source]}
            style={{fill:color, 'opacity':opacity}}
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
      <Measure
        onMeasure={(dimensions) => {
          this.setState({dimensions})
        }}
      >
        <div className="maticeBox">
          <svg width={width} height={height} className="matrice">
            <g>{this.props.events.map(event => eventLabels(event, this.handleClick))}</g>
            <g>{yearsEventFirstEvent.map(event => yearsLabels(event) )}</g>
            <g>{this.props.actors.map(actorsLabels)}</g>
            <g>{this.props.links.map(cell => cells(
              cell,
              this.props.links,
              this.handleClick,
              this.props.activeMentions,
              this.props.activeEntityIds
            ))}</g>
          </svg>
        </div>
      </Measure>
    )
  }
}

export default branch(matrice,
  {
    cursors:{
      events:'events',
      actors:'actors',
      links:['graph','links'],
      activeMentions:'activeMentions',
      activeEntityIds:'activeEntityIds'
    }
  }
)

