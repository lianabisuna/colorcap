<template>
  <div class="flex justify-center py-5 h-full items-center px-5">
    <div class="flex-wrap space-y-1 md:-space-y-1">
      <div class="flex md:hidden justify-center pb-5">
        <AppPreview />
      </div>
      <AppNavbar
        title="canvas"
        :items="canvases"
        :active="currentCanvas"
        @toggle="toggleCanvas"
      />
      <AppNavbar
        title="key"
        :items="keys"
        :active="currentKey"
        @toggle="toggleKey"
      />
      <Palette />
    </div>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import Palette from './Palette.vue'

  export default {
    components: {
      Palette
    },
    setup() {
      const store = useStore()

      // Set canvas
      const currentCanvas = computed(() => store.getters.canvas)
      const canvases = ['cap', 'board', 'text']

      const toggleCanvas = (newCanvas) => {
        store.commit('updateCanvas', newCanvas)
      }

      const canvasBlock = { currentCanvas, canvases, toggleCanvas }

      // Activate caps when there's
      // no selected color
      const currentKey = computed(() => store.getters.key)
      const keys = ['all', 'function', 'arrow', 'numeric', 'alphabet']

      const toggleKey = (newKey) => {
        store.commit('updateKey', newKey)
      }

      const capBlock = { currentKey, keys, toggleKey }

      return {
        ...canvasBlock,
        ...capBlock
      }
    }
  }
</script>

<style>

</style>