import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
		vue(),
		vuetify({ autoImport: true }),
	],
  optimizeDeps: {
    include: ['vue-dndrop'], // vue-dndrop을 Vite의 디펜던시 빌드 대상으로 포함
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // ✅ API 요청을 백엔드로 프록시
        changeOrigin: true,
        secure: false,
      },
    },
  },
});