# toArray

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
