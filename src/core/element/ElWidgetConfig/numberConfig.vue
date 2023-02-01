<!-- 计数器 -->
<template>
  <div v-if="data">
    <el-form-item label="最大值" v-if="hasKey!('max')">
      <el-input-number v-model.number="data.options.max" />
    </el-form-item>

    <el-form-item label="最小值" v-if="hasKey!('min')">
      <el-input-number v-model.number="data.options.min" />
    </el-form-item>

    <el-form-item label="步长" v-if="hasKey!('step')">
      <el-input-number v-model.number="data.options.step" :min="0" />
    </el-form-item>

    <template>
      <el-form-item label="操作属性">
        <el-checkbox v-if="hasKey!('rules')" v-model="data.options.rules.required">必填</el-checkbox>
        <el-checkbox v-if="hasKey!('disabled')" v-model="data.options.disabled">禁用</el-checkbox>
      </el-form-item>
      <el-alert
        title="支持配置所有参数，更多参数可参考 https://element.eleme.cn/#/zh-CN/component/radio"
        type="success"
        effect="dark">
      </el-alert>
    </template>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'numberConfig',
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
  