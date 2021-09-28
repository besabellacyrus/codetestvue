<template>
  <div id="app">
    <Search />
  </div>
</template>

<script>
import Search from './components/Search.vue'

export default {
  name: 'App',
  components: {
    Search,
  },
};
</script>

<style lang="scss">
body {
  width: 500px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #dfe6e9;
}

</style>
