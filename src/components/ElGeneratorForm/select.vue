<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <el-select
          v-model="data"
          :multiple="element.options.multiple"
          :placeholder="element.options.placeholder"
          :clearable="element.options.clearable"
          :filterable="element.options.filterable"
          :disabled="disabled || element.options.disabled"
          :style="{ width: element.options.width }"
          v-bind="element.options"
        >
        <el-option
          v-for="item of element.options.options"
          :key="item.value"
          :value="item.value"
          :label="element.options.showLabel ? item.label : item.value"
        />
      </el-select>
    </el-form-item>
  </template>
  
  <script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'selectItem',
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