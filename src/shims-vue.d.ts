// Typescript에서 Vue 파일을 인식할 수 있도록 선언하는 파일

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>   // <props 타입, emits 타입, 타입 제한x 기본값>
  export default component
}
