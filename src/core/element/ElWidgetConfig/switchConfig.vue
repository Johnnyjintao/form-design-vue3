<!-- 开关 -->
<template>
  <div v-if="data">

    <el-form-item label="默认内容">
      <el-switch
        v-model="data.options.defaultValue"
      />
    </el-form-item>

    <el-form-item label="选中时的内容" v-if="hasKey!('activeText')">
      <el-input v-model="data.options.activeText" />
    </el-form-item>

    <el-form-item label="非选中时的内容" v-if="hasKey!('inactiveText')">
      <el-input v-model="data.options.inactiveText" />
    </el-form-item>

    <el-form-item label="操作属性">
      <el-checkbox v-if="hasKey!('rules')" v-model="data.options.rules.required">必填</el-checkbox>
      <el-checkbox v-if="hasKey!('disabled')" v-model="data.options.disabled">禁用</el-checkbox>
    </el-form-item>

    <el-alert
      title="支持配置所有参数，更多参数可参考 https://element.eleme.cn/#/zh-CN/component/switch"
      type="success"
      effect="dark">
    </el-alert>

  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'switchConfig',
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
  
  