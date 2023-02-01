<!-- 时间选择器 -->
<template>
  <div v-if="data">
    <el-form-item label="占位内容">
      <el-input v-model="data.options.placeholder" placeholder="字段的placeholder"/>
    </el-form-item>

    <el-form-item label="可输入">
      <el-switch v-model="data.options.editable" />
    </el-form-item>

    <el-form-item label="默认值">
      <el-time-picker
        style="width: 100%"
        v-model="data.options.defaultValue"
        :format="data.options.format"
        :placeholder="data.options.placeholder"
      />
    </el-form-item>

    <el-form-item label="格式">
      <el-input v-model="data.options.format" />
    </el-form-item>


    <template>
      <el-form-item label="操作属性">
        <el-checkbox v-if="hasKey!('rules')" v-model="data.options.rules.required">必填</el-checkbox>
        <el-checkbox v-if="hasKey!('disabled')" v-model="data.options.disabled">禁用</el-checkbox>
      </el-form-item>
      <el-alert
        title="支持配置所有参数，更多参数可参考 https://element.eleme.cn/#/zh-CN/component/time-picker"
        type="success"
        effect="dark">
      </el-alert>
    </template>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'timeConfig',
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
  
  
  