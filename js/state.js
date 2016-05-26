import Baobab from 'baobab';
var customData = require('./../data.json');

const tree = new Baobab({
  counter:0,
  what:'world',
  data:customData
})

export default tree;
