# Features (特性)

## 三种搜索策略(`strategy`)

所有本库提供的方法都支持以下三种策略(`strategy`):

- `pre`: 深度优先，正序搜索；
- `post`：深度优先，反序搜索；
- `breadth`：广度优先

只需要在 `options` 入参中给出相关配置即可，默认策略为 `pre`;

```js
{ strategy: 'post' }
```

## 自定义的 `ChildrenKey`

支持传入 `ChildrenKey` 参数，你不仅可以用 `children` 表示子节点；

也可以用 `subItems`、`babies` 等所有你能想到的词语表示子节点:

```js
{ childrenKey: 'babies' }
```
