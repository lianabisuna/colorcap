import { createStore } from 'vuex'

export default createStore({
  state: {
    boards: JSON.parse(localStorage.getItem('boards')),
    // Selected keyboard index
    // First in the object as default
    index: 0,
    canvas: 'cap',
    key: '',
    color: {},
    palette: JSON.parse(localStorage.getItem('palette')),
    type: false,
    theme: localStorage.getItem('theme'),
    loading: false
  },



  getters: {
    boards: state => state.boards,
    data: state => {
      return state.boards[state.index]
    },
    rows: state => {
      return state.boards[state.index].rows
    },
    size: state => {
      return state.boards[state.index].alt
    },
    text: state => {
      return state.boards[state.index].text
    },
    alignment: state => {
      return state.boards[state.index].alignment
    },
    boardColor: state => {
      return state.boards[state.index].color
    },
    boardActive: state => {
      return state.boards[state.index].active
    },
    index: state => state.index,
    canvas: state => state.canvas,
    key: state => state.key,
    color: state => state.color,
    palette: state => state.palette,
    colors: state => {
      return state.palette[0].colors
    },
    colorIndex: state => {
      return state.palette[0].index
    },
    type: state => state.type,
    theme: state => state.theme,
    loading: state => state.loading
  },



  mutations: {
    // Toggle canvas
    updateCanvas(state, data) {
      // If canvas selected is the same
      // with current (or was clicked again),
      // selection should be empty
      state.canvas = state.canvas === data ? '' : data

      const rows = state.boards[state.index].rows
      const board = state.boards[state.index]
      
      // If board is selected
      if (data === 'board') {
        // Active or deactivate board
        board.active = !board.active
        // Deactivate all keys
        rows.map(row => {
          for(let x=0; x<row.length; x++) {
            row[x].active = false
          }
        })
      }
      // If cap or text is selected
      else {
        board.active = false
      }
    },


    // Toggle keys/caps
    updateKey(state, data) {
      const rows = state.boards[state.index].rows
      
      // When caps are click while
      // board is active,
      // change selected canvas into cap
      if (state.canvas === 'board') state.canvas = 'cap'

      // Deactivate all keys
      rows.map(row => {
        for(let x=0; x<row.length; x++) {
          row[x].active = false
        }
      })

      // User selected same key
      if (state.key === data) {
        state.key = ''
        rows.map(row => {
          for(let x=0; x<row.length; x++) {
            if (row[x].type === data) row[x].active = false
          }
        })
      }
      // User selected another key
      else {
        state.key = data

        // User did NOT select "all" keys
        if (data !== 'all') {
          rows.map(row => {
            for(let x=0; x<row.length; x++) {
              if (row[x].type === data) row[x].active = true
            }
          })
        }
        // User selected "all" keys
        else {
          rows.map(row => {
            for(let x=0; x<row.length; x++) {
              row[x].active = !row[x].active
            }
          })
        }
      }

      // Deselect color
      state.color = {}

      // Overwrite local storage
      state.boards[state.index].rows = rows
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },


    // Toggle color
    updateColor(state, data) {
      const rows = state.boards[state.index].rows
      const board = state.boards[state.index]

      // Adds object properties "number" and "color"
      state.color = data

      // Check if user board or caps
      // before selecting a color
      if (state.canvas === 'board') {
        // Update board color
        board.color = state.color?.color
        board.active = false
      }
      else {
        // Update selected cap or text color
        rows.map(row => {
          for(let x=0; x<row.length; x++) {
            if (row[x].active) {
              row[x][`${state.canvas}Color`] = state.color?.color
              row[x].active = false
            }
          }
        })
      }

      // Deselect active keys
      state.key = ''

      // Overwrite local storage
      state.boards[state.index].layout = rows
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },


    // Toggle cap/text
    updateRows(state, {row, col}) {
      const rows = state.boards[state.index].rows
      const board = state.boards[state.index]
      
      if (state.canvas === 'board') state.canvas = 'cap'
      board.active = false

      state.key = ''
      const cap = rows[row][col]

      // Check if user selected color
      // before clicking a cap
      if (state.color?.number) {
        // Change cap color
        cap[`${state.canvas}Color`] = state.color.color
      }
      else {
        // Activate cap
        cap.active = !cap.active
      }
      
      // Overwrite local storage
      state.boards[state.index].rows = rows
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },


    // Toggle board
    updateBoard(state) {
      const board = state.boards[state.index]
      state.canvas = 'board'

      const rows = state.boards[state.index].rows

      // Deactivate all keys first
      rows.map(row => {
        for(let x=0; x<row.length; x++) {
          row[x].active = false
        }
      })
      
      // Check if user selected color
      // before clicking the board
      if (state.color?.number) {
        // Change cap color
        board.color = state.color.color
      }
      else {
        // Activate cap
        board.active = !board.active
        state.canvas = 'board'
      }
      
      // Overwrite local storage
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },


    // Toggle text alignment
    setAlignment(state, data) {
      const alignment = state.boards[state.index].alignment

      const index = alignment.findIndex(val => val === data )
      let key = null

      const selectAlignment = () => {
        switch (data) {
          case 'top':
            key = alignment.findIndex(val => val === 'bottom' )
            if (key >= 0) alignment.splice(key, 1)
            break
          case 'bottom':
            key = alignment.findIndex(val => val === 'top' )
            if (key >= 0) alignment.splice(key, 1)
            break
          case 'left':
            key = alignment.findIndex(val => val === 'right' )
            if (key >= 0) alignment.splice(key, 1)
            break
          case 'right':
            key = alignment.findIndex(val => val === 'left' )
            if (key >= 0) alignment.splice(key, 1)
            break
          default:
            break
        }

        alignment.push(data)
      }

      // Check if alignment is NOT selected
      if (index < 0)
        selectAlignment()
      // Remove the item
      else
       alignment.splice(index, 1)
      
      // Overwrite local storage
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },


    // Toggle text size
    setTextSize(state, data) {
      state.boards[state.index].text = data

      // Overwrite local storage
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },


    // Change palette colors
    updatePalette(state, data) {
      let colors = state.palette[0].colors

      let index = colors.findIndex(c => c.color === data)

      if (index < 0) {
        colors[state.palette[0].index].color = data
        
        if (state.palette[0].index < 4)
          state.palette[0].index++
        else
          state.palette[0].index = 0
      }

      // Overwrite local storage
      localStorage.setItem('palette', JSON.stringify(state.palette))
    },


    // Deselect all board and cap
    deselect(state) {
      // Deselect board
      state.boards[state.index].active = false

      // Deselect cap
      state.boards[state.index].rows.map(row => {
        for(let x=0; x<row.length; x++) {
          row[x].active = false
        }
      })
    },


    // Restart or clean board colors
    restartBoard() {
      localStorage.removeItem('boards')
    },


    // Toggle typing or edit mode
    toggleMode(state) {
      state.type = !state.type
    },


    // Set to light or dark mode/theme
    setTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', state.theme)
    },


    // Change board size
    toggleBoardSize(state, size) {
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
        {
          name: 'Mini Keyboard',
          alt: '60',
          active: false,
          size: 60,
          keys: 61,
          color: '',
          layout: 'qwerty',
          text: 'small',
          alignment: [],
          rows: [
            [
              { id: 1, textColor: '', capColor: '', active: false, type: '', text: 'Esc', width: 'xs' },
              { id: 2, textColor: '', capColor: '', active: false, type: 'numeric', text: '1 !', width: 'xs' },
              { id: 3, textColor: '', capColor: '', active: false, type: 'numeric', text: '2 @', width: 'xs' },
              { id: 4, textColor: '', capColor: '', active: false, type: 'numeric', text: '3 #', width: 'xs' },
              { id: 5, textColor: '', capColor: '', active: false, type: 'numeric', text: '4 $', width: 'xs' },
              { id: 6, textColor: '', capColor: '', active: false, type: 'numeric', text: '5 %', width: 'xs' },
              { id: 7, textColor: '', capColor: '', active: false, type: 'numeric', text: '6 ^', width: 'xs' },
              { id: 8, textColor: '', capColor: '', active: false, type: 'numeric', text: '7 &', width: 'xs' },
              { id: 9, textColor: '', capColor: '', active: false, type: 'numeric', text: '8 *', width: 'xs' },
              { id: 10, textColor: '', capColor: '', active: false, type: 'numeric', text: '9 (', width: 'xs' },
              { id: 11, textColor: '', capColor: '', active: false, type: 'numeric', text: '0 )', width: 'xs' },
              { id: 12, textColor: '', capColor: '', active: false, type: '', text: '- _', width: 'xs' },
              { id: 13, textColor: '', capColor: '', active: false, type: '', text: '= +', width: 'xs' },
              { id: 14, textColor: '', capColor: '', active: false, type: '', text: '&larr;', width: 'lg' }
            ],
            [
              { id: 15, textColor: '', capColor: '', active: false, type: '', text: 'Tab', width: 'md' },
              { id: 16, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'Q', width: 'xs' },
              { id: 17, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'W', width: 'xs' },
              { id: 18, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'E', width: 'xs' },
              { id: 19, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'R', width: 'xs' },
              { id: 20, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'T', width: 'xs' },
              { id: 21, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'Y', width: 'xs' },
              { id: 22, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'U', width: 'xs' },
              { id: 23, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'I', width: 'xs' },
              { id: 24, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'O', width: 'xs' },
              { id: 25, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'P', width: 'xs' },
              { id: 26, textColor: '', capColor: '', active: false, type: '', text: '[ {', width: 'xs' },
              { id: 27, textColor: '', capColor: '', active: false, type: '', text: '] }', width: 'xs' },
              { id: 28, textColor: '', capColor: '', active: false, type: '', text: '&#92; |', width: 'md' }
            ],
            [
              { id: 29, textColor: '', capColor: '', active: false, type: '', text: 'CapsLk', width: 'lg' },
              { id: 30, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'A', width: 'xs' },
              { id: 31, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'S', width: 'xs' },
              { id: 32, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'D', width: 'xs' },
              { id: 33, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'F', width: 'xs' },
              { id: 34, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'G', width: 'xs' },
              { id: 35, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'H', width: 'xs' },
              { id: 36, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'J', width: 'xs' },
              { id: 37, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'K', width: 'xs' },
              { id: 38, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'L', width: 'xs' },
              { id: 39, textColor: '', capColor: '', active: false, type: '', text: '; :', width: 'xs' },
              { id: 40, textColor: '', capColor: '', active: false, type: '', text: `' "`, width: 'xs' },
              { id: 41, textColor: '', capColor: '', active: false, type: '', text: 'Enter', width: 'xl' }
            ],
            [
              { id: 42, textColor: '', capColor: '', active: false, type: '', text: 'Shift', width: 'xl' },
              { id: 43, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'Z', width: 'xs' },
              { id: 44, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'X', width: 'xs' },
              { id: 46, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'C', width: 'xs' },
              { id: 47, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'V', width: 'xs' },
              { id: 48, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'B', width: 'xs' },
              { id: 49, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'N', width: 'xs' },
              { id: 50, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'M', width: 'xs' },
              { id: 51, textColor: '', capColor: '', active: false, type: '', text: ', <', width: 'xs' },
              { id: 52, textColor: '', capColor: '', active: false, type: '', text: '. >', width: 'xs' },
              { id: 53, textColor: '', capColor: '', active: false, type: '', text: '/ ?', width: 'xs' },
              { id: 54, textColor: '', capColor: '', active: false, type: '', text: 'Shift', width: 'xxl' }
            ],
            [
              { id: 55, textColor: '', capColor: '', active: false, type: '', text: 'Ctrl', width: 'sm' },
              { id: 56, textColor: '', capColor: '', active: false, type: '', text: 'Win', width: 'sm' },
              { id: 57, textColor: '', capColor: '', active: false, type: '', text: 'Alt', width: 'sm' },
              { id: 58, textColor: '', capColor: '', active: false, type: '', text: '', width: 'xxxl' },
              { id: 59, textColor: '', capColor: '', active: false, type: '', text: '&#9647;', width: 'sm' },
              { id: 60, textColor: '', capColor: '', active: false, type: '', text: 'Alt', width: 'sm' },
              { id: 61, textColor: '', capColor: '', active: false, type: '', text: 'Fn', width: 'sm' },
              { id: 62, textColor: '', capColor: '', active: false, type: '', text: 'Ctrl', width: 'sm' }
            ]
          ]
        },
        // 40%
        {
          name: '40% Keyboard',
          alt: '40',
          active: false,
          size: 40,
          keys: 40,
          color: '',
          layout: 'qwerty',
          text: 'small',
          alignment: [],
          rows: [
            [
              { id: 1, textColor: '', capColor: '', active: false, type: '', text: 'Esc', width: 'xs' },
              { id: 16, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'Q', width: 'xs' },
              { id: 17, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'W', width: 'xs' },
              { id: 18, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'E', width: 'xs' },
              { id: 19, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'R', width: 'xs' },
              { id: 20, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'T', width: 'xs' },
              { id: 21, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'Y', width: 'xs' },
              { id: 22, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'U', width: 'xs' },
              { id: 23, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'I', width: 'xs' },
              { id: 24, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'O', width: 'xs' },
              { id: 25, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'P', width: 'xs' },
              { id: 30, textColor: '', capColor: '', active: false, type: '', text: '&larr;', width: 'lg' },
            ],
            [
              { id: 15, textColor: '', capColor: '', active: false, type: '', text: 'Tab', width: 'md' },
              { id: 30, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'A', width: 'xs' },
              { id: 31, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'S', width: 'xs' },
              { id: 32, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'D', width: 'xs' },
              { id: 33, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'F', width: 'xs' },
              { id: 34, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'G', width: 'xs' },
              { id: 35, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'H', width: 'xs' },
              { id: 36, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'J', width: 'xs' },
              { id: 37, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'K', width: 'xs' },
              { id: 38, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'L', width: 'xs' },
              { id: 41, textColor: '', capColor: '', active: false, type: '', text: 'Enter', width: 'xl' }
            ], // 222
            [
              { id: 42, textColor: '', capColor: '', active: false, type: '', text: 'Shift', width: 'xl' },
              { id: 43, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'Z', width: 'xs' },
              { id: 44, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'X', width: 'xs' },
              { id: 46, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'C', width: 'xs' },
              { id: 47, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'V', width: 'xs' },
              { id: 48, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'B', width: 'xs' },
              { id: 49, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'N', width: 'xs' },
              { id: 50, textColor: '', capColor: '', active: false, type: 'alphabet', text: 'M', width: 'xs' },
              { id: 51, textColor: '', capColor: '', active: false, type: '', text: ', <', width: 'xs' },
              { id: 42, textColor: '', capColor: '', active: false, type: '', text: 'Shift', width: 'lg' },
              { id: 61, textColor: '', capColor: '', active: false, type: '', text: 'Fn', width: 'sm' },
            ],
            [
              { id: 55, textColor: '', capColor: '', active: false, type: '', text: 'Ctrl', width: 'sm' },
              { id: 56, textColor: '', capColor: '', active: false, type: '', text: 'Win', width: 'sm' },
              { id: 57, textColor: '', capColor: '', active: false, type: '', text: 'Alt', width: 'sm' },
              { id: 58, textColor: '', capColor: '', active: false, type: '', text: '', width: 'xxxl' },
              { id: 60, textColor: '', capColor: '', active: false, type: '', text: 'Alt', width: 'sm' },
              { id: 62, textColor: '', capColor: '', active: false, type: '', text: 'Ctrl', width: 'sm' }
            ]
          ]
        }
      ]

      let newBoard = boardData.filter(board => {
        return board.alt === size
      })

      if (newBoard.length) {
        localStorage.setItem('boards', JSON.stringify(newBoard))
        window.location.reload()
      }
    },


    // Toggle loading
    setLoading(state, data) {
      state.loading = data
    }
  },


  
  actions: {
    
  },
  modules: {
  }
})
