<template>
  <div v-if="edit" class="flex justify-center py-5 h-full items-center mx-2">
    <div class="flex-wrap space-y-1">
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
import Palette from './Palette.vue'
import { useStore } from 'vuex'

export default {
  components: {
    Palette
  },
  setup() {
    const store = useStore()

    const currentCanvas = computed(() => store.getters.canvas)
    const canvases = ['cap', 'board', 'text']

    const toggleCanvas = (newCanvas) => {
      store.commit('updateCanvas', newCanvas)
    }

    const currentKey = computed(() => store.getters.key)
    const keys = ['all', 'function', 'arrow', 'numeric', 'alphabet']

    const toggleKey = (newKey) => {
      store.commit('updateKey', newKey)
    }

    const edit = computed(() => store.getters.edit)

    return {
      currentCanvas, canvases, toggleCanvas,
      currentKey, keys, toggleKey, edit
    }
  }
}
</script>

<style>

</style>