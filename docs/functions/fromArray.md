# fromArray

```js
fromArray(array, [options])
```

把一维数组，数组会包含所有节点。

**添加版本**：v0.1.0

参数：

1. `array`: 一维数组，默认结构为 `{id: string, pid: string, ...}[]`
2. `[options]`: 配置项；
   - `options.itemKey`: 指定节点 `key` 字段名，默认值：`'id'`；
   - `options.parentKey`: 指定节点 `key` 字段名，默认值：`'pid'`；
   - `options.childrenKey`: 指定节点 `key` 字段名，默认值：`'children'`；

示例：

```js
const tree = [
  {
    id: "1",
    name: "1",
  },
  {
    id: "2",
    name: "2",
    pid: "1",
  },
  {
    id: "3",
    name: "3",
    pid: "1",
  },
  {
    id: "4",
    name: "4",
    pid: "2",
  },
  {
    id: "5",
    name: "5",
  },
];
fromArray(tree)
// =>
// [
//   {
//     id: '1',
//     name: '1',
//     children: [
//       {
//         id: "2",
//         name: "2",
//         pid: "1",
//         children: [
//           {
//             id: "4",
//             name: "4",
//             pid: "2",
//           }
//         ]
//       },
//       {
//         id: "3",
//         name: "3",
//         pid: "1",
//       },
//     ]
//   },
//   {
//     id: "5",
//     name: "5",
//   },
// ]
```
