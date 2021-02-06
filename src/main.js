import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/utils/http'

import './plugins'

const app = createApp(App)

app.provide('http', http)

app.use(store)
    .use(router)
    .use(ElementPlus, { size: 'small' })
    .mount('#app')
