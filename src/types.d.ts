export type TreeKey = string | number | symbol

export type ChildrenKey = string | number | symbol

export type Tree<T extends ChildrenKey> = {[key in TreeKey]: any} & { [key in T]?: Tree<T>[]}

export type Strategy = 'pre' | 'post' | 'breadth'