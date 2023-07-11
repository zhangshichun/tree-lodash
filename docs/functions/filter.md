# filter

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
foreach(tree, (t) => t.key < 2)
/**
 * {
 *   key: 1,
 *   children: []
 * }
 */
```
