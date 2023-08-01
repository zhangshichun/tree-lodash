import { getFinalChildrenKey } from "./helpers/common";
import { ChildrenKey, Tree, BaseOptions, BaseCallbackMeta, BaseInnerOptions } from "./types";

export type FindOptions = BaseOptions
export type FindCallbackMeta<T extends ChildrenKey> = BaseCallbackMeta<T>
export type FindCallback<T extends ChildrenKey> = (treeItem: Tree<T>, meta: FindCallbackMeta<T>) => boolean | undefined
type FindInnerOption<T extends ChildrenKey> = BaseInnerOptions<T>
type FindImpl<T extends ChildrenKey> = (treeItem: Tree<T>, callback: FindCallback<T>, options: FindInnerOption<T>) => Tree<T>|undefined

// 前置深度优先遍历
const preImpl: FindImpl<ChildrenKey> = (treeItem, callback, options) => {
  const callbackResult = callback(treeItem, options)
  if (callbackResult) {
    return treeItem
  }
  const finalChildrenKey = getFinalChildrenKey(treeItem, options, options)
  const children = treeItem[finalChildrenKey]
  if (!children || !Array.isArray(children)) {
    return undefined
  }
  for(let i = 0, count = children.length; i < count; i ++) {
    const childItem = children[i]
    const findOne = preImpl(childItem, callback, {
      ...options,
      parents: [...options.parents, treeItem],
      depth: options.depth + 1
    })
    if (findOne) {
      return findOne
    }
  }
  return undefined
}

// 后置深度优先遍历
const postImpl: FindImpl<ChildrenKey> = (treeItem, callback, options) => {
  const finalChildrenKey = getFinalChildrenKey(treeItem, options, options)
  const children = treeItem[finalChildrenKey]
  if (children && Array.isArray(children)) {
    for(let i = 0, count = children.length; i < count; i ++) {
      const childItem = children[i]
      const findOne = postImpl(childItem, callback, {
        ...options,
        parents: [...options.parents, treeItem],
        depth: options.depth + 1
      })
      if (findOne) {
        return findOne
      }
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
    const finalChildrenKey = getFinalChildrenKey(treeItem, queueItem.options, queueItem.options)
    if (treeItem[finalChildrenKey] && Array.isArray(treeItem[finalChildrenKey])) {
      const subQueueItems = treeItem[finalChildrenKey].map((subTree: Tree) => (
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
  const getChildrenKey = options?.getChildrenKey
  const method = strategies[strategy]
  const innerOptions = {
    childrenKey,
    depth: 0,
    parents: [] as Tree[],
    getChildrenKey
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