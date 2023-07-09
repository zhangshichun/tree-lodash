export type TreeKey = string | number | symbol

export type ChildrenKey = TreeKey

export type Tree<T extends ChildrenKey = 'children'> = {
  [key in T]?: Tree<T>[];
} & {
  [key in TreeKey]: any;
}

export type Strategy = 'pre' | 'post' | 'breadth'

export type BaseOptions = {
  childrenKey?: ChildrenKey
  strategy?: Strategy
}

export type BaseCallbackMeta<T extends ChildrenKey> = {
  depth: number,
  parents?: Tree<T>[]
}
