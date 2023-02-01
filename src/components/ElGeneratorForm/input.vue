<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <el-input
        v-model="data"
        :style="{ width: element.options.width }"
        :placeholder="element.options.placeholder"
        :maxlength="parseInt(element.options.maxlength)"
        :clearable="element.options.clearable"
        :readonly="element.options.readonly"
        :disabled="disabled || element.options.disabled"
        v-bind="element.options"
      >
        <template #prefix v-if="element.options.prefix">{{ element.options.prefix }}</template>
        <template #suffix v-if="element.options.suffix">{{ element.options.suffix }}</template>
        <template #prepend v-if="element.options.prepend">{{ element.options.prepend }}</template>
        <template #append v-if="element.options.append">{{ element.options.append }}</template>
      </el-input>
    </el-form-item>
  </template>
  
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'inputItem',
  components: {
  },
  emits:["update:model"],
  props: {
    config: {
      type: Object,
      required: true
    },
    element: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  setup(props,context){
    const state = reactive({
      data:props.model[props.element.model],
    })
    watch(()=>state.data,(val)=>{
      let newmodel = props.model;
      newmodel[props.element.model] = val
      context.emit("update:model",newmodel)
    })
    return {
      ...toRefs(state)
    }
  },  
})
</script>