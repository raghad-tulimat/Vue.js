import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import { createPinia } from 'pinia'

const emitter = mitt()

createApp(App).use(createPinia()).provide('emitter', emitter).use(router).mount('#root')   

