<template>
  <div id="app">
    <header>
      <SearchBar />
    </header>
    <Navbar @toggle="isCollapsed = !isCollapsed" />
    <main :class="{ 'collapsed': isCollapsed }">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="App Logo" class="logo" />
        <p class="app-description">
          Welcome to Bite Buddy, your Recipe and Food Search App! Use the search bar above to find recipes and foods using the Spoonacular API.
        </p>
      </div>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import SearchBar from '@/components/SearchBar.vue';

export default {
  components: {
    Navbar,
    SearchBar
  },
  data() {
    return {
      isCollapsed: false
    };
  }
};
</script>

<style lang="scss">
body {
  overflow-x: hidden;
}
#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fffbe7; // full yellowish background color
  height: 100vh;
  width: 100vw;
  overflow-x: hidden; // hide horizontal overflow
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #000; // black color for header
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #ccc; // silver-ish line for separation
  z-index: 1000;
}

main {
  margin: 0 auto;
  padding: 70px 20px 20px;
  max-width: 1200px;
  transition: margin-left 0.3s;

  &.collapsed {
    margin-left: 200px;
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .logo {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }

    .app-description {
      font-size: 18px;
      margin-bottom: 20px;
      color: #2c3e50; // matching the appealing color
    }
  }
}
</style>
