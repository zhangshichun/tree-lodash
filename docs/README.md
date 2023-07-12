---
title: '简介'
---

# tree-lodash

> Easily control the tree structure as you would with `lodash.js`

> 像使用 `lodash.js` 一样方便地操控树结构

## `tree-lodash` 是什么？

一个简简单单，纯纯粹粹的函数库，并且，它所提供的函数都是 **“纯函数”**，并不会对原数据结构直接产生修改。（当然，用户自行写了修改逻辑除外）

## 好用，就像呼吸一样自然

```js
import { filter } from 'tree-lodash'
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
