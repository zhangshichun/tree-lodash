# foreach

```js
foreach(tree, predicate, [options])
```

遍历把 "树" 或者 "森林"，对每个节点执行回调。

**添加版本**：v0.0.2
<ClientOnly>
  <demo-foreach />
</ClientOnly>
参数：

1. `tree`: 典型树结构，或者由多个树结构构成的数组；
2. `predicate`: 每次迭代调用的函数。
3. `[options]`: 配置项，支持 `strategy` 和 `childrenKey`

示例：

```js
const data = {
  key: 1,
  children: [
    {
      key: 11,
      children: [
        {
          key: 111
        },
        {
          key: 112
        }
      ]
    },
    {
      key: 12,
      children: [
        {
          key: 122,
          children: [
            {
              key: 1221
            },
            {
              key: 1222
            }
          ]
        }
      ]
    }
  ]
}
foreach(data, (t) => console.log(t.key))
// 1
// 11
// 111
// 112
// 12
// 122
// 1221
// 1222
```
