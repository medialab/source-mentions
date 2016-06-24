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
    })
    .filter('relTypeId',5467)
    .value()

  let nodes = _(data)
    .filter(d => d.recTypeId != 1)
    .filter(d => {
      return _.includes(Sutils.getAll(links, 'source'), d.recId)
          || _.includes(Sutils.getAll(links, 'target'), d.recId)
    })
    .sortBy('startDate')
    .value();

  const nodeByRecId = _.keyBy(nodes,'recId');
  const linksFiltered = _(links).filter(link => {
    return nodeByRecId[link.source].recTypeId == 20
        && nodeByRecId[link.target].recTypeId == 10
  })
  // .uniqBy(d => {
  //     return d.source+'-'+d.target;
  // })
  .value();

  const nodeFiltered = _.map(nodes, node => {
    node.inDegree  = _.filter(links,['source', node.recId]).length;
    return node;
  })

  return { links: linksFiltered, nodes: nodeFiltered };

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
  graph: dataCleaner(customData.results),

  minDegree:2,

  actors: monkey({
    cursors: { nodes: ['graph', 'nodes'] },
    get: d => filter(d.nodes, ['recTypeId', 10])
  }),
  events: monkey({
    cursors: { nodes: ['graph', 'nodes'], linkBySource:['linkBySource'], minDegree:['minDegree'] },
    get: curs => _(curs.nodes)
      .filter(['recTypeId', 20])
      .filter(event => {
        return event.inDegree >= curs.minDegree;
      })
      .value()
  }),
  layers: monkey({
    cursors: { actors:['actors'], events:['events'], graph:['graph'] },
    get: d => getLayers(d)
  }),
  linkBySource: monkey({
    cursors: { links: ['graph','links'], nodes:['graph','nodes'] },
    get: d => _(d.links).filter(l => {

      var actors = _.filter(d.nodes, ['recTypeId', 10]);

      return _.includes(Sutils.getAll(actors, 'recId'), l.target)

    }).groupBy('source').value()
  })
})

// console.log('linkBySource:', tree.get('linkBySource'));
// console.log('events:', tree.get('events'));

export default tree;
