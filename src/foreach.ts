import { getFinalChildrenKey } from "./helpers/common";
import type { ChildrenKey, Tree, BaseOptions, BaseCallbackMeta, BaseInnerOptions } from "./types";

export type ForeachOptions = BaseOptions

export type ForeachCallbackMeta<T extends ChildrenKey> = BaseCallbackMeta<T>

export type ForeachCallback<T extends ChildrenKey> = (treeItem: Tree<T>, meta: ForeachCallbackMeta<T>) => void


type ForeachInnerOption<T extends ChildrenKey> = BaseInnerOptions<T>


type ForeachImpl<T extends ChildrenKey> = (treeItem: Tree<T>, callback: ForeachCallback<T>, options: ForeachInnerOption<T>) => void


// 前置遍历
const preImpl: ForeachImpl<ChildrenKey> = (treeItem, callback, options) => {
  callback(treeItem, options)
  const finalChildrenKey = getFinalChildrenKey(treeItem, options, options)
  const children = treeItem[finalChildrenKey]
  if (children && Array.isArray(children)) {
    const nextLevelOptions = {
      ...options,
      parents: [...options.parents, treeItem],
      depth: options.depth + 1
    }
    children.forEach((childItem) => {
      preImpl(childItem, callback, nextLevelOptions)
    })
  }
}

// 后置遍历
const postImpl: ForeachImpl<ChildrenKey> = (treeItem, callback, options) => {
  const finalChildrenKey = getFinalChildrenKey(treeItem, options, options)
  const children = treeItem[finalChildrenKey]
  if (children && Array.isArray(children)) {
    const nextLevelOptions = {
      ...options,
      parents: [...options.parents, treeItem],
      depth: options.depth + 1
    }
    children.forEach((childItem) => {
      postImpl(childItem, callback, nextLevelOptions)
    })
  }
  callback(treeItem, options)
}


type QueueItem = {
  tree: Tree<ChildrenKey>,
  options: ForeachInnerOption<ChildrenKey>
}

// 广度优先遍历
const breadthImpl: ForeachImpl<ChildrenKey> = (treeItem, callback, options) => {
  const queue: QueueItem[] = [
    {
      tree: treeItem,
      options
    }
  ]
  const runQueue = () => {
    if (queue.length === 0) {
      return
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
    callback(treeItem, queueItem.options)
    runQueue()
  }
  runQueue()
}

const strategies = {
  'pre': preImpl,
  'post': postImpl,
  'breadth': breadthImpl
}

function foreach<T extends ChildrenKey>(tree: Tree<T> | Tree<T>[], callback: ForeachCallback<T>, options?: ForeachOptions): void {
  const childrenKey = options?.childrenKey ?? 'children'
  const strategy = options?.strategy ?? 'pre'
  const getChildrenKey = options?.getChildrenKey
  const isForest = Array.isArray(tree)
  const method = strategies[strategy]
  const innerOptions = {
    childrenKey,
    depth: 0,
    parents: [] as Tree[],
    getChildrenKey
  }
  isForest ? tree.forEach(tree => {
    method(tree, callback, innerOptions)
  }) : method(tree, callback, innerOptions)
}

export default foreach;