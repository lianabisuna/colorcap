<template>
  <div class="grid grid-cols-1 md:grid-cols-2 py-5 h-full px-5 space-y-1 md:space-y-0">
    <div class="flex items-center">
      <!-- Left menu -->
      <div class="flex flex-col space-y-1 md:space-y-0 md:flex-row items-center md:space-x-5 w-full">
        <AppNavbar
          title="text"
          :items="texts"
          :active="currentText"
          @toggle="toggleText"
        />
        <AppNavbar
          title="alignment"
          :items="alignment"
          multiple
          :active="currentAlignment"
          @toggle="toggleAlignment"
        />
      </div>
    </div>
    <!-- Right menu icons -->
    <div class="flex flex-col text-center md:text-right justify-center">
      <div>
        <AppIcon :icon="theme === 'dark' ? 'cloud-moon' : 'cloud-sun'" @click="setTheme" />
        <a
          href="https://github.com/lianabisuna/colorcap"
          target="_blank"
        >
          <AppIcon icon="code-branch" />
        </a>
        <AppIcon
          @click="showInfo = true"
          icon="ghost"
        />
      </div>
    </div>
  </div>

  <!-- App and dev info popup -->
  <AppModal :value="showInfo" @close="showInfo = false">
    <div class="p-10 flex flex-col space-y-7 break-words md:max-w-sm">
      <div class="space-y-2">
        <div class="flex flex-col">
          <span class="text-xl uppercase">Colorcap</span>
          <span class="text-xs">•• type with colors ••</span>
        </div>
        <div class="lowercase font-medium text-sm">
          <span class="font-bold">Colorcap</span> is a minimalist keycap color editor where users can design keyboard's cap, text and board with their preferred color palette. Let's type with colors!
        </div>
      </div>
      <div class="text-xs font-extralight uppercase flex flex-col">
        <span>Developed by <span class="font-bold">Liana Bisuña</span></span>
      </div>
    </div>
  </AppModal>
</template>

<script>
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'

  export default {
    setup() {
      const store = useStore()

      // Text size menu
      const currentText = computed(() => store.getters.text)
      const texts = ['none', 'small', 'medium', 'large']

      const toggleText = (newText) => {
        store.commit('setTextSize', newText)
      }

      const sizeBlock = { currentText, texts, toggleText, }

      // Text alignment menu
      const currentAlignment = computed(() => store.getters.alignment)
      const alignment = ['top', 'bottom', 'left', 'right']

      const toggleAlignment = (newAlignment) => {
        store.commit('setAlignment', newAlignment)
      }

      const alignmentBlock = { currentAlignment, alignment, toggleAlignment }

      // Set theme
      const theme = computed(() => store.getters.theme)
      const setTheme = () => store.commit('setTheme')

      const themeBlock = { theme, setTheme, }

      const showInfo = ref(false)

      return {
        ...sizeBlock,
        ...alignmentBlock,
        ...themeBlock,
        showInfo
      }
    }
  }
</script>