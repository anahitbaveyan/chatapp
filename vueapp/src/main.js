// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import socket from './socket'; 

const app = createApp(App);

// Use Vue Router
app.use(router);

// Use the Vue Socket.io plugin
app.config.globalProperties.$socket = socket;

app.mount('#app');
