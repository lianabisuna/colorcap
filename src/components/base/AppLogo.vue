<template>
  <div class="flex align-center">
    <img
      src="@/assets/logo.png"
      alt="logo"
      class="w-10 md:w-12 mr-2"
    >
    <span
      :class="[
        'text-2xl md:text-3xl font-extrabold',
        theme === 'dark' ? 'text-sun-50' : 'text-sky-800'
      ]"
    >
      colorcap
    </span>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  export default {
    setup() {
      const store = useStore()

      const theme = computed(() => store.getters.theme)

      return { theme }
    }
  }
</script>