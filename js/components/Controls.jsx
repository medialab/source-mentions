import React,{Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';
import * as actions from './../actions.js';


class Controls extends Component {

  updateInputMention(e) { tree.set('minMentions',e.target.value) }
  updateInputMentionBy(e) { tree.set('minMentionsBy',e.target.value) }

  render(){
    return (<div id="controls">

      <h4>Schenghen mentions</h4>
      <hr/>
      <p>Events mentioned at least {this.props.minMentions} times</p>
      <ReactSliderNativeBootstrap
          value={this.props.minMentions}
          handleChange={this.updateInputMention}
          step={1}
          max={15}
          min={1}
          disabled="disabled" />

      <hr/>
      <p>Events mentioned at least by {this.props.minMentionsBy} actors</p>
      <ReactSliderNativeBootstrap
          value={this.props.minMentionsBy}
          handleChange={this.updateInputMentionBy}
          step={1}
          max={5}
          min={1}
          disabled="disabled" />

    </div>)
  }
}
export default branch(Controls,{ cursors:{minMentions:'minMentions',minMentionsBy:'minMentionsBy'}})
