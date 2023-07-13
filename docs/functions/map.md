# map

```js
map(tree, predicate, [options])
```

遍历把 "树" 或者 "森林"，根据返回的对象，组成新的树。（不会影响原结构，返回的树是新生成的）

**添加版本**：v0.0.2
<ClientOnly>
  <demo-foreach />
</ClientOnly>
参数：

1. `tree`: 典型树结构，或者由多个树结构构成的数组；
2. `predicate`: 每次迭代调用的函数，需要返回一个对象，返回的对象上无需包括子节点。
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
const res = map(data, (t) => { name: `No.${t.key}` })
/**
  {
    key: 'No.1',
    children: [
      {
        key: 'No.11',
        children: [
          {
            key: 'No.111'
          },
          {
            key: 'No.112'
          }
        ]
      },
      {
        key: 'No.12',
        children: [
          {
            key: 'No.122',
            children: [
              {
                key: 'No.1221'
              },
              {
                key: 'No.1222'
              }
            ]
          }
        ]
      }
    ]
  }
 */
```
