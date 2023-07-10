# tree-lodash

> Easily control the tree structure as you would with `lodash.js`

> 像使用 `lodash.js` 一样方便地操控树结构

充分的单元测试：
![](https://pic.zhangshichun.top/pic/20230710-01.jpg)

## Install （安装）

```shell
yarn add tree-lodash

# or

npm i tree-lodash
```

## UseAge （使用）

```js
import { filter } from 'tree-lodash'
const newTree = filter(tree, (item) => {
  return item.key < 100
})
```

## Features (特性)

### Feature One (特性一)

所有本库提供的方法都支持以下三种策略(`strategy`):

- `pre`: 深度优先，正序搜索；
- `post`：深度优先，反序搜索；
- `breadth`：广度优先

只需要在 `options` 入参中给出相关配置即可，默认策略为 `pre`;

```js
{ strategy: 'post' }
```

### Feature Two (特性二)

支持传入 `ChildrenKey` 参数，你不仅可以用 `children` 表示子节点；

也可以用 `subItems`、`babies` 等所有你能想到的词语表示子节点:

```js
{ childrenKey: 'babies' }
```

## Functions (方法列表)

### foreach

```js
foreach(tree, predicate, [options])
```

遍历把 "树" 或者 "森林"，对每个节点执行回调。

**添加版本**：v0.0.2

参数：

1. `tree`: 典型树结构，或者由多个树结构构成的数组；
2. `predicate`: 每次迭代调用的函数。
3. `[options]`: 配置项，支持 `strategy` 和 `childrenKey`

示例：

```js
const tree = {
  key: '1',
  children: [
    {
      key: '2',
      children: [
        {
          key: '3'
        }
      ]
    }
  ]
}
foreach(tree, (t) => console.log(t.key))
// 1
// 2
// 3
```

### map

```js
map(tree, predicate, [options])
```

遍历把 "树" 或者 "森林"，根据返回的对象，组成新的树。（不会影响原结构，返回的树是新生成的）

**添加版本**：v0.0.2

参数：

1. `tree`: 典型树结构，或者由多个树结构构成的数组；
2. `predicate`: 每次迭代调用的函数，需要返回一个对象，返回的对象上无需包括子节点。
3. `[options]`: 配置项，支持 `strategy` 和 `childrenKey`

示例：

```js
const tree = {
  key: '1',
  children: [
    {
      key: '2',
      children: [
        {
          key: '3'
        }
      ]
    }
  ]
}
const res = map(tree, (t) => { name: `No.${t.key}` })
/**
 * {
 *   name: 'No.1',
 *   children: [
 *     {
 *       name: 'No.2',
 *       children: [
 *         {
 *           name: 'No.3'
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
```

### filter

```js
filter(tree, predicate, [options])
```

遍历把 "树" 或者 "森林"，并把返回非真值的节点剔除。（不会影响原结构，返回的树是新生成的）

**添加版本**：v0.0.2

参数：

1. `tree`: 典型树结构，或者由多个树结构构成的数组；
2. `predicate`: 每次迭代调用的函数，返回非真值时，该节点会从树上剔除。
3. `[options]`: 配置项，支持 `strategy` 和 `childrenKey`

示例：

```js
const tree = {
  key: 1,
  children: [
    {
      key: 2,
      children: [
        {
          key: 3
        }
      ]
    }
  ]
}
filter(tree, (t) => t.key < 2)
/**
 * {
 *   key: 1,
 *   children: []
 * }
 */
```

### find

```js
find(tree, predicate, [options])
```

遍历把 "树" 或者 "森林"，找到第一个返回非空值的节点。

**添加版本**：v0.1.0

参数：

1. `tree`: 典型树结构，或者由多个树结构构成的数组；
2. `predicate`: 每次迭代调用的函数，返回非真值时，该节点会从树上剔除。
3. `[options]`: 配置项，支持 `strategy` 和 `childrenKey`

示例：

```js
const tree = {
  key: 1,
  children: [
    {
      key: 2,
      children: [
        {
          key: 3
        }
      ]
    }
  ]
}
find(tree, (t) => t.key === 2)
/**
 * 会保留其本来的结构
 * {
 *   key: 2,
 *   children: [
 *    {
 *      key: 3
 *    }
 *  ]
 * }
 */
```

### toArray

```js
toArray(tree, [options])
```

把 "树" 或者 "森林"，转换为一维数组，数组会包含所有节点。

**添加版本**：v0.0.2

参数：

1. `tree`: 典型树结构，或者由多个树结构构成的数组；
2. `[options]`: 配置项，支持 `strategy` 和 `childrenKey`

示例：

```js
const tree = {
  key: '1',
  children: [
    {
      key: '2',
      children: [
        {
          key: '3'
        }
      ]
    }
  ]
}
toArray(tree).map(t => t.key)
// ['1', '2', '3']
```
