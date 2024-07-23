<template>
  <div id="app">
    <header>
      <SearchBar />
    </header>
    <Navbar :isCollapsed="isCollapsed" @toggle="isCollapsed = !isCollapsed" />
    <main :class="{ 'collapsed': isCollapsed }">
      <router-view />
    </main>
    <div class="footer-wrapper">
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import SearchBar from '@/components/SearchBar.vue';
import Footer from '@/components/Footer.vue';
import '@fortawesome/fontawesome-free/css/all.min.css';


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

html, body {
  margin: 0;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #c9b373; 
  width: 100vw;
  overflow-x: hidden;
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-position: center;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #000;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #c9b373;
  z-index: 1000;
  
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 70px; /* Adjust based on the height of your fixed header */
  transition: margin-left 0.3s;
}

</style>
