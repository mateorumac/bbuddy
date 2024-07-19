<template>
  <div id="app">
    <main :class="{ 'collapsed': isCollapsed }">
      <div class="hero-container">
        <div class="hero-content">
          <img src="@/assets/logo.png" alt="App Logo" class="hero-logo" />
          <h1>Welcome to Bite Buddy!</h1>
          <p>
            Discover delicious recipes and explore a world of culinary possibilities with our easy-to-use recipe search app.
          </p>
          <button @click="$router.push('/about')">Learn More</button>
        </div>
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
  background-color: #fffbe7;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #000;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #ccc;
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

  .hero-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: calc(100vh - 130px);
    padding: 20px;

    .hero-content {
      max-width: 800px;

      .hero-logo {
        width: 120px;
        height: 120px;
        margin-bottom: 20px;
      }

      h1 {
        font-size: 48px;
        margin-bottom: 20px;
        color: #42b983;
      }

      p {
        font-size: 24px;
        margin-bottom: 30px;
        color: #333;
      }

      button {
        padding: 10px 20px;
        font-size: 18px;
        color: #fff;
        background: #42b983;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
        
        &:hover {
          background: #339966;
        }
      }
    }
  }
}
</style>
