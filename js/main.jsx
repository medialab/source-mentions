import React,{Component} from 'react';
import {render} from 'react-dom';
import {root} from 'baobab-react/higher-order';
import tree from './state';
import Counter from './components/Counter.jsx';
import Report from './components/Report.jsx';
import DataList from './components/DataList.jsx';
import Streamgraph from './components/Streamgraph.jsx';

import '!style!css!less!./../assets/less/style.less';

class App extends Component {
  render(){
    return (
      <div className="container">
        <Counter/>
        <Report/>
        <Streamgraph/>

        <DataList/>
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
