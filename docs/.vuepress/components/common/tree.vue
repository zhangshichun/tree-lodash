<template>
  <div class="tree" ref="tree">
  </div>
</template>
<script>
export default {
  props: {
    treeData: {
      type: Object
    }
  },
  watch: {
    treeData() {
      this.graph?.data(this.treeData);
      this.graph?.render();
      this.graph?.fitView();
    }
  },
  mounted() {
    // 创建 G6 图实例
    const graph = new G6.TreeGraph({
      container: this.$refs.tree,
      width: 300,
      height: 300,
      defaultNode: {
        type: 'tree-node',
        size: 26,
        anchorPoints: [
          [0.5, 0.5],
          [0.5, 0.5],
        ],
      },
      defaultEdge: {
        type: 'cubic-horizontal',
      },
      layout: {
        type: 'compactBox',
        direction: 'LR',
        getId: function getId(d) {
          return d.key;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 40;
        },
        getHGap: function getHGap() {
          return 20;
        },
      },
    });
    this.graph = graph
    // 读取数据
    graph.data(this.treeData);
    // 渲染图
    graph.render();
    graph.fitView();
  }
}
</script>