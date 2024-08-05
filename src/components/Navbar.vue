<template>
    <nav :class="{ 'collapsed': isCollapsed }">
      <div class="nav-content">
        <button class="collapse-btn" @click="toggleNav">
          <span v-if="isCollapsed">☰</span>
          <span v-else>✖</span>
        </button>
        <router-link to="/">
          <i class="fas fa-home"></i>
          <span v-if="!isCollapsed">Home</span>
        </router-link>
        <router-link to="/SmartSearch">
          <i class="fas fa-search"></i>
        <span v-if="!isCollapsed">Grocery Search</span>
        </router-link>
         <router-link to="/meal-planner">
          <i class="fas fa-clipboard-list"></i>
          <span v-if="!isCollapsed">Meal Planner</span>
        </router-link> 
        <router-link to="/recipe-of-the-day-and-tips">
        <i class="fas fa-lightbulb"></i>
        <span v-if="!isCollapsed">Inspire me</span>
      </router-link>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isCollapsed: true
      };
    },
    methods: {
      toggleNav() {
        this.isCollapsed = !this.isCollapsed;
      },
      
  },
  mounted() {
    // Add event listener to handle clicks outside the navbar
    window.addEventListener('click', this.handleOutsideClick);
  },
  beforeDestroy() {
    // Remove event listener when the component is destroyed
    window.removeEventListener('click', this.handleOutsideClick);
  }
};
</script>
  
  <style lang="scss">
 nav {
  position: fixed;
  top: 50px;
  left: 0;
  height: calc(100% - 50px);
  width: 200px;
  background: #000; // Match the dark background color
  padding: 20px 10px 30px 10px;
  transition: width 0.3s;
  overflow: hidden;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); // Add subtle shadow for depth

  &.collapsed {
    width: 50px;

    .nav-content {
      flex-direction: column;

      a {
        justify-content: center;
      }
    }
  }

  .nav-content {
    display: flex;
    flex-direction: column;
    height: 100%;

    .collapse-btn {
      align-self: flex-start;
      background: none;
      border: none;
      color: #c9b373; // Gold color for contrast
      font-size: 24px;
      cursor: pointer;
      margin-bottom: 20px;
      margin-left: -10px; // top of the navbar
    }
  }

  a {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #f8f5e1; // Light text color for readability
    padding: 10px;
    margin: 10px 0;
    text-decoration: none;
    transition: background 0.3s, color 0.3s;

    &:hover {
      background: #c9b373; // Highlight background color on hover
      color: #000; // Dark text color on hover

      i {
        color: #000; // Change icon color to match text color on hover
      }
    }

    &.router-link-exact-active {
      color: #fff; // Active link color
    }

    i {
      margin-right: 10px;
      color: #c9b373; // Initial icon color
    }
  }
}

  </style>
  