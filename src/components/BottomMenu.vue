<template>
  <div v-if="edit" class="flex justify-center py-5 h-full items-center mx-5">
    <div class="flex-wrap space-y-1">
      <!-- <AppNavbar
        title="size"
        :items="sizes"
        :active="currentSize"
        @toggle="toggleSize"
      /> -->
      <AppNavbar
        title="alignment"
        :items="alignment"
        multiple
        :active="currentAlignment"
        @toggle="toggleAlignment"
      />
      <AppNavbar
        title="text"
        :items="texts"
        :active="currentText"
        @toggle="toggleText"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    
    // const currentSize = computed(() => store.getters.size)
    // const sizes = ['40', '60', '75', '80', '100']

    // const toggleSize = (newSize) => {
    //   currentSize.value = newSize 
    // }

    const currentText = computed(() => store.getters.text)
    const texts = ['none', 'small', 'medium', 'large']

    const toggleText = (newText) => {
      store.commit('setTextSize', newText)
    }

    const currentAlignment = computed(() => store.getters.alignment)
    const alignment = ['top', 'bottom', 'left', 'right']

    const toggleAlignment = (newAlignment) => {
      store.commit('setAlignment', newAlignment)
    }

    const edit = computed(() => store.getters.edit)

    return {
      // currentSize, sizes, toggleSize,
      currentText, texts, toggleText,
      currentAlignment, alignment, toggleAlignment,
      edit
    }
  }
}
</script>

<style>

</style>