<template>
  <div
    v-if="active"
    class="bg-sun-50 origin-top-right absolute top-0 left-10 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, default: false }
  }
}
</script>