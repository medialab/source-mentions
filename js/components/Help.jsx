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
                <h1>Source Mention</h1>
                <p>
                Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.
                </p>

                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  onClick={this.props.actions.toogleHelp}>
                  Close
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
