<template>
  <div id="app">
    <Header></Header>
    <Uploads></Uploads>
  </div>
</template>

<script>
import Uploads from "./components/Uploads.vue";
import Header from "./components/layout/Header";

export default {
  name: "app",
  components: {
    Header,
    Uploads
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0, 0, 0, 0;
}
</style>
