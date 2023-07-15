import type { ChildrenKey, Tree, BaseCallbackMeta, BaseInnerOptions } from '../types'

export function getFinalChildrenKey<T extends ChildrenKey> (tree: Tree<T>, meta: BaseCallbackMeta, options: BaseInnerOptions<T>): ChildrenKey {
  if (typeof options.getChildrenKey === 'function') {
    const dynamicChildrenKey = options.getChildrenKey(tree, meta)
    if (dynamicChildrenKey != null) {
      return dynamicChildrenKey
    }
  }
  return options.childrenKey
}