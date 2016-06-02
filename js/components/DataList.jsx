import React,{Component} from 'react';
import {branch} from 'baobab-react/higher-order';

class DataList extends Component {
  render(){

    function renderItem(res) {
      return (

        <div key={res.recId} className="row">
          <div className="col-sm-2"> {res.recTypeName}</div>
          <div className="col-sm-8"> {res.recTitle}</div>
        </div>
      )
    }

    return (
      <div>{this.props.events.map(renderItem)}</div>
    )
  }
}

export default branch(DataList,{cursors:{events:'events'}})
