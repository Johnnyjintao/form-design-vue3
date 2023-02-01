<!-- 单选框组 -->
<template>
  <div v-if="data">
    <el-form-item label="显示边框">
      <el-switch v-model="data.options.border" />
    </el-form-item>
    
    <el-form-item label="布局方式" v-if="hasKey!('inline')">
      <el-radio-group v-model="data.options.inline">
        <el-radio-button :label="true">行内</el-radio-button>
        <el-radio-button :label="false">块级</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="选项" v-if="hasKey!('options')">
      <el-radio-group v-model="data.options.defaultValue" style="margin-top: 8px">
        <div :key="element" v-for="(element,index) in data.options.options" style="display: flex; align-items: center; margin-bottom: 5px">
          <el-radio :label="element.value" style="margin-right: 0px; margin-bottom: 0">
            <el-input placeholder="value" v-model="element.value" :style="{width: '90px'}" />
            <el-input placeholder="label" v-model="element.label" :style="{width:'90px'}" />
            <el-button type="primary" circle @click="handleOptionsRemove(index)" :style="{marginLeft:'5px'}">
              <SvgIcon iconClass="delete" />
            </el-button>
          </el-radio>
        </div>
      </el-radio-group>
      <div style="margin-top: 5px">
        <el-button type="text" @click="handleInsertOption">添加选项</el-button>
      </div>
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
import SvgIcon from '@/components/SvgIcon.vue'
export default defineComponent({
  name: 'radioConfig',
  props: {
    select: {
      type: Object
    },
    hasKey: {
      type: Function
    }
  },
  components: {
    SvgIcon
  },
  emits: ['update:select'],
  setup(props, context){
    const data = ref<any>(props.select)
    watch(
      () => props.select,
      (val) => (data.value = val)
    )

    watch(data, (val) => context.emit('update:select', val), { deep: true })

    const handleInsertOption = ()=>{
      const index = data.value.options.options.length + 1
      data.value.options.options.push({
        label: `label ${index}`,
        value: `value ${index}`
      })
    }

    const handleOptionsRemove = (index:number)=>{
      if (data.value.type === 'grid') {
        data.value.columns.splice(index, 1)
      } else {
        data.value.options.options.splice(index, 1)
      }
    }

    return {
      data,
      handleInsertOption,
      handleOptionsRemove
    }
  },
})
</script>
  
  
