export function increment(tree){
  tree.apply('counter', nb => nb+1)
}

export function toogleHelp(tree){
  const current = tree.get('helpModal');
  tree.set('helpModal', !current)
}

