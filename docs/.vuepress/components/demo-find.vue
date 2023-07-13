<template>
  <Layout v-model="strategy">
    <template slot="tree">
      <Tree class="tree" :treeData="treeData"/>
    </template>
    <template slot="buttons">
      <button class="primary-btn" @click="play">play(尝试一下！)</button>
    </template>
  </Layout>
</template>

<script>
import Tree from './common/tree.vue'
import Layout from './common/layout.vue'
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
  components: { 
    Tree,
    Layout
  },
  data() {
    return {
      strategy: 'pre',
      passedItems: [],
      invalidItems: []
    }
  },
  computed: {
    treeData() {
      return window.treeLodash.map(data, (oldItem) => {
        const inPassed = this.passedItems.some(t => t.key === oldItem.key)
        const inInvalid = this.invalidItems.some(t => t.key === oldItem.key)
        const fillColor = inPassed ? 'green' : inInvalid ? 'red': '#fff'
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
  methods: {
    play() {
      this.passedItems = []
      this.invalidItems = []
      clearTimeout(this.timer)
      const tempArr = []
      window.treeLodash.find(this.treeData, item => {
        const result = item.key < 100 && item.key > 10
        tempArr.push({ result, item })
        return result;
      }, { strategy: this.strategy })
      const shift = () => {
        const shiftObj = tempArr.shift()
        if (shiftObj) {
          const result = shiftObj.result
          if (result) {
            this.passedItems.push(shiftObj.item)
          } else {
            this.invalidItems.push(shiftObj.item)
          }
        }
        if (tempArr.length) {
          this.timer = setTimeout(shift, 500)
        }
      }
      shift()
    }
  }
}
</script>
<style scoped>
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
