import { ChildrenKey, Tree, BaseOptions, BaseCallbackMeta } from "./types";

export type FindOptions = BaseOptions
export type FindCallbackMeta<T extends ChildrenKey> = BaseCallbackMeta<T>
export type FindCallback<T extends ChildrenKey> = (treeItem: Tree<T>, meta: FindCallbackMeta<T>) => boolean | undefined
type FindInnerOption<T extends ChildrenKey> = {
  childrenKey: ChildrenKey
  parents: Tree<T>[],
  depth: number
}
type FindImpl<T extends ChildrenKey> = (treeItem: Tree<T>, callback: FindCallback<T>, options: FindInnerOption<T>) => Tree<T>|undefined

// 前置深度优先遍历
const preImpl: FindImpl<ChildrenKey> = (treeItem, callback, options) => {
  const callbackResult = callback(treeItem, options)
  if (callbackResult) {
    return treeItem
  }
  const children = treeItem[options.childrenKey]
  if (!children || !Array.isArray(children)) {
    return undefined
  }
  return children.find((childItem) => {
    return preImpl(childItem, callback, {
      ...options,
      parents: [...options.parents, treeItem],
      depth: options.depth + 1
    })
  })
}

// 后置深度优先遍历
const postImpl: FindImpl<ChildrenKey> = (treeItem, callback, options) => {
  const children = treeItem[options.childrenKey]
  
  if (children && Array.isArray(children)) {
    const findOne = children.find((childItem) => {
      return postImpl(childItem, callback, {
        ...options,
        parents: [...options.parents, treeItem],
        depth: options.depth + 1
      })
    })
    if (findOne) {
      return findOne
    }
  }
  const callbackResult = callback(treeItem, options)
  if (callbackResult) {
    return treeItem
  }
  return undefined
}

type QueueItem = {
  tree: Tree<ChildrenKey>,
  options: FindInnerOption<ChildrenKey>
}

// 广度优先遍历
const breadthImpl: FindImpl<ChildrenKey> = (treeItem, callback, options) => {
  const queue: QueueItem[] = [
    {
      tree: treeItem,
      options
    }
  ]
  const runQueue = (): Tree | undefined => {
    if (queue.length === 0) {
      return undefined
    }
    const queueItem = queue.shift() as QueueItem
    const treeItem = queueItem.tree
    if (treeItem[options.childrenKey] && Array.isArray(treeItem[options.childrenKey])) {
      const subQueueItems = treeItem[options.childrenKey].map((subTree: Tree) => (
        {
          tree: subTree,
          options: {
            ...queueItem.options,
            parents: [...queueItem.options.parents, treeItem],
            depth: queueItem.options.depth + 1
          }
        }
      ))
      queue.push(...subQueueItems)
    }
    const callbackResult = callback(treeItem, queueItem.options)
    if (callbackResult) {
      return treeItem;
    }
    return runQueue()
  }
  return runQueue()
}

const strategies = {
  'pre': preImpl,
  'post': postImpl,
  'breadth': breadthImpl
}

function find<T extends ChildrenKey>(tree: Tree<T> | Tree<T>[], callback: FindCallback<T>, options?: FindOptions): Tree<T> | undefined {
  const childrenKey = options?.childrenKey ?? 'children'
  const strategy = options?.strategy ?? 'pre'
  const method = strategies[strategy]
  const innerOptions = {
    childrenKey,
    depth: 0,
    parents: [] as Tree[]
  }
  if (Array.isArray(tree)) {
    for(let i = 0, count = tree.length; i < count; i++) {
      const treeItem = tree[i]
      const result = method(treeItem, callback, innerOptions)
      if (result) {
        return result
      }
    }
    return undefined
  }
  return method(tree, callback, innerOptions)
}

export default find;