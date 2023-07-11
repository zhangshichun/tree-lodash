---
title: '指南'
---

# 指南

## 使用 `npm`安装 (Install by `npm`)

```shell
yarn add tree-lodash

# or

npm i tree-lodash
```

```js
import { filter } from 'tree-lodash'
const newTree = filter(tree, (item) => {
  return item.key < 100
})
```

## 使用 `cdn` 方式引入(Use it by `cdn`)

引入：（注意：`jsdelivr` 非常不稳定，尤其针对国内网络，请绝对不要在生产环境使用它；推荐把该 `js` 下载到本地静态目录）

```html
<script src="https://cdn.jsdelivr.net/npm/tree-lodash@latest/dist/umd/index.js"></script>
<script>
  window.treeLodash.foreach([{key: '1'}], (t) => {
    console.log(t.key)
  })
  // log => 1
</script>
```
