import React,{Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';
import * as actions from './../actions.js';


class Controls extends Component {

  updateInput(e) { tree.set('minDegree',e.target.value) }

  render(){
    return (<div id="controls">

      <h4>Schenghen mentions</h4>
      <hr/>
      <p>Events mentioned at least {this.props.minDegree} times</p>
      <ReactSliderNativeBootstrap
          value={this.props.minDegree}
          handleChange={this.updateInput}
          step={1}
          max={15}
          min={1}
          disabled="disabled" />

      <hr/>
      <p>Events mentioned at least by {this.props.minDegree} actors</p>

    </div>)
  }
}
export default branch(Controls,{ cursors:{minDegree:'minDegree'}})
