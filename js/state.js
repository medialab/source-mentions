import Baobab, {monkey} from 'baobab';
import {filter} from 'lodash';
import Sutils from './utils.js';

const customData = require('./../data.json');


function dataCleaner(data){

  const links = _(data)
    .filter('recTypeId', 1)
    .filter(d => {
      return _.includes(Sutils.getAll(data, 'recId'), d.target)
          && _.includes(Sutils.getAll(data, 'recId'), d.source)
    }).value()

  const nodes = _(data)
    .filter(d => d.recTypeId != 1)
    .filter(d => {
      return _.includes(Sutils.getAll(links, 'source'), d.recId)
          || _.includes(Sutils.getAll(links, 'target'), d.recId)
    })
    .sortBy('startDate')
    .value()

  return { links: links, nodes: nodes };

}

function getLayers(d) {

  return _(d.actors).map(actor => {

    return {
      "name": actor.recTitle,
      "node": actor,
      "values": _(d.events).map((event,i) => {

        const rel = _.find(d.graph.links, {
          'source': event.recId,
          'target': actor.recId
        })

        const weight = _.isUndefined(rel) ? 0 : 1
        return { x: i, y: weight, node:event }

      }).value()
    }

  }).value();
}

const tree = new Baobab({
  counter: 0,
  what:'tou',
  graph: dataCleaner(customData.results),
  actors: monkey({
    cursors: { results: ['graph', 'nodes'] },
    get: d => filter(d.results, ['recTypeId', 10])
  }),
  events: monkey({
    cursors: { results: ['graph', 'nodes'] },
    get: d => filter(d.results, ['recTypeId', 20])
  }),
  layers: monkey({
    cursors: { actors:['actors'], events:['events'], graph:['graph'] },
    get: d => getLayers(d)
  })
})

console.log('getlayers:', tree.get('layers'));

export default tree;
