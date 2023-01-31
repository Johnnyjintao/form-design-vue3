<template>
  <div class="widget-item-container">
    <component
      class="widget-view drag-widget"
      :class="{ active: selectWidget?.key === element.key }"
      :is="element.type+'Item'"
      v-model:model="model"
      :disabled="false"
      :key="element.key"
      :element="element"
      :config="config"
      :open="initOpen(element)"
    />
    <div class="widget-view-action" v-if="selectWidget?.key === element.key">
      <SvgIcon iconClass="copy" @click.stop="$emit('copy')" v-if="element.type!=='toggle'" />
      <SvgIcon iconClass="delete" @click.stop="$emit('delete')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import { WidgetForm } from '@/config/element'
import SvgIcon from '@/components/SvgIcon.vue'
import inputItem from '@/components/ElGeneratorForm/input.vue';
import selectItem from '@/components/ElGeneratorForm/select.vue';
import radioItem from '@/components/ElGeneratorForm/radio.vue';
import checkboxItem from '@/components/ElGeneratorForm/checkbox.vue';
import timeItem from '@/components/ElGeneratorForm/time.vue';
import dateItem from '@/components/ElGeneratorForm/date.vue';
import numrangeItem from '@/components/ElGeneratorForm/numrange.vue';
import rateItem from '@/components/ElGeneratorForm/rate.vue';
import switchItem from '@/components/ElGeneratorForm/switch.vue';
import sliderItem from '@/components/ElGeneratorForm/slider.vue';
import textItem from '@/components/ElGeneratorForm/text.vue';
import imageItem from '@/components/ElGeneratorForm/image.vue';
import toggleItem from '@/components/ElGeneratorForm/toggle.vue';

export default defineComponent({
  name: 'ElWidgetFormItem',
  components: {
    SvgIcon,
    RichTextEditor,
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
    toggleItem
  },
  props: {
    config: {
      type: Object as PropType<WidgetForm['config']>,
      required: true
    },
    element: {
      type: Object,
      required: true
    },
    selectWidget: {
      type: Object
    }
  },
  emits: ['copy', 'delete'],
  setup(){
    const model = reactive({});
    const initOpen = function(element:any){
      if(element.type === 'toggle'){
        return element.options.defaultValue;
      }
      return false;
    }
    return {
      model,
      initOpen
    }
  }
})
</script>
