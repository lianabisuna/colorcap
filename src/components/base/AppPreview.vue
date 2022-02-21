<template>
  <div
    :class="[
      canvasClass,
      'canvas-preview rounded-md relative border flex items-center justify-center',
      theme === 'dark' ? 'border-gray-200' : 'border-gray-500'
    ]"
  >
    <span
      :class="[
        'text-lg',
        theme === 'dark' ? 'text-sun-50' : 'text-sky-800'
      ]"
    >
      {{ canvasIcon }}
    </span>
  </div>
</template>

<script>
  import { computed, ref, onMounted, watchEffect } from 'vue'
  import { useStore } from 'vuex'

  export default {
    setup() {
      const store = useStore()

      const canvas = computed(() => store.getters.canvas)
      const color = computed(() => store.getters.color)
      let canvasClass = ref(''), canvasIcon = ref('')
      
      onMounted(() => {
        // Detect changes of selected canvas
        // This will change the color, size
        // and icon of canvas preview
        watchEffect(() => {
          const element = document.getElementsByClassName('canvas-preview')[0]
          
          switch(canvas.value) {
            case 'cap':
              canvasClass.value = 'h-8 w-8'
              canvasIcon.value = 'C'
              element.style.color = ''
              element.style.backgroundColor = color.value.color
              break
            case 'board':
              canvasClass.value = 'h-10 w-16'
              canvasIcon.value = 'B'
              element.style.color = ''
              element.style.backgroundColor = color.value.color
              break
            case 'text':
              canvasClass.value = 'h-8 w-8'
              canvasIcon.value = 'T'
              element.style.color = color.value.color
              element.style.backgroundColor = ''
              break
            default:
              break
          }
        })
      })

      const canvasBlock = { canvas, canvasClass, canvasIcon }

      const theme = computed(() => store.getters.theme)

      return {
        ...canvasBlock,
        theme
      }
    }
  }
</script>