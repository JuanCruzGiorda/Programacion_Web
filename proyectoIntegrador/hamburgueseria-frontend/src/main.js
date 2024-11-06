import { createApp } from 'vue';
import App from './App.vue';
import 'materialize-css/dist/css/materialize.min.css';
import router from './router';

// Crear la aplicación Vue
const app = createApp(App);

// Usar el router
app.use(router);

// Montar la aplicación en el elemento con id 'app'
app.mount('#app');
