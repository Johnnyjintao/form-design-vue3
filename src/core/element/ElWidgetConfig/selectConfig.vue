<!-- 下拉框 -->
<template>
  <div v-if="data">
    <el-form-item label="占位文本">
      <el-input v-model="data.options.placeholder" placeholder="placeholder"/>
    </el-form-item>

    <el-form-item label="是否多选" v-if="hasKey!('multiple')">
      <el-switch
        v-model="data.options.multiple"
        @change="handleSelectModeChange"
      />
    </el-form-item>

    <el-form-item label="是否可搜索" v-if="hasKey!('filterable')">
      <el-switch v-model="data.options.filterable" />
    </el-form-item>


    <el-form-item label="选项" v-if="hasKey!('options')">
        <ul>
          <li :key="element" v-for="(element,index) in data.options.options" style="display: flex; align-items: center; margin-bottom: 5px">
            <el-checkbox-group v-if="data.options.multiple" v-model="data.options.defaultValue" style="margin-top: 8px">
              <el-checkbox :label="element.value" style="margin-right: 0px; margin-bottom: 0">
                <el-input placeholder="value" v-model="element.value" :style="{width: '90px'}" />
                <el-input placeholder="label" v-model="element.label" :style="{width:'90px'}" />
                <el-button type="primary" circle @click="handleOptionsRemove(index)" :style="{marginLeft:'5px'}">
                  <SvgIcon iconClass="delete" />
                </el-button>
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group v-if="!data.options.multiple" v-model="data.options.defaultValue" style="margin-top: 8px">
              <el-radio :label="element.value" style="margin-right: 0px; margin-bottom: 0">
                <el-input placeholder="value" v-model="element.value" :style="{width: '90px'}" />
                <el-input placeholder="label" v-model="element.label" :style="{width:'90px'}" />
                <el-button type="primary" circle @click="handleOptionsRemove(index)" :style="{marginLeft:'5px'}">
                  <SvgIcon iconClass="delete" />
                </el-button>
              </el-radio>
            </el-radio-group>
          </li>
        </ul>
      <div style="margin-top: 5px">
        <el-button type="text" @click="handleInsertOption">添加选项</el-button>
      </div>
    </el-form-item>

    <template>
      <el-form-item
        label="操作属性"
        v-if="
          hasKey!('rules') ||
          hasKey!('readonly') ||
          hasKey!('disabled') ||
          hasKey!('allowClear')
        "
      >
        <el-checkbox v-if="hasKey!('rules')" v-model="data.options.rules.required">必填</el-checkbox>
        <el-checkbox v-if="hasKey!('readonly')" v-model="data.options.readonly">只读</el-checkbox>
        <el-checkbox v-if="hasKey!('disabled')" v-model="data.options.disabled">禁用</el-checkbox>
        <el-checkbox v-if="hasKey!('clearable')" v-model="data.options.clearable">清除</el-checkbox>
      </el-form-item>
      <el-alert
        title="支持配置所有参数，更多参数可参考 https://element.eleme.cn/#/zh-CN/component/select"
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
  name: 'selectConfig',
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

    const handleSelectModeChange = (val:boolean)=>{
      if (data.value.type === 'img-upload') {
        return
      }
      if (val) {
        if (data.value.options.defaultValue) {
          if (!(data.value.options.defaultValue instanceof Array)) {
            data.value.options.defaultValue = [data.value.options.defaultValue]
          }
        } else {
          data.value.options.defaultValue = []
        }
      } else {
        data.value.options.defaultValue.length
          ? (data.value.options.defaultValue =
          data.value.options.defaultValue[0])
          : (data.value.options.defaultValue = "")
      }
    }

    return {
      data,
      handleInsertOption,
      handleOptionsRemove,
      handleSelectModeChange
    }
  },
})
</script>
  


  
  
  