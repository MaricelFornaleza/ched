import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Parse from 'parse'
import router from './router'
import LoadScript from 'vue-plugin-load-script';



Parse.initialize("cnmsp", "master");
Parse.serverURL = 'http://localhost:1337/parse'

createApp(App).use(router, LoadScript).mount('#app')
