<template>
  <button
    :class="[
      active ? 'border-2 border-sky-800' : 'border border-gray-500',
      { 'bg-gray-300': !capColor }, `cap-${id}`,
      activeColor?.number ? 'cursor-brush' : 'cursor-pointer',
      `shadow grid rounded md:rounded-md p-px sm:p-0.5 md:p-1`, alignmentClass,
      `h-8 xs:h-${heights.md} sm:h-${heights.md} md:h-${heights.md} lg:h-${heights.lg} 
      xs:w-${widths[width].md} sm:w-${widths[width].md} md:w-${widths[width].md} lg:w-${widths[width].lg}`
    ]"
    type="button"
    @click.stop="toggleCap"
  >
    <span
      :class="[
        { 'text-gray-500': !textColor },
        'font-semibold font-manrope', textSize
      ]"
      v-html="text"
    ></span>
  </button>
</template>

<script>
import { computed, onMounted, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    id: { type: Number, default: null },
    text: { type: String, default: '' },
    width: { type: String, default: '' },
    active: { type: Boolean, default: false },
    row: { type: Number, default: null },
    col: { type: Number, default: null },
    capColor: { type: String, default: '' },
    textColor: { type: String, default: '' }
  },
  setup(props) {
    const store = useStore()

    const activeColor = computed(() => store.getters.color)

    let { id, capColor, textColor } = toRefs(props)

    onMounted(() => {
      const element = document.getElementsByClassName(`cap-${id.value}`)[0]

      // If user has selected color,
      // change color of selected canvas
      watchEffect(() => {
        if (capColor) element.style.backgroundColor = capColor.value

        if (textColor) element.style.color = textColor.value
      })
    })

    // Set text size class based on
    // selected text size
    const textSize = computed(() => {
      let str = ''
      switch (store.getters.text) {
        case 'none':
          str = 'invisible'
          break
        case 'small':
          str = 'xs:text-3xs sm:text-2xs md:text-xs lg:text-sm'
          break
        case 'medium':
          str = 'xs:text-2xs sm:text-xs md:text-sm lg:text-base'
          break
        case 'large':
          str = 'xs:text-xs sm:text-sm md:text-base lg:text-lg'
          break
        default:
          break
      }

      return str
    })

    const alignmentClass = computed(() => {
      const arr = store.getters.alignment

      if (!arr.length)
        return 'justify-center items-center'
      else
        return getAlignment(arr)
    })

    // Set text alignment class based on
    // selected text alignment
    const getAlignment = (arr) => {
      let str = ''
      
      // topleft topright bottomleft bottomright
      if (arr.length > 1) {
        if (arr.includes('top')) {
          if (arr.includes('left'))
            str = 'justify-items-start text-left'
          else
            str = 'justify-items-end text-right'
        }
        else if (arr.includes('bottom')) {
          if (arr.includes('left'))
            str = 'justify-items-start content-end text-left'
          else
            str = 'justify-items-end content-end text-right'
        }
      }
      // top bottom left right
      else {
        switch (arr[0]) {
          case 'top':
            str = 'justify-items-center'
            break
          case 'bottom':
            str = 'content-end'
            break
          case 'left':
            str = 'justify-items-start content-center text-left'
            break
          case 'right':
            str = 'justify-items-end content-center text-right'
            break
          default:
            break
        }
      }

      return str
    }

    // When there's no selected color,
    // activate cap upon click
    const toggleCap = () => {
      store.commit('updateRows', { row: props.row, col: props.col })
    }

    // Cap sizes based on screen sizes
    const widths = {
      xs: { xs: '6', sm: '8', md: '10', lg: '12' },
      sm: { xs: '8', sm: '10', md: '12', lg: '14' },
      md: { xs: '10', sm: '14', md: '16', lg: '18' },
      lg: { xs: '12', sm: '18', md: '20', lg: '22' },
      xl: { xs: '14', sm: '22', md: '24', lg: '26' },
      xxl: { xs: '20', sm: '28', md: '30', lg: '32' },
      xxxl: { xs: '40', sm: '56', md: '72', lg: '90' } // spacebars
    }
    const heights = {
      xs: '6',
      sm: '8',
      md: '10',
      lg: '12'
    }

    const capSizes = { heights, widths }
    
    return {
      toggleCap,
      activeColor,
      textSize,
      alignmentClass,
      ...capSizes
    }
  }
}
</script>
