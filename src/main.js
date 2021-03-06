import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCodeBranch, faBrush, faPlus, faCheck, faHamburger, faCloudSun, faCloudMoon, faGhost} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

library.add(faCodeBranch, faBrush, faPlus, faCheck, faHamburger, faCloudSun, faCloudMoon, faGhost)
app.component('font-awesome-icon', FontAwesomeIcon)

// Base Component Registration
const requireComponent = require.context(
  // The relative path of the components folder
  './components/base',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /App[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  app.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

app.use(store).use(router).mount('#app')
