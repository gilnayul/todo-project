<template>
  <v-app>
    <v-main>
      <BaseSection />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseSection from './components/BaseSection.vue';
// import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',

  components: {
    BaseSection,
  },

  data() {
    return {
      //
    }
  },
})
</script>
