<template>
  <button
    :class="[
      theme === 'dark'
        ? active ? 'border-sun-50' : 'hover:border-sun-50 border-transparent'
        : active ? 'border-sky-800' : 'hover:border-sky-800 border-transparent',
      'outline-none border-b-2 leading-3 text-sm md:text-tiny'
    ]"
    v-bind="$attrs"
  >
    <span
      :class="[
        'lowercase font-semibold',
        theme === 'dark' ? 'text-sun-50' : 'text-sky-800'
      ]"
    >
      <slot></slot>
    </span>
  </button>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  export default {
    props: {
      active: { type: Boolean, default: false }
    },
    setup() {
      const store = useStore()

      const theme = computed(() => store.getters.theme)

      return { theme }
    }
  }
</script>