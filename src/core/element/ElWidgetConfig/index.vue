<template>
  <el-form label-position="right" label-width="85px"  v-if="data" :key="data.key">
    <el-form-item label="字段标识" v-if="data.type !== 'grid' && data.type !== 'toggle'">
      <el-input v-model="data.model" />
    </el-form-item>

    <el-form-item label="标题" v-if="data.type !== 'grid' && data.type !== 'toggle'">
      <el-input v-model="data.label" />
    </el-form-item>

    <el-form-item label="宽度" v-if="data.type !== 'grid' && hasKey('width')">
      <el-input v-model="data.options.width" />
    </el-form-item>

    <component :is="data.type+`Config`" v-model:select="data" :hasKey="hasKey">
    </component>

    <template v-if="data.type !== 'grid' && hasKey('rules')">
      <h4>验证规则</h4>

      <el-form-item label="触发时机">
        <el-radio-group v-model="data.options.rules.trigger">
          <el-radio-button label="blur">Blur</el-radio-button>
          <el-radio-button label="change">Change</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="字段长度">
        <el-input v-model.number="data.options.rules.len" />
      </el-form-item>

      <el-form-item label="最大长度">
        <el-input v-model.number="data.options.rules.max" />
      </el-form-item>

      <el-form-item label="最小长度">
        <el-input v-model.number="data.options.rules.min" />
      </el-form-item>

      <el-form-item label="校验文案">
        <el-input v-model="data.options.rules.message" />
      </el-form-item>

      <el-form-item label="正则表达式">
        <el-input v-model="data.options.rules.pattern" />
      </el-form-item>

      <el-form-item label="校验类型">
        <el-select v-model="data.options.rules.type">
          <el-option value="string">字符串</el-option>
          <el-option value="number">数字</el-option>
          <el-option value="boolean">布尔值</el-option>
          <el-option value="method">方法</el-option>
          <el-option value="regexp">正则表达式</el-option>
          <el-option value="integer">整数</el-option>
          <el-option value="float">浮点数</el-option>
          <el-option value="array">数组</el-option>
          <el-option value="object">对象</el-option>
          <el-option value="enum">枚举</el-option>
          <el-option value="date">日期</el-option>
          <el-option value="url">URL地址</el-option>
          <el-option value="hex">十六进制</el-option>
          <el-option value="email">邮箱地址</el-option>
          <el-option value="any">任意类型</el-option>
        </el-select>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts">
import inputConfig from './inputConfig.vue'
import selectConfig from './selectConfig.vue'
import radioConfig from './radioConfig.vue'
import checkboxConfig from './checkboxConfig.vue'
import numberConfig from './numberConfig.vue'
import timeConfig from './timeConfig.vue'
import dateConfig from './dateConfig.vue'
import numrangeConfig from './numrangeConfig.vue'
import rateConfig from './rateConfig.vue'
import switchConfig from './switchConfig.vue'
import sliderConfig from './sliderConfig.vue'
import textConfig from './textConfig.vue'
import imageConfig from './imageConfig.vue'
import gridConfig from './gridConfig.vue'
import toggleConfig from './toggleConfig.vue'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'ElWidgetConfig',
  components: {
    inputConfig,
    selectConfig,
    radioConfig,
    checkboxConfig,
    numberConfig,
    timeConfig,
    dateConfig,
    numrangeConfig,
    rateConfig,
    switchConfig,
    sliderConfig,
    textConfig,
    imageConfig,
    gridConfig,
    toggleConfig
  },
  props: {
    select: {
      type: Object
    },
  },
  emits: ['update:select'],
  setup(props, context){
    const data = ref<any>(props.select)
    watch(
      () => props.select,
      (val) => (data.value = val)
    )

    watch(data, (val) => context.emit('update:select', val), { deep: true })
    
    const hasKey = (key: string) => Object.keys(data.value.options).includes(key)
    const hahaha = (key: string) => Object.keys(data.value.options).includes(key)
    return {
      data,
      hasKey,
      hahaha
    }
  },
})
</script>