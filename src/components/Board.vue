<template>
  <div class="flex flex-grow mb-10 overflow-x-auto md:overflow-x-hidden overflow-y-hidden px-5">
    <div class="flex justify-center flex-col mx-auto">
      <!-- Cursor -->
      <div class="cursor-color"></div>

      <!-- Board -->
      <div
        id="board"
        :class="[
          activeColor?.number ? 'cursor-brush' : 'cursor-pointer',
          'board', { 'bg-gray-100': !boardColor },
          boardActive ? 'border-sky-800' : 'border-gray-300',
          'p-2 sm:p-3 md:-4 lg:p-5 border-2 rounded md:rounded-md shadow'
        ]"
        @mouseover="hoverBoard = true"
        @mouseleave="hoverBoard = false"
        @click.stop="updateBoard"
      >
        <!-- Wrapper Y -->
        <div class="space-y-0.5 md:space-y-1">
          <!-- Wrapper X / Row -->
          <div
            v-for="(row, r) in rows"
            :key="r"
            class="flex justify-between space-x-0.5 md:space-x-1"
          >
            <!-- Caps -->
            <Cap
              v-for="(cap, c) in row"
              :key="c"
              :id="cap.id"
              :active="cap.active"
              :cap-color="cap.capColor"
              :text-color="cap.textColor"
              :width="cap.width"
              :text="cap.text"
              :row="r"
              :col="c"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed, onMounted, ref, watchEffect } from 'vue'
  import Cap from './Cap.vue'

  export default {
    name: 'Board',
    components: {
      Cap
    },
    setup() {
      const store = useStore()

      // Rows and cols are used to distinguish each cap
      // However, each cap was given an ID in the update
      // Thus, ID is now used instead of rows and cols
      // Note: Rows and cols are still in use
      const rows = computed(() => store.getters.rows)

      const activeColor = computed(() => store.getters.color)
      const boardColor = computed(() => store.getters.boardColor)

      const hoverBoard = ref(false)
      
      onMounted(() => {
        // This element is the little circle
        // that is displayed along with the
        // brush cursor
        const cursor = document.querySelector('.cursor-color')

        // This will allow the little circle
        // to move along with the brush cursor
        document.addEventListener('mousemove', e => {
          cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
        })

        // If the user hovers on the board
        // both cursors will be shown
        // But if the hover is outside the board
        // both cursors will be hidden and
        // changed into the default one
        watchEffect(() => {
          if (hoverBoard.value && activeColor.value?.number)
            cursor.classList.remove('invisible')
          else
            cursor.classList.add('invisible')
        })

        // Change the board color
        watchEffect(() => {
          const element = document.getElementsByClassName('board')[0]
          element.style.backgroundColor = boardColor.value
        })
      })

      const cursorBlock = { rows, activeColor, hoverBoard }


      const boardActive = computed(() => store.getters.boardActive)

      // Activate/toggle the board
      const updateBoard = () => {
        store.commit('updateBoard')
      }

      const boardBlock = { boardColor, updateBoard, boardActive }

      return {
        ...cursorBlock,
        ...boardBlock
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
