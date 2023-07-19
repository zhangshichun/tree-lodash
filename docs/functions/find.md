# find

```js
find(tree, predicate, [options])
```

遍历把 "树" 或者 "森林"，找到第一个返回非空值的节点。

**添加版本**：v0.1.0
<ClientOnly>
  <demo-find />
</ClientOnly>
参数：

1. `tree`: 典型树结构，或者由多个树结构构成的数组；
2. `predicate`: 每次迭代调用的函数，返回非真值时，该节点会从树上剔除。
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
find(data, (t) => t.key < 100 && t.key > 10)
/**
 * 会保留其本来的结构
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
  }
 */
```
