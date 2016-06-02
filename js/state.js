import Baobab, {monkey} from 'baobab';
import {filter} from 'lodash';
import Sutils from './utils.js';

var customData = require('./../data.json');


function dataCleaner(data){

  var links = _(data)
    .filter('recTypeId', 1)
    .filter(d => {
      return _.includes(Sutils.getAll(data, 'recId'), d.target)
          && _.includes(Sutils.getAll(data, 'recId'), d.source)
    }).value()

  var nodes = _(data)
    .filter(d => d.recTypeId != 1)
    .filter(d => {
      return _.includes(Sutils.getAll(links, 'source'), d.recId)
          || _.includes(Sutils.getAll(links, 'target'), d.recId)
    })
    .sortBy('startDate')
    .value()

  return { link: links, nodes: nodes };

}

const tree = new Baobab({
  counter: 0,
  what:'tou',
  graph: dataCleaner(customData.results),
  peoples: monkey({
    cursors: { results: ['graph', 'nodes'] },
    get: data => filter(data.results, ['recTypeId', 10])
  }),
  events: monkey({
    cursors: { results: ['graph', 'nodes'] },
    get: data => filter(data.results, ['recTypeId', 20])
  })
})

export default tree;
