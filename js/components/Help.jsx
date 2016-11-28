import React,{Component} from 'react'
import {branch} from 'baobab-react/higher-order'
import {toogleHelp} from './../actions.js';

class Message extends Component {

  render(){

    return (
      <div>
        {this.props.helpModal ?
          (
            <div className="help container">

              <div className="message col-sm-6">
                <h1>Source Mentions</h1>
                <hr/>
                <h4>how to read ?</h4>
                <p>A <strong>cell</strong> represents an event quoted by an actor, a <strong>column</strong> an actors narrative and <strong>rows</strong> the time.</p>
                <p>On the <strong>horizontal</strong> axis you can explore ways of speaking about a <strong>specific event</strong>.
                  On the <strong>vertical</strong> axis you can explore the whole story for a <strong>given actor</strong>.</p>
                  <p>Click on the cells to see quotations about a specific event.</p>
                <hr/>
                <h4>Disclaimer</h4>
                <p>‘This is a work in progress not a final version. Do not quote or circulate.If you have any questions or remarks please contact mederic.martin-maze@kcl.ac.uk</p>
                <p>This visualisation was designed in the framework of the 'source' project by King's College London and SciencesPo Médialab.</p>
                <hr/>
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  onClick={this.props.actions.toogleHelp}>
                  Close this window
                </button>
              </div>
            </div>
          )
         : ''}
      </div>
    )
  }
}

export default branch(Message, {cursors: {helpModal:'helpModal'}, actions:{toogleHelp} })
