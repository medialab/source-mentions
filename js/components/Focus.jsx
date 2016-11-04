import React,{Component} from 'react'
import {branch} from 'baobab-react/higher-order'

class Message extends Component {
  render(){

    function mentionsInfos(mention, i){

      const title = mention.recTitle.replace('| is mentioned by - &gt;',' — ')

      return <div>
        <h3>{(i > 0)|| title}</h3>
        <blockquote>{mention.relDescription}</blockquote>
        <hr/>
      </div>;

    }

    return (
      <div>
        {this.props.activeMentions.map(mentionsInfos)}
      </div>
    )
  }
}

export default branch(Message,{cursors:{activeMentions:'activeMentions'}})
