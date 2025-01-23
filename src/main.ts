import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios';

loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')



// Spring 서버 URL 설정
axios.defaults.baseURL = 'http://localhost:8080';

