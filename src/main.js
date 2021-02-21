import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

createApp(App).use(router).mount('#app')
