<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <el-checkbox-group
        v-model="data"
        :style="{ width: element.options.width }"
        :disabled="disabled || element.options.disabled"
        v-bind="element.options"
      >
        <el-checkbox
          v-for="item of element.options.options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :border="element.options.border"
          :style="{
            display: element.options.inline ? 'inline-block' : 'block'
          }"
        >
          {{
            item.label
          }}
        </el-checkbox>
      </el-checkbox-group>
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
  