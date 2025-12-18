import { createApp } from 'vue'
import App from './app.vue'
import Notifications from '@kyvg/vue3-notification'
import velocity from 'velocity-animate'
import router from './app/router'
import { vue3Debounce } from 'vue-debounce'

const app = createApp(App)

app.use(router)
app.use(Notifications, { velocity })
app.directive('debounce', vue3Debounce({ lock: true }))
app.mount('#app')
