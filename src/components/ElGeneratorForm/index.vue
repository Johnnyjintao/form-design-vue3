<template>
  <div class="fc-style">
    <el-form
      ref="generateForm"
      label-suffix=":"
      :model="model"
      :rules="rules"
      :size="widgetForm.config.size"
      :label-position="widgetForm.config.labelPosition"
      :label-width="`${widgetForm.config.labelWidth}px`"
      :hide-required-asterisk="widgetForm.config.hideRequiredAsterisk"
      :style="initFormStyle()"
    >
      <template v-for="(element, index) of widgetForm.list">
        <template v-if="initShowNum(index) && element.type === 'grid'">
          <el-row
            type="flex"
            v-if="element.key"
            :key="element.key"
            :gutter="element.options.gutter ?? 0"
            :justify="element.options.justify"
            :align="element.options.align"
          >
            <el-col
              v-for="(col, colIndex) of element.columns"
              :key="colIndex"
              :span="col.span ?? 0"
            >
            <div :key="colItem.key" v-for="colItem of col.list">
              <component
                v-if="colItem.type!='toggle'"
                :key="colItem.key"
                :is="colItem.type+'Item'"
                v-model:model="model"
                :element="colItem"
                :config="data.config"
                :disabled="disabled"
              />
            </div>
            </el-col>
          </el-row>
        </template>
        <component
          v-if="widgetForm.list[index].type!='toggle'"
          :is="widgetForm.list[index].type+'Item'"
          v-model:model="model"
          :key="element.key"
          :element="widgetForm.list[index]"
          :config="data.config"
          :disabled="disabled"
        />
      </template>
    </el-form>

    <toggle v-if="toggleData"
          :open="isopen"
          v-model:model="model"
          :element="toggleData"
          :config="data.config"
          @change="(val:boolean)=>{isopen=val}"></toggle>
  </div>
</template>
  
<script lang="ts">
  import inputItem from './input.vue';
  import selectItem from './select.vue';
  import radioItem from './radio.vue';
  import checkboxItem from './checkbox.vue';
  import timeItem from './time.vue';
  import dateItem from './date.vue';
  import numrangeItem from './numrange.vue';
  import rateItem from './rate.vue';
  import switchItem from './switch.vue';
  import sliderItem from './slider.vue';
  import textItem from './text.vue';
  import imageItem from './image.vue';
  import toggle from './toggle.vue';
  import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
  import { widgetForm } from '@/config/element'
  import { ElMessage } from 'element-plus'
  export default defineComponent({
    name: 'ElGenerateForm',
    components: {
      inputItem,
      selectItem,
      radioItem,
      checkboxItem,
      timeItem,
      dateItem,
      numrangeItem,
      rateItem,
      switchItem,
      sliderItem,
      textItem,
      imageItem,
      toggle
    },
    props: {
      data: {
        type: Object,
        default: widgetForm
      },
      value: {
        type: Object
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:model'],
    setup(props) {
      const state = reactive({
        generateForm: null as any,
        model: {} as any,
        rules: {} as any,
        widgetForm:
          (props.data && JSON.parse(JSON.stringify(props.data))) ??
          widgetForm,
        toggleData:null as any,
        isopen:true,
      })

      const generateModel = (list: any[]) => {
        for (let index = 0; index < list.length; index++) {
          const model = list[index].model
          if (!model) {
            return
          }
          if (list[index].type === 'grid') {
            list[index].columns.forEach((col: any) => generateModel(col.list))
          } else {
            if (props.value && Object.keys(props.value).includes(model)) {
              state.model[model] = props.value[model]
            } else {
              state.model[model] = list[index].options.defaultValue
            }

            state.rules[model] = list[index].options.rules
          }
        }
      }

      const generateOptions = (list: any[]) => {
        list.forEach(item => {
          if (item.type === 'grid') {
            item.columns.forEach((col: any) => generateOptions(col.list))
          } else {
            if (item.options.remote && item.options.remoteFunc) {
              fetch(item.options.remoteFunc)
                .then(resp => resp.json())
                .then(json => {
                  if (json instanceof Array) {
                    item.options.remoteOptions = json.map(data => ({
                      label: data[item.options.props.label],
                      value: data[item.options.props.value],
                      children: data[item.options.props.children]
                    }))
                  }
                })
            }
          }
        })
      }

      watch(
        () => props.data,
        val => {
          state.widgetForm =
            (val && JSON.parse(JSON.stringify(val))) ?? widgetForm
          state.model = {}
          state.rules = {}
          generateModel(state.widgetForm.list)
          generateOptions(state.widgetForm.list)
        },
        { deep: true, immediate: true }
      )

      onMounted(() => {
        generateModel(state.widgetForm?.list ?? [])
        generateOptions(state.widgetForm?.list ?? [])
      })

      const getData = () => {
        return new Promise((resolve, reject) => {
          state.generateForm
            .validate()
            .then((validate: boolean) => {
              if (validate) {
                resolve(state.model)
              } else {
                ElMessage.error('验证失败')
              }
            })
            .catch((error: Error) => {
              reject(error)
            })
        })
      }

      const reset = () => {
        state.generateForm.resetFields()
      }

      const initFormStyle = ()=> {
        if(state.toggleData && state.toggleData.options.type==='height' && state.isopen){
          return `height:auto;`
        }
        if(state.toggleData && state.toggleData.options.type==='height' && !state.isopen){
          return `height:${state.toggleData.options.height};overflow:hidden;`
        }
        return  ""
      }
      
      const initShowNum = (index:number)=> {
        if(state.toggleData && state.toggleData.options.type==='num' && !state.isopen){
          let num = state.toggleData.options.num;
          if(index+1 > num){
            return false
          }
        }
        return true;
      }
     
    
      return {
        ...toRefs(state),
        getData,
        reset,
        initShowNum,
        initFormStyle,
      }
    },
    
  })
  </script>

<style scoped>
.el-form-item{
  margin-bottom: 15px !important;
}
</style>
