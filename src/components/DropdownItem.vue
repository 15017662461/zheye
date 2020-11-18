<template>
  <li class="dropdown-option" :class="{'is-disbaled':disbaled}">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name:'DropdownItem',
  props:{
    disbaled:{
      type:Boolean,
      default:false
    }
  }
})
</script>
<style scoped>
  .is-disbaled{
    color:red !important;
    pointer-events: none;
    background-color: transparent;
  }
</style>