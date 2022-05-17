import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Parse from 'parse'
import router from './router'
import store from "./store";
import firebaseMessaging from "@/common/firebase";

// parse error when using the 3 keys together :/
Parse.initialize("myAppId", "jsKey");  // can use masterKey but should remove jsKey in parse-server to work....
Parse.serverURL = 'http://localhost:1337/api';
Parse.masterKey = "masterKey";

const app = createApp(App).use(store).use(router);
app.config.globalProperties.$messaging = firebaseMessaging;
app.mount("#app");
