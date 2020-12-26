import { createApp} from 'vue';
import App from './App.vue';
import router from './router';

import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';


createApp(App).mixin({
    data: () => {
        return {
            get loggedUserName() {
                return localStorage.getItem('nickname');
            }
        }
    }
}).use(router).mount('#app');