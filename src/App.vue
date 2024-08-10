<template>
  <div id="app">
    <header>
      <SearchBar :isCollapsed="isCollapsed" @update:isCollapsed="updateIsCollapsed" />
    </header>
    <main :class="{ 'collapsed': isCollapsed }">
      <router-view />
    </main>
    <div class="footer-wrapper">
      <Footer />
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import Footer from '@/components/Footer.vue';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default {
  components: {
    SearchBar,
    Footer
  },
  data() {
    return {
      isCollapsed: true
    };
  },
  methods: {
    updateIsCollapsed(value) {
      this.isCollapsed = value;
    }
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
  padding-top: 70px; 
  transition: margin-left 0.3s;
  margin-left: 0; /* Ensure no space is left on the left side */
}

.collapsed {
  margin-left: 0; /* Reset margin-left to 0 to remove empty space */
}

@media (max-width: 768px) {
  #app {
    margin-left: -21px; /* Adjust to remove the leftover space from the sidebar */
    
  }
  
}

@media (max-width: 480px) {
  #app {
    margin-left: -21px; /* Keep the same adjustment for very small screens */
    
}
}
@media (min-width: 1024px) {
  #app {
    margin-left: -22px; /* Keep the same adjustment for very small screens */
    
}
}
</style>
