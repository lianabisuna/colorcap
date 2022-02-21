<template>
  <div class="flex justify-center pt-2">
    <div class="flex space-x-3 items-center">
      <!-- 5-color palette -->
      <AppColor
        v-for="(color, index) in colors"
        :key="index"
        :active="activeColor?.number === color?.number"
        @click="updateColor(color)"
        :id="index+1"
        :color="color?.color"
      />
      <!-- Add color button -->
      <div class="relative">
        <button
          @click="dropdown = !dropdown"
          :class="[
            'flex justify-center items-center h-5 w-5 lg:h-6 lg:w-6 rounded-full border-2',
            theme === 'dark' ? 'border-sun-50 bg-cloud' : 'bg-sun-50 border-sky-800'
          ]"
        >
          <span
            :class="[
              'text-xs',
              theme === 'dark' ? 'text-sun-50' : 'text-sky-800'
            ]"
          >
            <font-awesome-icon icon="plus" />
          </span>
        </button>
      </div>
    </div>
  </div>

  <!-- Add hex color popup -->
  <AppModal :value="dropdown" @close="dropdown = false">
    <div class="flex flex-col p-10 space-y-3">
      <h1 class="uppercase">color</h1>
      <div class="flex items-center">
        <div class="color-preview border-2 border-gray-200 bg-white h-6 w-6 rounded-full mr-3"></div>
          <div
            :class="[
              'flex border border-gray-200 rounded-md',
              theme === 'dark' ? 'focus-within:border-sun-400' : 'focus-within:border-sky-800'
            ]"
          >
            <input
              type="text"
              :class="[
                'rounded-l-md h-8 w-24 focus:outline-none px-2 text-sm font-manrope',
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              ]"
              v-model="hexColor"
              maxlength="7"
            >
            <button
              type="button"
              :class="[
                'border-l border-gray-200 w-9 rounded-r-md bg-white',
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              ]"
              @click="addHexColor"
            >
              <span class="text-xs">
                <font-awesome-icon icon="check" />
              </span>
            </button>
          </div>
      </div>
    </div>
  </AppModal>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const colors = computed(() => store.getters.colors)
    const activeColor = computed(() => store.getters.color)

    const updateColor = color => {
      store.commit('updateColor', color)
      document.documentElement.style.setProperty("--active-color", color.color)
    }

    const paletteBlock = { colors, activeColor, updateColor, }

    const dropdown = ref(false)
    const hexColor = ref('#')
    const hexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i

    // Watch changes in hex input and
    // check if it's a valid hex color
    // If it is, update color preview
    watch([hexColor], () => {
      const element = document.getElementsByClassName('color-preview')[0]

      if (hexColor.value.length && hexColor.value[0] !== '#')
        hexColor.value = '#' + hexColor.value

      if (hexRegex.test(hexColor.value)) {
        element.classList.remove('bg-white')
        element.style.backgroundColor = hexColor.value
      }
      else {
        element.classList.add('bg-white')
        element.style.backgroundColor = '#fff'
      }
    })

    // Add hex color to palette
    const addHexColor = () => {
      if (hexRegex.test(hexColor.value)) {
        store.commit('updatePalette', hexColor.value)
        hexColor.value = ''
      }
    }

    const dropdownBlock = { dropdown, hexColor, addHexColor }
    
    const theme = computed(() => store.getters.theme)

    return {
      ...paletteBlock,
      ...dropdownBlock,
      theme
    }
  }
}
</script>