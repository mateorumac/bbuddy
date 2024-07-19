<template>
  <div id="app">
    <header>
      <SearchBar />
    </header>
    <Navbar :isCollapsed="isCollapsed" @toggle="isCollapsed = !isCollapsed" />
    <main :class="{ 'collapsed': isCollapsed }">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import SearchBar from '@/components/SearchBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    SearchBar,
    Footer
  },
  data() {
    return {
      isCollapsed: false
    };
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
