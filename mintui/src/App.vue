<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "app",
  components: {
    Home
  }
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  font-size: 22px;
  font-weight: bold;
}
</style>
