<template>
  <MainPage />
</template>

<script>
import MainPage from './components/MainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage,
  }
}
</script>

<style>
body {
  height: 100%;
  margin: 0;
  background-color: #EEE;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #272727;
  box-sizing: border-box;
}
</style>
