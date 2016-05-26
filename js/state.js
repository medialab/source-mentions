import Baobab, {monkey} from 'baobab';
import {filter} from 'lodash';

var customData = require('./../data.json');

const tree = new Baobab({
  counter:0,
  what:'tou',
  data:customData,
  peoples: monkey({
    cursors: {
      results: ['data', 'results']
    },
    get: function(data) {
      return filter(data.results, ['recTypeId', 10]);
    }
  }),
  events: monkey({
    cursors: {
      results: ['data', 'results']
    },
    get: function(data) {
      return filter(data.results, ['recTypeId', 20]);
    }
  })
})

export default tree;
