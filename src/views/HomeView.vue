<template>
  <div id="app">
    <header>
      <div class="search-container">
        <input type="text" placeholder="Search for recipes..." v-model="searchQuery" @keyup.enter="searchRecipes" />
      </div>
    </header>
    <Navbar />
    <main :class="{ 'collapsed': isCollapsed }">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="App Logo" class="logo" />
        <p class="app-description">
          Welcome to Bite Buddy, your Recipe and Food Search App! Use the search bar above to find recipes and foods using the Spoonacular API.
        </p>
      </div>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      searchQuery: '',
      isCollapsed: false
    };
  },
  methods: {
    searchRecipes() {
      // Add your search logic here
      console.log(`Searching for: ${this.searchQuery}`);
    }
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

  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;

    input[type="text"] {
      width: 60%;
      max-width: 500px;
      padding: 10px 15px;
      border: 1px solid #ccc;
      border-radius: 30px;
      font-size: 16px;
      outline: none;
    }
  }
}

main {
  margin-left: 200px;
  padding: 70px 20px 20px;
  transition: margin-left 0.3s;

  &.collapsed {
    margin-left: 50px;
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

    .food-icons {
      display: flex;
      justify-content: center;
      font-size: 30px;

      i {
        margin: 0 10px;
        color: #42b983;
      }
    }
  }
}
</style>
