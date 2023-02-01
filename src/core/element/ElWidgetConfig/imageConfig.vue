<!-- 图片 -->
<template>
  <div v-if="data">
    <el-form-item label="图片宽度">
      <el-input v-model="data.options.imgWidth"></el-input>
    </el-form-item>
    <el-form-item label="图片高度">
      <el-input v-model="data.options.imgWidth"></el-input>
    </el-form-item>
    <el-form-item label="图片列表">
      <ul>
        <li :key="element" v-for="(element,index) in data.options.srcList" style="display: flex; align-items: center; margin-bottom: 5px">
          <el-input v-model="element.url" placeholder="请输入图片地址"></el-input>
          <el-button type="primary" circle @click="srcListRemove(index)" :style="{marginLeft:'5px'}">
            <SvgIcon iconClass="delete" />
          </el-button>
        </li>
      </ul>
      <div style="margin-top: 5px">
        <el-button type="text" @click="srcListInsert">添加选项</el-button>
      </div>
    </el-form-item>

    <el-form-item label="预览列表">
      <ul>
        <li :key="element" v-for="(element,index) in data.options.previewSrcList" style="display: flex; align-items: center; margin-bottom: 5px">
          <el-input v-model="element.url" placeholder="请输入图片地址"></el-input>
          <el-button type="primary" circle @click="previewSrcListRemove(index)" :style="{marginLeft:'5px'}">
            <SvgIcon iconClass="delete" />
          </el-button>
        </li>
      </ul>
      <div style="margin-top: 5px">
        <el-button type="text" @click="previewSrcListInsert">添加选项</el-button>
      </div>
    </el-form-item>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

export default defineComponent({
  name: 'inputConfig',
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
    
    const srcListInsert = ()=>{
      data.value.options.srcList.push({ url:"" })
    }

    const srcListRemove = (index:number)=>{
      data.value.options.srcList.splice(index, 1)
    }

    const previewSrcListInsert = ()=>{
      data.value.options.previewSrcList.push({ url:"" })
    }

    const previewSrcListRemove = (index:number)=>{
      data.value.options.previewSrcList.splice(index, 1)
    }

    return {
      data,
      srcListInsert,
      srcListRemove,
      previewSrcListInsert,
      previewSrcListRemove,
    }
  },
})
</script>
  
