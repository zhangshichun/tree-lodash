<template>
  <div class="demo-layout" >
    <slot name="tree"></slot>
    <div class="operations">
      <div class="strategies">
        选择遍历策略：
        <div class="strategy">
          <input 
            type="radio" 
            id="pre" 
            name="drone" 
            value="pre" 
            :checked="strategy == 'pre'"
            @change="onChange"
            >
          <label for="pre">pre</label>
        </div>
        <div class="strategy">
          <input 
            type="radio" 
            id="post" 
            name="drone" 
            value="post" 
            :checked="strategy == 'post'"
            @change="onChange"
            >
          <label for="post">post</label>
        </div>
        <div class="strategy">
          <input 
            type="radio" 
            id="breadth" 
            name="drone" 
            value="breadth" 
            :checked="strategy == 'breadth'"
            @change="onChange"
            >
          <label for="breadth">breadth</label>
        </div>
      </div>
      <div class="buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'strategy',
    event: 'change'
  },
  props: {
    strategy: {
      type: String,
      default: null
    }
  },
  methods: {
    onChange(v) {
      this.$emit('change', v.target.value)
    }
  }
}
</script>
<style scoped>
.demo-layout {
  display: flex;
  justify-content: space-between;
}
.demo-layout .tree {
  flex: none;
}
.demo-layout .operations {
  width: 200px;
}

.demo-layout .strategy {
  display: flex;
  align-items: center;
}
.buttons {
  margin-top: 20px;
}
</style>
