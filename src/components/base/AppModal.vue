<template>
  <div v-if="value" class="fixed inset-0 z-10">
    <div class="flex items-center justify-center min-h-screen">
      <!-- Background overlay -->
      <div
        @click.self="$emit('close')"
        class="fixed inset-0 bg-cloud bg-opacity-75"
        aria-hidden="true"
      ></div>

      <!-- Modal panel -->
      <div
        :class="[
          'inline-block rounded-md overflow-hidden shadow-md transform transition-alltransform transition-all',
          theme === 'dark' ? 'bg-cloud text-sun-50' : 'bg-sun-50 text-sky-800'
        ]"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    emits: ['close'],
    props: {
      value: { type: Boolean, default: false }
    },
    setup() {
      const store = useStore()

      const theme = computed(() => store.getters.theme)

      return { theme }
    }
  }
</script>