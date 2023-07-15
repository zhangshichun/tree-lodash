import { getFinalChildrenKey } from "./helpers/common";
import type { ChildrenKey, Tree, BaseOptions, BaseCallbackMeta, BaseInnerOptions } from "./types";

export type FilterOptions = BaseOptions

export type FilterCallbackMeta<T extends ChildrenKey> = BaseCallbackMeta<T>

export type FilterCallback<T extends ChildrenKey> = (treeItem: Tree<T>, meta: FilterCallbackMeta<T>) => any

type FilterInnerOption<T extends ChildrenKey> = BaseInnerOptions<T>

type FilterImpl<T extends ChildrenKey> = (treeItem: Tree<T>, callback: FilterCallback<T>, options: FilterInnerOption<T>) => Tree<T> | undefined

// 前置遍历
const preImpl: FilterImpl<ChildrenKey> = (treeItem, callback, options) => {
  const res = callback(treeItem, options)
  if (!res) {
    return undefined
  }
  const finalChildrenKey = getFinalChildrenKey(treeItem, options, options)
  const children = treeItem[finalChildrenKey]
  let newChildren
  if (children && Array.isArray(children)) {
    newChildren = children.map((childItem) => {
      return preImpl(childItem, callback, {
        ...options,
        parents: [...options.parents, treeItem],
        depth: options.depth + 1
      })
    }).filter(t => !!t)
  }
  return {
    ...treeItem,
    [finalChildrenKey]: newChildren
  }
}

// 子节点优先遍历
const postImpl: FilterImpl<ChildrenKey> = (treeItem, callback, options) => {
  const finalChildrenKey = getFinalChildrenKey(treeItem, options, options)
  const children = treeItem[finalChildrenKey]
  let newChildren
  if (children && Array.isArray(children)) {
    newChildren = children.map((childItem) => {
      return postImpl(childItem, callback, {
        ...options,
        parents: [...options.parents, treeItem],
        depth: options.depth + 1
      })
    }).filter( t => !!t)
  }
  const res = callback(treeItem, options)
  if (!res) {
    return undefined
  }
  return {
    ...treeItem,
    [finalChildrenKey]: newChildren,
  }
}

type QueueItem = {
  tree: Tree<ChildrenKey>,
  options: FilterInnerOption<ChildrenKey>
}

function genNewNoChildrenNode<T extends ChildrenKey> (node: Tree<T>, childrenKey: T) {
  const newNode = {
    ...node,
  }
  delete newNode[childrenKey]
  return newNode
}
// 广度优先遍历
const breadthImpl: FilterImpl<ChildrenKey> = (treeItem, callback, options) => {
  const queue: QueueItem[] = [
    {
      tree: treeItem,
      options
    }
  ]
  let result: Tree<ChildrenKey>
  const resultCache = new WeakMap<any, boolean>()
  const newNodeCache = new WeakMap<any, Tree<ChildrenKey>>()
  const childrenKeyCache = new WeakMap()
  const runQueue = (): Tree<ChildrenKey> | undefined  => {
    if (queue.length === 0) {
      return result
    }
    
    const queueItem = queue.shift() as QueueItem
    const treeItem = queueItem.tree
    const finalChildrenKey = getFinalChildrenKey(treeItem, queueItem.options, queueItem.options)
    if (treeItem[finalChildrenKey] && Array.isArray(treeItem[finalChildrenKey])) {
      const subQueueItems = treeItem[finalChildrenKey].map((subTree: Tree<ChildrenKey>) => (
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

    const parent: Tree<ChildrenKey>| undefined = queueItem.options.parents.length > 0 ? queueItem.options.parents[queueItem.options.parents.length - 1] : undefined
    const isTopNode = queueItem.options.depth === 0
    const parentResult = parent && resultCache.get(parent)

    // Not the top Node && parentResult is not true
    if (!isTopNode && !parentResult) {
      return runQueue()
    }
    const callbackResult = callback(treeItem, queueItem.options)
    // topNode callback not truthy, return null
    if (isTopNode && !callbackResult) {
      return undefined
    }
    let newNode = genNewNoChildrenNode(treeItem, finalChildrenKey)
    // topNode callback true, set the topNode
    if (isTopNode) {
      result = newNode
    }
    resultCache.set(queueItem.tree, callbackResult)
    newNodeCache.set(queueItem.tree, newNode)
    childrenKeyCache.set(queueItem.tree, finalChildrenKey)
    // Not top node, have a valid parent, and callback truthy
    if (callbackResult && parent) {
      const parentNewNode: any = newNodeCache.get(parent)
      const parentChildrenKey = childrenKeyCache.get(parent)
      if (!parentNewNode[parentChildrenKey]) {
        parentNewNode[parentChildrenKey] = []
      }
      parentNewNode[parentChildrenKey].push(newNode)
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


function filter<T extends ChildrenKey>(tree: Tree<T>, callback: FilterCallback<T>, options?: FilterOptions): Tree<T>;
function filter<T extends ChildrenKey>(tree: Tree<T>[], callback: FilterCallback<T>, options?: FilterOptions): Tree<T>[];

function filter<T extends ChildrenKey>(tree: Tree<T> | Tree<T>[], callback: FilterCallback<T>, options: FilterOptions = {}): Tree<T> | Tree<T>[] | undefined {
  const childrenKey = options.childrenKey ?? 'children'
  const strategy = options.strategy ?? 'pre'
  const getChildrenKey = options.getChildrenKey
  const isForest = Array.isArray(tree)
  const method = strategies[strategy]
  const innerOptions = {
    childrenKey,
    depth: 0,
    parents: [] as Tree<T>[],
    getChildrenKey
  }
  return isForest ? tree.map(tree => {
    return method(tree, callback, innerOptions)
  }).filter(t => !!t) as Tree<T>[] : method(tree, callback, innerOptions)
}

export default filter