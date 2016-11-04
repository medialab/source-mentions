export function increment(tree){
  tree.apply('counter', nb => nb+1)
}
