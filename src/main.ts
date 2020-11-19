import { createApp } from 'vue'
import store from './store'
import router from './router'
import mitt from 'mitt'

import App from './App.vue'
import './assets/css/reset.css'


const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

export const emitter = mitt();

