<!-- 文字 -->
<template>
  <div v-if="data">
    <el-form-item label="默认值">
      <el-switch v-model="data.options.defaultValue" active-text="收起" inactive-text="展开"/>
    </el-form-item>

    <el-form-item label="水平布局">
      <el-select v-model="data.options.justifyContent">
        <el-option value="center" label="居中" />
        <el-option value="flex-start" label="左对齐" />
        <el-option value="flex-end" label="右对齐" />
      </el-select>
    </el-form-item>

    <el-form-item label="垂直布局">
      <el-select v-model="data.options.alignItems">
        <el-option value="center" label="居中" />
        <el-option value="flex-start" label="上对齐" />
        <el-option value="flex-end" label="下对齐" />
      </el-select>
    </el-form-item>

    <el-form-item label="类型">
      <el-select v-model="data.options.type">
        <el-option value="height" label="按高度展开收起" />
        <el-option value="num" label="按组件个数展开收起" />
      </el-select>
    </el-form-item>

    <el-form-item label="高度" v-if="data.options.type=='height'">
      <el-input v-model="data.options.height"/>
    </el-form-item>
    <el-form-item label="个数" v-if="data.options.type=='num'">
      <el-input v-model="data.options.num" type="number"/>
    </el-form-item>

  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'toggleConfig',
  props: {
    select: {
      type: Object
    },
    hasKey: {
      type: Function
    }
  },
  emits: ['update:select'],
  setup(props, context){
    const data = ref<any>(props.select)
    watch(
      () => props.select,
      (val) => (data.value = val)
    )

    watch(data, (val) => context.emit('update:select', val), { deep: true })
    
    return {
      data,
    }
  },
})
</script>
  
  
  