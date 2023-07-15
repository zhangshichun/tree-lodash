import { getFinalChildrenKey } from "./helpers/common";
import type { ChildrenKey, Tree, BaseOptions, BaseCallbackMeta, BaseInnerOptions } from "./types";

export type MapOptions = BaseOptions

export type MapCallbackMeta<T extends ChildrenKey> = BaseCallbackMeta<T>

export type MapCallback<T extends ChildrenKey> = (treeItem: Tree<T>, meta: MapCallbackMeta<T>) => any

type MapInnerOption<T extends ChildrenKey> = BaseInnerOptions<T>

type MapImpl<T extends ChildrenKey> = (treeItem: Tree<T>, callback: MapCallback<T>, options: MapInnerOption<T>) => Tree<T>

// 前置遍历
const preImpl: MapImpl<ChildrenKey> = (treeItem, callback, options) => {
  const finalChildrenKey = getFinalChildrenKey(treeItem, options, options)
  const res = callback(treeItem, options)
  const children = treeItem[finalChildrenKey]
  let newChildren
  if (children && Array.isArray(children)) {
    const nextLevelOptions = {
      ...options,
      parents: [...options.parents, treeItem],
      depth: options.depth + 1
    }
    newChildren = children.map((childItem) => {
      return preImpl(childItem, callback, nextLevelOptions)
    })
  }
  return {
    ...res,
    [finalChildrenKey]: newChildren,
  }
}

// 子节点优先遍历
const postImpl: MapImpl<ChildrenKey> = (treeItem, callback, options) => {
  const finalChildrenKey = getFinalChildrenKey(treeItem, options, options)
  const children = treeItem[finalChildrenKey]
  let newChildren
  if (children && Array.isArray(children)) {
    const nextLevelOptions = {
      ...options,
      parents: [...options.parents, treeItem],
      depth: options.depth + 1
    }
    newChildren = children.map((childItem) => {
      return postImpl(childItem, callback, nextLevelOptions)
    })
  }
  const res = callback(treeItem, options)
  return {
    ...res,
    [finalChildrenKey]: newChildren,
  }
}

type QueueItem = {
  tree: Tree<ChildrenKey>,
  options: MapInnerOption<ChildrenKey>,
}

// 广度优先遍历
const breadthImpl: MapImpl<ChildrenKey> = (treeItem, callback, options) => {
  const queue: QueueItem[] = [
    {
      tree: treeItem,
      options
    }
  ]
  let result: Tree<ChildrenKey>
  const cache = new WeakMap()
  const childrenKeyCache = new WeakMap()
  const runQueue = () : Tree => {
    if (queue.length === 0) {
      return result
    }
    const queueItem = queue.shift() as QueueItem
    const treeItem = queueItem.tree
    const finalChildrenKey = getFinalChildrenKey(treeItem, queueItem.options, queueItem.options)
    if (treeItem[finalChildrenKey] && Array.isArray(treeItem[finalChildrenKey])) {
      const nextLevelOptions = {
        ...queueItem.options,
        parents: [...queueItem.options.parents, treeItem],
        depth: queueItem.options.depth + 1
      }
      const subQueueItems = treeItem[finalChildrenKey].map((subTree: Tree) => (
        {
          tree: subTree,
          options: nextLevelOptions
        }
      ))
      queue.push(...subQueueItems)
    }
    const res = callback(treeItem, queueItem.options)
    cache.set(queueItem.tree, res)
    childrenKeyCache.set(queueItem.tree, finalChildrenKey)
    // breadth 模式的子节点一定晚于父节点执行，所以可以在cache中找到父节点的生成物
    const parent = queueItem.options.parents.length > 0 ? queueItem.options.parents[queueItem.options.parents.length - 1] : undefined
    if (parent) {
      const newParent = cache.get(parent)
      const parentChildrenKey = childrenKeyCache.get(parent)  
      if (newParent[parentChildrenKey]) {
        newParent[parentChildrenKey].push(res)
      } else {
        newParent[parentChildrenKey] = [res]
      }
    }
    // 这棵树的顶点
    if (queueItem.options.depth === 0) {
      result = res
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

export type MapForTree<T extends ChildrenKey> = (tree: Tree<T> , callback: MapCallback<T>, options?: MapOptions) => Tree<T>
export type MapForForest<T extends ChildrenKey> = (tree: Tree<T>[], callback: MapCallback<T>, options?: MapOptions) => Tree<T>[]

function map<T extends ChildrenKey>(tree: Tree<T> , callback: MapCallback<T>, options?: MapOptions) : Tree<T>;
function map<T extends ChildrenKey>(tree: Tree<T>[], callback: MapCallback<T>, options?: MapOptions) : Tree<T>[];

function map<T extends ChildrenKey>(tree: Tree<T>| Tree<T>[], callback: MapCallback<T>, options: MapOptions = {}): Tree<T> | Tree<T>[]{
  const childrenKey = options.childrenKey ?? 'children'
  const strategy = options.strategy ?? 'pre'
  const getChildrenKey = options.getChildrenKey
  const isForest = Array.isArray(tree)
  const method = strategies[strategy]
  const innerOptions = {
    childrenKey,
    depth: 0,
    parents: [] as Tree[],
    getChildrenKey
  }
  return isForest ? tree.map(tree => {
    return method(tree, callback, innerOptions)
  }) : method(tree, callback, innerOptions)
}

export default map;