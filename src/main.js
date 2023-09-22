import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/reset.css'
import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"

const pinia = createPinia();
const app = createApp(App)

if(localStorage.getItem("state")){
    pinia.state.value = JSON.parse(localStorage.getItem("state"));
}

watch (
    pinia.state,
    (state) => {
        localStorage.setItem("state", JSON.stringify(state));
    }, 
    { deep: true }
);

app.use(pinia);
app.use(router);

app.mount('#app');
