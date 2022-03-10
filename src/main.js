import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Parse from 'parse'
Parse.initialize("cnmsp", "master");
Parse.serverURL = 'http://localhost:1337/parse'

createApp(App).mount('#app')

new Parse.Object("Test", { "text": "testing" }).save()
    .then(function (obj) {
        console.log("Success", obj);
    })
    .catch(function (e) {
        alert("Error saving test object!" + e.message);
    });