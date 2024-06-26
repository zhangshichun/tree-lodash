module.exports = {
  title: 'tree-lodash（树大师）',
  description: '像使用 `lodash.js` 一样方便地操控树结构',
  base: '/tree-lodash/',
  head: [
    ['script', { src: '/tree-lodash.js' }],
    ['script', { src: 'https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js' }],
  ],
  themeConfig: {
    sidebar: [
      {
        title: '简介(Intro)',   // 必要的
        path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
      },
      {
        title: '起步(Get Start)',   // 必要的
        path: '/guide/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/guide/',
          '/guide/features.html'
        ]
      },
      {
        title: '方法列表',
        children: [
          '/functions/foreach.html',
          '/functions/map.html',
          '/functions/filter.html',
          '/functions/find.html',
          '/functions/some.html',
          '/functions/toArray.html',
          '/functions/fromArray.html',
        ],
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
      }
    ],
    nav: [
      { text: 'Github(求求点个star吧)', link: 'https://github.com/zhangshichun/tree-lodash' },
    ]
  }
}