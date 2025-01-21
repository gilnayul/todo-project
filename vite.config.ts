import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['vue-dndrop'], // vue-dndrop을 Vite의 디펜던시 빌드 대상으로 포함
  },
});