<template>
  <button
    v-bind="$attrs"
    class="group"
  >
    <div
      :class="[
        'rounded-md w-8 py-1 text-base md:text-sm lg:text-base',
        theme === 'dark' ? 'group-hover:bg-sun-900 text-sun-50' : 'group-hover:bg-sky-100 text-sky-800'
      ]"
    >
      <font-awesome-icon :icon="icon" />
    </div>
  </button>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  export default {
    props: {
      icon: { type: String, default: '' }
    },
    setup() {
      const store = useStore()

      const theme = computed(() => store.getters.theme)

      return { theme }
    }
  }
</script>

<style>

</style>