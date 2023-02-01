<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <el-date-picker
        v-model="data"
        :placeholder="element.options.placeholder"
        :readonly="element.options.readonly"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :format="element.options.format"
        :disabled="disabled || element.options.disabled"
        :style="{ width: element.options.width }"
        v-bind="element.options"
      />
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