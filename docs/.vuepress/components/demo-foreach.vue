<template>
  <div class="demo-foreach" >
    <div class="tree" ref="tree">
    </div>
    <div class="operations">
      <div class="strategies">
        <div class="strategy">
          <input type="radio" id="pre" name="drone" value="pre" v-model="strategy"><label for="pre">pre</label>
        </div>
        <div class="strategy">
          <input type="radio" id="post" name="drone" value="post" v-model="strategy"><label for="post">post</label>
        </div>
        <div class="strategy">
          <input type="radio" id="breadth" name="drone" value="breadth" v-model="strategy"><label for="breadth">breadth</label>
        </div>
      </div>
      <div class="buttons">
        <button class="primary-btn" @click="play">play(尝试一下！)</button>
      </div>
    </div>
  </div>

</template>

<script>
// 定义数据源
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

export default {
  data() {
    return {
      strategy: 'pre',
      visitedItems: []
    }
  },
  computed: {
    treeData() {
      return window.treeLodash.map(data, (oldItem) => {
        const fillColor = this.visitedItems.some(t => t.key === oldItem.key) ? 'red' : '#fff'
        return {
          ...oldItem,
          label: oldItem.key,
          style: {
            fill: fillColor
          }
        }
      })
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
  },
  methods: {
    play() {
      this.visitedItems = []
      const tempItems = []
      window.treeLodash.foreach(this.treeData, item => {
        tempItems.push(item)
      }, { strategy: this.strategy })
      const shift = () => {
        const shiftItem = tempItems.shift()
        if (shiftItem) {
          this.visitedItems.push(shiftItem)
        }
        if (tempItems.length) {
          setTimeout(shift, 500)
        }
      }
      shift()
    }
  }
}
</script>
<style scoped>
.demo-foreach {
  display: flex;
  justify-content: space-between;
}
.demo-foreach .tree {
  flex: none;
}
.demo-foreach .operations {
  width: 200px;
}

.demo-foreach .strategy {
  display: flex;
  align-items: center;
}
.buttons {
  margin-top: 20px;
}
.primary-btn {
  color: #fff;
  background-color: #0066cc;
}
.primary-btn:hover {
  cursor: pointer;
  text-shadow: 0 -1px 0 rgba(0,0,0,0.25);
  background-color: #0000cc;
}
</style>
