import React,{Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';
import * as actions from './../actions.js';


class Controls extends Component {

  updateInputMention(e) { tree.set('minMentions',e.target.value) }
  updateInputMentionBy(e) { tree.set('minMentionsBy',e.target.value) }

  render(){
    return (
      <div id="controls">

        <h4>Schengen mentions</h4>
        Events mentioned at least …
        <h6>{this.props.minMentions} times</h6>
        <ReactSliderNativeBootstrap
            value={this.props.minMentions}
            handleChange={this.updateInputMention}
            step={1}
            max={15}
            min={1}
            disabled="disabled" />

        <h6>by {this.props.minMentionsBy} actors</h6>
        <ReactSliderNativeBootstrap
            value={this.props.minMentionsBy}
            handleChange={this.updateInputMentionBy}
            step={1}
            max={5}
            min={1}
            disabled="disabled" />
      </div>
    )
  }
}
export default branch(Controls,{ cursors:
  {
    minMentions:'minMentions',
    minMentionsBy:'minMentionsBy'
  }
})
