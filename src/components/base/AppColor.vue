<template>
  <button
    :class="[
      theme === 'dark'
          ? { 'border-sun-50': active }
          : { 'border-sky-800': active },
      'h-5 w-5 lg:h-6 lg:w-6 rounded-full border-2 hover:border-sky-200 flex justify-center items-center',
      `color-${id}`
    ]"
    v-bind="$attrs"
    >
      <span
        v-if="active"
        :class="[ 'text-xs' , theme === 'dark' ? 'text-sun-50' : 'text-sky-800' ]"
      >
        <font-awesome-icon icon="check"></font-awesome-icon>
      </span>
    </button>
</template>

<script>
  import { onMounted, watchEffect, computed } from 'vue'
  import { useStore } from 'vuex'

  export default {
    props: {
      id: { type: Number, default: null },
      active: { type: Boolean, default: false },
      color: { type: String, default: '' }
    },

    setup(props) {
      onMounted(() => {
        // There's a maximum of 5 colors in the palette
        // Each color element is given a class with unique ID
        // Example: color-1, color-2, color-3
        // The ID is from the color palette's data with
        // the corresponding hex
        watchEffect(() => {
          const element = document.getElementsByClassName(`color-${props.id}`)[0]
          // The class given to the color element
          // to determine their color 
          element.style.backgroundColor = props.color
        })
      })

      const store = useStore()

      const theme = computed(() => store.getters.theme)

      return { theme }
    }
  }
</script>