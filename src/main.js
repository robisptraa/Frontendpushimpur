import { createApp } from 'vue';
import App from './App.vue';
import router from './routes'; // Pastikan ini mengarah ke file yang benar dan variabel yang diekspor adalah router

const app = createApp(App);
app.use(router); // Gunakan router, bukan routes
app.mount('#app');