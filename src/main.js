<<<<<<< HEAD
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

createApp(App).use(store).use(router).mount("#app");
=======
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Parse from 'parse'
import router from './router'



Parse.initialize("cnmsp", "master");
Parse.serverURL = 'http://localhost:1337/parse'

createApp(App).use(router).mount('#app')
>>>>>>> f4d48e83982bc2872ada99abb37290858786a83e
