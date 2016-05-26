import React,{Component} from 'react';
import {render} from 'react-dom';
import {root} from 'baobab-react/higher-order';
import tree from './state';
import Counter from './components/Counter.jsx';
import Message from './components/Message.jsx';


import '!style!css!less!./../assets/less/style.less';

class App extends Component {
  render(){
    return (
      <div className="container">
        <Counter/>
        <Message/>
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
