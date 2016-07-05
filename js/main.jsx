import React,{Component} from 'react';
import {render} from 'react-dom';
import {root} from 'baobab-react/higher-order';
import tree from './state';
import Counter from './components/Counter.jsx';
import Report from './components/Report.jsx';
import DataList from './components/DataList.jsx';
import Streamgraph from './components/Streamgraph.jsx';
import Matrice from './components/Matrice.jsx';
import Controls from './components/Controls.jsx';

import '!style!css!less!./../assets/less/style.less';

class App extends Component {
  render(){
    return (
      <div>

        <div className="container navbar-fixed-top" >
          <Controls/>
        </div>

        <div id="vizContainer" className="container">
          <div className="row matrice"><Matrice/></div>
          <div className="row"><Streamgraph/></div>
          <div className="row"><DataList/></div>
        </div>

      </div>
    )
  }
}

// attach tree to app : creates a new component : RootedApp
const RootedApp = root(App,tree);

var mountNode = document.getElementById('app');
render(<RootedApp/>, mountNode);

module.exports = tree;
window.tree = tree;
