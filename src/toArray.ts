import { ChildrenKey, Tree } from "./types";
import type { ForeachOptions } from "./foreach";
import foreach from "./foreach";

type ToArrayOptions = ForeachOptions

function toArray<T extends ChildrenKey>(tree: Tree<T> | Tree<T>[], options?: ToArrayOptions): Tree<T>[] {
  const results: Tree<T>[] = []
  foreach(tree, (t: Tree<T>) => {
    results.push(t)
  }, options)
  return results;
}

export default toArray;