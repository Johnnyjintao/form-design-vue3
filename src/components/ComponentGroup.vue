<template>
  <div class="widget-cate">{{ title }}</div>
  <Draggable
    tag="ul"
    item-key="type"
    ghostClass="ghost"
    :group="{ name: 'people', pull: 'clone', put: false }"
    :sort="false"
    :list="list"
  >
    <template #item="{ element }">
      <li
        class="form-edit-widget-label"
        :class="{ 'no-put': element.tpye === 'divider' }"
      >
        <a>
          <SvgIcon :iconClass="element.type" />
          <span>{{ element.label }}</span>
        </a>
      </li>
    </template>
  </Draggable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Draggable from 'vuedraggable'
import SvgIcon from './SvgIcon.vue'

export default defineComponent({
  name: 'ComponentGroup',
  components: {
    Draggable,
    SvgIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
   
    list: {
      required: true
    }
  }
})
</script>

<style scoped>
.widget-cate{
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
