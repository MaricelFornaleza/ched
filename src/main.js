import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Parse from 'parse'
import router from './router'

// parse error when using the 3 keys together :/
Parse.initialize("myAppId", "jsKey", "masterKey");  // can use masterKey but should remove jsKey in parse-server to work....
Parse.serverURL = 'http://localhost:1337/api';
Parse.masterKey = "masterKey";

createApp(App).use(router).mount('#app')
