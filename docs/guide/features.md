# Features & Configs (配置项)

> 所有方法的配置项均至少支持以下三个核心配置

## 一、`options.strategy`：搜索策略

所有本库提供的方法都支持以下三种策略(`strategy`):

- `pre`: 深度优先，正序搜索；
- `post`：深度优先，反序搜索；
- `breadth`：广度优先

只需要在 `options` 入参中给出相关配置即可，默认策略为 `pre`;

```js
{ strategy: 'post' }
```

## 二、`options.childrenKey` 支持树结构子节点 `key` 的命名

支持传入 `options.childrenKey` 参数，你不仅可以用 `children` 表示子节点；

也可以用 `subItems`、`babies` 等所有你能想到的词语表示子节点:

```js
{ childrenKey: 'babies' }
```

## 三、`options.getChildrenKey` 支持一棵树上多种 `childrenKey`

下面这种结构的树也是可以被解析的了：

```js
const treeMultiChildrenKey: Tree = {
  key: '1',
  children: [
    {
      key: '2',
      subItems: [
        {
          key: '3'
        }
      ]
    },
    {
      key: '4',
      subItems: [
        {
          key: '5'
        }
      ]
    }
  ]
}
```

但你需要在 `options.getChildrenKey` 返回响应的 `childrenKey`:

```js
{
  getChildrenKey: (tree, meta) => {        
    if (meta.depth === 1) {
      return 'subItems'
    }
  }
}
```

(返回为 `undefined` 时，依然会使用 `options.childrenKey` 作为默认的 `key`)
