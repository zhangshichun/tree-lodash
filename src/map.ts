import type { ChildrenKey, Tree, BaseOptions, BaseCallbackMeta } from "./types";

export type MapOptions = BaseOptions

export type MapCallbackMeta<T extends ChildrenKey> = BaseCallbackMeta<T>

export type MapCallback<T extends ChildrenKey> = (treeItem: Tree<T>, meta: MapCallbackMeta<T>) => any

type MapInnerOption<T extends ChildrenKey> = {
  childrenKey: ChildrenKey
  parents: Tree<T>[],
  depth: number
}


type MapImpl<T extends ChildrenKey> = (treeItem: Tree<T>, callback: MapCallback<T>, options: MapInnerOption<T>) => Tree<T>




// 前置遍历
const preImpl: MapImpl<ChildrenKey> = (treeItem, callback, options) => {
  const res = callback(treeItem, options)
  const children = treeItem[options.childrenKey]
  let newChildren
  if (children && Array.isArray(children)) {
    newChildren = children.map((childItem) => {
      return preImpl(childItem, callback, {
        ...options,
        parents: [...options.parents, treeItem],
        depth: options.depth + 1
      })
    })
  }
  return {
    ...res,
    [options.childrenKey]: newChildren,
  }
}

// 子节点优先遍历
const postImpl: MapImpl<ChildrenKey> = (treeItem, callback, options) => {
  const children = treeItem[options.childrenKey]
  let newChildren
  if (children && Array.isArray(children)) {
    newChildren = children.map((childItem) => {
      return postImpl(childItem, callback, {
        ...options,
        parents: [...options.parents, treeItem],
        depth: options.depth + 1
      })
    })
  }
  const res = callback(treeItem, options)
  return {
    ...res,
    [options.childrenKey]: newChildren,
  }
}

type QueueItem = {
  tree: Tree<ChildrenKey>,
  options: MapInnerOption<ChildrenKey>
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
  const runQueue = () : Tree => {
    if (queue.length === 0) {
      return result
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
    const res = callback(treeItem, queueItem.options)
    cache.set(queueItem.tree, res)
    // breadth 模式的子节点一定晚于父节点执行，所以可以在cache中找到父节点的生成物
    const parent = queueItem.options.parents.length > 0 ? queueItem.options.parents[queueItem.options.parents.length - 1] : undefined
    if (parent) {
      const newParent = cache.get(parent)      
      if (newParent[options.childrenKey]) {
        newParent[options.childrenKey].push(res)
      } else {
        newParent[options.childrenKey] = [res]
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
  const isForest = Array.isArray(tree)
  const method = strategies[strategy]
  const innerOptions = {
    childrenKey,
    depth: 0,
    parents: [] as Tree[]
  }
  return isForest ? tree.map(tree => {
    return method(tree, callback, innerOptions)
  }) : method(tree, callback, innerOptions)
}

export default map;