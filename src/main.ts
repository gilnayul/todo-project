// vue 애플리케이션 진입점

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios';

loadFonts()

createApp(App)    // vue 인스턴스 생성
  .use(vuetify)   // vuetify 애플리케이션 등록
  .mount('#app')  // vue 애플리케이션이 DOM 요소와 연결



// Spring 서버 URL 설정
axios.defaults.baseURL = 'http://localhost:8080';

