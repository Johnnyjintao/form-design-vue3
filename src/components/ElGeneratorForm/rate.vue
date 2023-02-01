<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      {{ data }}
      <el-rate
          v-model="data"
          :max="element.options.max"
          :allowHalf="element.options.allowHalf"
          :disabled="disabled || element.options.disabled"
        />
    </el-form-item>
  </template>
  
  <script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'rateItem',
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
  