<template>
  <div
    :class="[
      'grid content-between min-h-screen bg-gray-500',
      theme === 'dark' ? 'bg-cloud' : 'bg-sun-50'
    ]"
  >
    <Navigation />
    <Menu />
    <Board />
    <Footer />
    <AppLoading />
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'
import Menu from '@/components/Menu.vue'
import Board from '@/components/Board.vue'
import Footer from '@/components/Footer.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Home',
  components: {
    Navigation,
    Menu,
    Board,
    Footer
  },
  setup() {
    const store = useStore()

    const theme = computed(() => store.getters.theme)

    return {
      theme
    }
  }
}
</script>
