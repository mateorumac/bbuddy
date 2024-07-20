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
        <!-- <router-link to="/about">
          <i class="fas fa-info-circle"></i>
          <span v-if="!isCollapsed">About</span>
        </router-link> -->
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
      color: #fff;
      padding: 10px;
      margin: 10px 0;
      text-decoration: none;
      transition: background 0.3s;
  
      &:hover {
        background: #c9b373;
      }
  
      &.router-link-exact-active {
        color: #c9b373;
      }
  
      i {
        margin-right: 10px;
      }
    }
  }
  </style>
  