import React,{Component} from 'react';
import {branch} from 'baobab-react/higher-order';

class DataList extends Component {
  render(){

    function renderEvents(res) {
      return (

        <div key={res.recId} className="row record">
          <div className="col-sm-1"> {res.recId}</div>
          <div className="col-sm-1"> {res.startDate}</div>
          <div className="col-sm-1"> {res.mentions} by {res.mentionsBy}</div>
          <div className="col-sm-8"> {res.recTitle}</div>
        </div>
      )
    }

    function renderActors(res) {
      return (
        <div key={res.recId} className="row record">
          <div className="col-sm-2"> {res.recId}</div>
          <div className="col-sm-8"> {res.recTitle}</div>
        </div>
      )
    }

    return (
      <div>
        <div className="row">
          <h1>actors</h1>
          {this.props.actors.map(renderActors)}
        </div>
        <div className="row">
          <h1>events</h1>
          {this.props.events.map(renderEvents)}
        </div>
      </div>
    )
  }
}

export default branch(DataList,{cursors:{events:'events',actors:'actors',linkBySource:'linkBySource'}})
