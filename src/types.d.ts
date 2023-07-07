export type TreeKey = string | number | symbol

export type ChildrenKey = TreeKey

export type Tree<T extends ChildrenKey = 'children'> = {
  [key in T]?: Tree<T>[];
} & {
  [key in TreeKey]: any;
}

export type Strategy = 'pre' | 'post' | 'breadth'
