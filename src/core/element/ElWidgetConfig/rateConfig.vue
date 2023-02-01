<!-- 评分 -->
<template>
  <div v-if="data">

    <el-form-item label="默认内容">
      <el-rate
        v-if="data.type === 'rate'"
        v-model="data.options.defaultValue"
        :max="data.options.max"
        :allowHalf="data.options.allowHalf"
      />
    </el-form-item>

    <el-form-item label="最大值">
      <el-input-number v-model="data.options.max" />
    </el-form-item>

    <el-form-item label="是否允许半选">
      <el-switch v-model="data.options.allowHalf" />
    </el-form-item>

    <el-form-item label="操作属性">
      <el-checkbox v-if="hasKey!('rules')" v-model="data.options.rules.required">必填</el-checkbox>
      <el-checkbox v-if="hasKey!('disabled')" v-model="data.options.disabled">禁用</el-checkbox>
    </el-form-item>

    <el-alert
      title="支持配置所有参数，更多参数可参考 https://element.eleme.cn/#/zh-CN/component/rate"
      type="success"
      effect="dark">
    </el-alert>

  </div>
</template>
  

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'rateConfig',
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
  