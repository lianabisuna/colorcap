<template>
  <div
    v-if="loading"
    class="fixed inset-0 z-50 bg-cloud flex justify-center items-center space-x-2 bg-opacity-75 cursor-wait"
  >
    <span class="bg-sky-500 circle-a rounded-full w-3.5 h-3.5 animate-bounce"></span>
    <span class="bg-white circle-b rounded-full w-3.5 h-3.5 animate-bounce"></span>
    <span class="bg-sun-500 circle-c rounded-full w-3.5 h-3.5 animate-bounce"></span>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  export default {
    setup() {
      const store = useStore()

      let loading = computed(() => store.getters.loading)

      return { loading }
    }
  }
</script>

<style scoped>
  .circle-a {
    animation-delay: 0.2s;
  }

  .circle-b {
    animation-delay: 0.4s;
  }

  .circle-c {
    animation-delay: 0.6s;
  }
</style>