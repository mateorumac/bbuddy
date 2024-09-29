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
  background-image: url('@/assets/background1.png');
  background-size: cover;
  background-position: center;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 70px; 
  transition: margin-left 0.3s;
  margin-left: 0; 
}

.collapsed {
  margin-left: 0; 
}

@media (max-width: 768px) {
  #app {
    margin-left: -21px; 
    
  }
  
}

@media (max-width: 480px) {
  #app {
    margin-left: -21px; 
    
}
}
@media (min-width: 1024px) {
  #app {
    margin-left: -22px; 
    
}
}
</style>
