<template>
    <el-form-item v-if="element" :key="element.key" :label="element.label" :prop="element.model">
      <div class="mel-range-input" :style="{ width: element.options.width }">
        <el-input
          class="range-ipt min"
          type="number"
          :placeholder="element.options.minPlaceholder"
          :maxlength="element.options.maxlength"
          v-model="element.options.minOptions"
          :disabled="element.options.disabled"
        />
        <span class="range-ipt-center">~</span>
        <el-input
          class="range-ipt max"
          type="number"
          :placeholder="element.options.maxPlaceholder"
          :maxlength="element.options.maxlength"
          v-model="element.options.max"
          :disabled="element.options.disabled"
        />
      </div>
    </el-form-item>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive, toRefs, watch } from 'vue'
  export default defineComponent({
    name: 'numrangeItem',
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
  
<style scoped>
.mel-range-input {
  display: inline-block;
}
.range-ipt-center {
  width: 10%;
  display: inline-block;
  text-align: center;
}

.range-ipt {
  width: 45%;
  text-align: center;
}

.range-ipt.min {
  border-right: 0;
}
.range-ipt.max {
  border-left: 0;
}

</style>