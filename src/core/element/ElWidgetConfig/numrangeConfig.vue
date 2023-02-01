<!-- 数字范围输入框 -->
<template>
  <div v-if="data">
    <el-form-item label="最小值占位内容">
      <el-input v-model="data.options.minPlaceholder" placeholder="字段的placeholder"/>
    </el-form-item>
    <el-form-item label="最大值占位内容">
      <el-input v-model="data.options.maxPlaceholder" placeholder="字段的placeholder"/>
    </el-form-item>

    <el-form-item label="操作属性">
      <el-checkbox v-if="hasKey!('rules')" v-model="data.options.rules.required">必填</el-checkbox>
      <el-checkbox v-if="hasKey!('disabled')" v-model="data.options.disabled">禁用</el-checkbox>
    </el-form-item>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'numrangeConfig',
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
  
  