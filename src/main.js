import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './assets/style/main.css';
import App from './App.vue';
import router from './router';
import store from './store';



let app = createApp(App);

app.config.globalProperties.window = window;

app.component('font-awesome-icon', FontAwesomeIcon)
.use(store)
.use(router)
.mount('#app');
