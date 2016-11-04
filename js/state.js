import Baobab, {monkey} from 'baobab'
import {filter} from 'lodash'
import Sutils from './utils.js'

const customData = require('./../data/data.json')
// var graphFile = require("file!./../data/liberty_and_security.gexf")

// // Asynchronously fetch the gexf file and parse it
// gexf.fetch(graphFile, function(graph) {
//   console.log(graph, customData)
// })

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
    .value()

  const nodeByRecId = _.keyBy(nodes,'recId')
  const linksFiltered = _(links).filter(link => {
    return nodeByRecId[link.source].recTypeId == 20
        && nodeByRecId[link.target].recTypeId == 10
  })
  .value()

  const nodeFiltered = _.map(nodes, node => {
    node.mentions  = _.filter(links,['source', node.recId]).length
    node.mentionsBy  = _(links)
      .filter(['source', node.recId])
      .uniqBy(link => {return link.target})
      .value()
      .length

    return node
  })

  return { links: linksFiltered, nodes: nodeFiltered }

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

  }).value()
}

const tree = new Baobab({
  counter: 0,
  graph: dataCleaner(customData.results),

  minMentions:1,
  minMentionsBy:2,

  actors: monkey({
    cursors: { nodes: ['graph', 'nodes'] },
    get: d => filter(d.nodes, ['recTypeId', 10])
  }),
  activeMentions:[],
  activeEntityIds: monkey({
    cursors: {
      activeMentions:['activeMentions']
    },
    get: curs => _(curs.activeMentions)
        .map(mention => {return [mention.source,mention.target]})
        .flatten()
        .value()
  }),
  events: monkey({
    cursors: {
      nodes: ['graph', 'nodes'],
      linkBySource:['linkBySource'],
      minMentions:['minMentions'],
      minMentionsBy:['minMentionsBy']
    },
    get: curs => _(curs.nodes)
      .filter(['recTypeId', 20])
      .filter(event => {
        return event.mentions >= curs.minMentions && event.mentionsBy >= curs.minMentionsBy
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
      var actors = _.filter(d.nodes, ['recTypeId', 10])
      return _.includes(Sutils.getAll(actors, 'recId'), l.target)
    }).groupBy('source').value()
  })

})

export default tree
