<template>
  <div class="grid grid-cols-2 md:grid-cols-3 h-20 lg:h-24 px-5">
    <!-- Logo and name -->
    <div class="flex items-center">
      <AppLogo class="mr-3" />
    </div>

    <div class="flex space-x-2 md:space-x-0 items-center justify-end md:justify-center">
      <!-- Cap preview -->
      <div class="hidden md:visible md:flex">
        <AppPreview />
      </div>
      <!-- Menu icon on smaller screens -->
      <div class="visible md:hidden space-x-2">
        <AppIcon icon="hamburger" @click="showMenu = true" />
      </div>
    </div>

    <!-- Menu on medium size screens -->
    <div class="hidden md:visible md:flex flex-col items-end justify-center -space-y-1">
      <!-- Action menu items -->
      <div class="flex space-x-1 md:space-x-3 lg:space-x-3">
        <AppButton @click="confirmRestart">restart</AppButton>
        <AppButton @click="downloadImage">download</AppButton>
        <AppButton @click="toggleMode">type</AppButton>
      </div>
      <!-- Board size menu -->
      <div class="flex space-x-3">
        <AppNavbar
          :items="sizes"
          :active="currentSize"
          @toggle="confirmChange"
        />
      </div>
    </div>
  </div>

  <!-- Menu on smaller screen popup -->
  <AppModal
    :value="showMenu"
    @close="showMenu = false"
  >
    <div class="p-10 text-center w-full">
      <ul class="flex flex-col space-y-0.5">
        <li><AppButton @click="confirmRestart">restart</AppButton></li>
        <li><AppButton @click="downloadImage">download</AppButton></li>
        <li><AppButton @click="toggleMode">type</AppButton></li>
        <li>
          <AppNavbar
            :items="sizes"
            :active="currentSize"
            @toggle="confirmChange"
          />
        </li>
      </ul>
    </div>
  </AppModal>

  <!-- Restart board confirmation popup -->
  <AppModal
    :value="showConfirmRestart"
    @close="showConfirmRestart = false"
  >
    <div class="p-10 text-center space-y-10 break-words md:max-w-sm">
      <div class="space-y-3">
        <h1 class="uppercase">restart</h1>
        <p class="text-sm md:text-tiny">you're about to clear your board and lose current design. proceed?</p>
      </div>
      <div class="flex space-x-2 justify-center">
        <AppButton @click="restart">
          <span class="text-green-400">yes, please</span>
        </AppButton>
        <AppButton @click="showConfirmRestart = false">
          <span class="text-red-400">hold on</span>
        </AppButton>
      </div>
    </div>
  </AppModal>

  <!-- Change size confirmation popup -->
  <AppModal
    :value="showConfirmChange"
    @close="showConfirmChange = false"
  >
    <div class="p-10 text-center space-y-10 break-words md:max-w-sm">
      <div class="space-y-3">
        <h1 class="uppercase">{{ newSize }}%</h1>
        <p class="text-sm md:text-tiny">changing into a different board size will delete your current progress. continue?</p>
      </div>
      <div class="flex space-x-2 justify-center">
        <AppButton @click="changeSize">
          <span class="text-green-400">yes, please</span>
        </AppButton>
        <AppButton @click="showConfirmChange = false">
          <span class="text-red-400">hold on</span>
        </AppButton>
      </div>
    </div>
  </AppModal>
</template>

<script>
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'
  // Plugin for converting html element to image
  import domtoimage from "dom-to-image-more"

  export default {
    setup() {
      const store = useStore()

      // Setting loading to true
      // will display window loading overlay
      let loading = computed({
        get() { return store.getters.loading },
        set(value) { store.commit('setLoading', value) }
      })

      // Restart/clear board colors
      const restart = () => {
        loading.value = true
        store.commit('restartBoard')
        showConfirmRestart.value = false
        window.location.reload()
        // loading.value = false
      }

      let showMenu = ref(false)
      let showConfirmRestart = ref(false)

      const confirmRestart = () => {
        showConfirmRestart.value = true
        showMenu.value = false
      }

      const restartBlock = { restart, confirmRestart, showConfirmRestart }

      // Note: Currently no function yet
      // This will be used to change into
      // typing mode and display only the keyboard
      // and bind the virtual board keys to the
      // user's actual keyboard keys
      const type = computed(() => store.getters.type)
      const toggleMode = () => store.commit('toggleMode')

      const modeBlock = { toggleMode, type }

      // Change board size
      const currentSize = computed(() => store.getters.size)
      const sizes = ['40', '60', '75', '80', '100']

      let showConfirmChange = ref(false)
      let newSize = ref('')
      const  boardSize = computed(() => store.getters.size)

      const confirmChange = (size) => {
        showMenu.value = false
        if (boardSize.value !== size) {
          showConfirmChange.value = true
          newSize.value = size
        }
      }
      const changeSize = () => {
        loading.value = true
        store.commit('toggleBoardSize', newSize.value)
        newSize.value = ''
        showConfirmChange.value = false
        loading.value = false
      }

      const sizeBlock = {
        currentSize, sizes, changeSize,
        showConfirmChange, newSize, confirmChange,
      }

      // DOM to image
      const downloadImage = () => {
        loading.value = true
        let element = document.getElementById('board')

        domtoimage.toJpeg(element, { quality: 0.95 })
          .then(function (dataUrl) {
            var link = document.createElement('a')
            link.download = 'board.jpeg'
            link.href = dataUrl
            link.click()
            loading.value = false
          })
      }

      const loadingBlock = { downloadImage, loading }

      return {
        ...restartBlock,
        ...modeBlock,
        ...sizeBlock,
        ...loadingBlock,
        showMenu
      }
    }
  }
</script>

<style>

</style>