<template>
  <div class="toggle" :style="initStyle()" @click="toggle">
    <span>{{ isopen ? "收起" : "展开" }}</span>
    <i :class="isopen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
  </div>
</template>

<script>
  import { defineComponent, reactive, toRefs } from 'vue'
  
  export default defineComponent({
    name: 'toggleItem',
    components: {
    },
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
      open:{
        type: Boolean,
      }
    },

    data(){
      return {
        data:"",
        isopen:true,
      }
    },
    setup(props,context){
      const state = reactive({
        data:"",
        isopen:props.open
      })

      const toggle = ()=>{
        state.isopen = !this.isopen;
        context.emit("change",this.isopen)
      }

      const initStyle = ()=>{
        return `display:flex;alignItems:${props.element.options.alignItems};justifyContent:${this.element.options.justifyContent}`
      }

      return {
        ...toRefs(state),
        toggle,
        initStyle
      }
    }
    
  })
  </script>

<style scoped>
.toggle{
  cursor: pointer;
  color: #409EFF;
  font-size: 14px;
  height: 40px;
}
.toggle span {
  margin-right: 5px;
}
</style>
  