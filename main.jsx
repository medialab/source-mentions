// file: main.jsx
import React from 'react';
import {render} from 'react-dom';
import App from './js/App.jsx';

import '!style!css!less!./assets/less/style.less';

const mountNode = document.getElementById('app');

render(<App />, mountNode);
