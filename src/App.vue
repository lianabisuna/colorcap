<template>
  <main
    :class="[ theme === 'dark' ? 'bg-cloud' : 'bg-sun-50' ]"
  >
    <div class="max-w-4.5xl mx-auto">
      <router-view/>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    /* eslint-disable */

    const boardData = [
      // 100%
      // 80% keyboard
      // 75%
      {
          name: 'Compact Tenkeyless',
          alt: '75',
          active: false,
          size: 75,
          keys: 84,
          color: '',
          layout: 'qwerty',
          text: 'small',
          alignment: [],
          rows: [
            [
              { id: 1, textColor: '', capColor: '', active: false, type: '', text: 'Esc', width: 'xs' },
              { id: 2, textColor: '', capColor: '', active: false, type: 'function', text: 'F1', width: 'xs' },
              { id: 3, textColor: '', capColor: '', active: false, type: 'function', text: 'F2', width: 'xs' },
              { id: 4, textColor: '', capColor: '', active: false, type: 'function', text: 'F3', width: 'xs' },
              { id: 5, textColor: '', capColor: '', active: false, type: 'function', text: 'F4', width: 'xs' },
              { id: 6, textColor: '', capColor: '', active: false, type: 'function', text: 'F5', width: 'xs' },
              { id: 7, textColor: '', capColor: '', active: false, type: 'function', text: 'F6', width: 'xs' },
              { id: 8, textColor: '', capColor: '', active: false, type: 'function', text: 'F7', width: 'xs' },
              { id: 9, textColor: '', capColor: '', active: false, type: 'function', text: 'F8', width: 'xs' },
              { id: 10, textColor: '', capColor: '', active: false, type: 'function', text: 'F9', width: 'xs' },
              { id: 11, textColor: '', capColor: '', active: false, type: 'function', text: 'F10', width: 'xs' },
              { id: 12, textColor: '', capColor: '', active: false, type: 'function', text: 'F11', width: 'xs' },
              { id: 13, textColor: '', capColor: '', active: false, type: 'function', text: 'F12', width: 'xs' },
              { id: 14, textColor: '', capColor: '', active: false, type: '', text: 'PrtSc', width: 'xs' },
              { id: 15, textColor: '', capColor: '', active: false, type: '', text: 'Pause', width: 'xs' },
              { id: 16, textColor: '', capColor: '', active: false, type: '', text: 'Del', width: 'xs' }
            ], // 224
            [
              { id: 17, textColor: '', capColor: '', active: false, type: '', text: '` ~', width: 'xs' },
              { id: 18, textColor: '', capColor: '', active: false, type: 'numeric', text: '1 !', width: 'xs' },
              { id: 19, textColor: '', capColor: '', active: false, type: 'numeric', text: '2 @', width: 'xs' },
              { id: 20, textColor: '', capColor: '', active: false, type: 'numeric', text: '3 #', width: 'xs' },
              { id: 21, textColor: '', capColor: '', active: false, type: 'numeric', text: '4 $', width: 'xs' },
              { id: 22, textColor: '', capColor: '', active: false, type: 'numeric', text: '5 %', width: 'xs' },
              { id: 23, textColor: '', capColor: '', active: false, type: 'numeric', text: '6 ^', width: 'xs' },
              { id: 24, textColor: '', capColor: '', active: false, type: 'numeric', text: '7 &', width: 'xs' },
              { id: 25, textColor: '', capColor: '', active: false, type: 'numeric', text: '8 *', width: 'xs' },
              { id: 26, textColor: '', capColor: '', active: false, type: 'numeric', text: '9 (', width: 'xs' },
              { id: 27, textColor: '', capColor: '', active: false, type: 'numeric', text: '0 )', width: 'xs' },
              { id: 28, textColor: '', capColor: '', active: false, type: '', text: '- _', width: 'xs' },
              { id: 29, textColor: '', capColor: '', active: false, type: '', text: '= +', width: 'xs' },
              { id: 30, textColor: '', capColor: '', active: false, type: '', text: '&larr;', width: 'lg' },
              { id: 31, textColor: '', capColor: '', active: false, type: '', text: 'Home', width: 'xs' }
            ], // 224
            [
              { id: 32, textColor: '', capColor: '', active: false, type: '', text: 'Tab', width: 'md' },
              { id: 33, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'Q', width: 'xs' },
              { id: 34, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'W', width: 'xs' },
              { id: 35, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'E', width: 'xs' },
              { id: 36, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'R', width: 'xs' },
              { id: 37, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'T', width: 'xs' },
              { id: 38, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'Y', width: 'xs' },
              { id: 39, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'U', width: 'xs' },
              { id: 40, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'I', width: 'xs' },
              { id: 41, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'O', width: 'xs' },
              { id: 42, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'P', width: 'xs' },
              { id: 43, textColor: '', capColor: '', active: false, type: '', text: '[ {', width: 'xs' },
              { id: 44, textColor: '', capColor: '', active: false, type: '', text: '] }', width: 'xs' },
              { id: 45, textColor: '', capColor: '', active: false, type: '', text: '&#92; |', width: 'md' },
              { id: 46, textColor: '', capColor: '', active: false, type: '', text: 'End', width: 'xs' }
            ], // 222
            [
              { id: 47, textColor: '', capColor: '', active: false, type: '', text: 'CapsLk', width: 'lg' },
              { id: 48, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'A', width: 'xs' },
              { id: 49, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'S', width: 'xs' },
              { id: 50, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'D', width: 'xs' },
              { id: 51, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'F', width: 'xs' },
              { id: 52, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'G', width: 'xs' },
              { id: 53, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'H', width: 'xs' },
              { id: 54, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'J', width: 'xs' },
              { id: 55, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'K', width: 'xs' },
              { id: 56, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'L', width: 'xs' },
              { id: 57, textColor: '', capColor: '', active: false, type: '', text: '; :', width: 'xs' },
              { id: 58, textColor: '', capColor: '', active: false, type: '', text: `' "`, width: 'xs' },
              { id: 59, textColor: '', capColor: '', active: false, type: '', text: 'Enter', width: 'xl' },
              { id: 60, textColor: '', capColor: '', active: false, type: '', text: 'PgUp', width: 'xs' },
            ], // 228
            [
              { id: 61, textColor: '', capColor: '', active: false, type: '', text: 'Shift', width: 'xl' },
              { id: 62, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'Z', width: 'xs' },
              { id: 63, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'X', width: 'xs' },
              { id: 64, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'C', width: 'xs' },
              { id: 65, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'V', width: 'xs' },
              { id: 66, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'B', width: 'xs' },
              { id: 67, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'N', width: 'xs' },
              { id: 68, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'M', width: 'xs' },
              { id: 69, textColor: '', capColor: '', active: false, type: '', text: ', <', width: 'xs' },
              { id: 70, textColor: '', capColor: '', active: false, type: '', text: '. >', width: 'xs' },
              { id: 71, textColor: '', capColor: '', active: false, type: '', text: '/ ?', width: 'xs' },
              { id: 72, textColor: '', capColor: '', active: false, type: '', text: 'Shift', width: 'lg' },
              { id: 73, textColor: '', capColor: '', active: false, type: 'arrow', text: '&uarr;', width: 'xs' },
              { id: 74, textColor: '', capColor: '', active: false, type: '', text: 'PgDn', width: 'xs' }
            ], // 228
            [
              { id: 75, textColor: '', capColor: '', active: false, type: '', text: 'Ctrl', width: 'sm' },
              { id: 76, textColor: '', capColor: '', active: false, type: '', text: 'Win', width: 'sm' },
              { id: 77, textColor: '', capColor: '', active: false, type: '', text: 'Alt', width: 'sm' },
              { id: 78, textColor: '', capColor: '', active: false, type: '', text: '', width: 'xxxl' },
              { id: 79, textColor: '', capColor: '', active: false, type: '', text: 'Alt', width: 'xs' },
              { id: 80, textColor: '', capColor: '', active: false, type: '', text: 'Fn', width: 'xs' },
              { id: 81, textColor: '', capColor: '', active: false, type: '', text: 'Ctrl', width: 'xs' },
              { id: 82, textColor: '', capColor: '', active: false, type: 'arrow', text: '&larr;', width: 'xs' },
              { id: 83, textColor: '', capColor: '', active: false, type: 'arrow', text: '&darr;', width: 'xs' },
              { id: 84, textColor: '', capColor: '', active: false, type: 'arrow', text: '&rarr;', width: 'xs' }
            ] // 228
          ]
        },
      // 60%
      // 40%
    ]
    
    const store = useStore()

    const boards = computed(() => store.getters.boards)

    // Add boards data in localstorage
    // if it isn't available
    if (!boards.value) {
      localStorage.setItem('boards', JSON.stringify(boardData))
      window.location.reload()
    }

    const paletteData = [
      {
        index: 0,
        colors: [
          { number: '1', color: '#C16F52' },
          { number: '2', color: '#D6B0A4' },
          { number: '3', color: '#E7E6EE' },
          { number: '4', color: '#888677' },
          { number: '5', color: '#CDDDC8' }
        ]
      }
    ]

    const palette = computed(() => store.getters.palette)

    // Add palette data in localstorage
    // if it isn't available
    if (!palette.value) localStorage.setItem('palette', JSON.stringify(paletteData))

    // Deselect board and caps
    store.commit('deselect')
    
    const theme = computed(() => store.getters.theme)
    if (!theme.value) localStorage.setItem('theme', 'light')

    return { theme }
  }
}
</script>

<style>
  #app {
    font-family: 'Aldrich', 'sans-serif';
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  html {
    overflow: hidden;
  }

  /* Creating Custom Cursors - CSS Only, and JavaScript!
  Source: DesignCourse (Youtube) */
  .cursor-color {
    width: 20px;
    height: 20px;
    background: var(--active-color);
    border-radius: 50%;
    position: absolute;
    pointer-events: none;
  }
</style>
