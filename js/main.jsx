import React,{Component} from 'react'
import {render} from 'react-dom'
import {root} from 'baobab-react/higher-order'
import tree from './state'
import Matrice from './components/Matrice.jsx'
import Controls from './components/Controls.jsx'
import Focus from './components/Focus.jsx'

import '!style!css!less!./../assets/less/style.less'

class App extends Component {
  render(){
    return (
      <div className="container-fluid">

        <div className="col-sm-1">
          <Controls/>
        </div>

        <div id="vizContainer" className="col-sm-6">
          <Matrice/>
        </div>

        <div id="focus" className="col-sm-5">
          <Focus/>
        </div>

      </div>
    )
  }
}

const RootedApp = root(App,tree)

var mountNode = document.getElementById('app')
render(<RootedApp/>, mountNode)

module.exports = tree
window.tree = tree
