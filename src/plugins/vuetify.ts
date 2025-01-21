// // Styles
// import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/styles'

// // Vuetify
// import { createVuetify } from 'vuetify'

// export default createVuetify(
//   // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
// )


// src/plugins/vuetify.js
// import 'vuetify/styles'; // Vuetify 기본 스타일
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // MDI 아이콘

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
