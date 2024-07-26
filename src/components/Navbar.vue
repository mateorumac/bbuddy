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
      }
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
    background: #000;
    padding: 20px 10px 30px 10px;
    transition: width 0.3s;
    overflow: hidden;
  
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
        color: #c9b373;
        font-size: 24px;
        cursor: pointer;
        margin-bottom: 20px; // top of the navbar
      }
    }
  
    a {
      display: flex;
      align-items: center;
      font-weight: bold;
      color: #c9b373;
      padding: 10px;
      margin: 10px 0;
      text-decoration: none;
      transition: background 0.3s;
  
      &:hover {
        background: #c9b373;
        color: #000;

        i {
        color: #000; // Change icon color to black on hover
      }
      }
  
      &.router-link-exact-active {
        color: #fff;
      }
  
      i {
        margin-right: 10px;
      }
    }
  }
  </style>
  