import { ChildrenKey, Tree } from "./types";
import find from "./find";
import { FindOptions, FindCallback } from "./find";

type MatchOptions = FindOptions

function some<T extends ChildrenKey>(tree: Tree<T> | Tree<T>[], callback: FindCallback<T>,options?: MatchOptions): boolean {
  const matchedItem = find(tree, callback, options)
  return matchedItem != undefined
}

export default some;