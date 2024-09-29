<template>
  <div class="header-container">
    <div class="search-container" @click.stop="closeDropdown" ref="searchContainer">
      <img src="@/assets/logo.png" alt="App Logo" class="logo" @click="goHome" @mouseover="spinLogo" @mouseleave="stopSpinLogo" :class="{ spinning: isSpinning }" />
      <input type="text" placeholder="Search for recipes or ingredients..." v-model="searchQuery" @input="searchRecipes" />
      <div v-if="recipes.length" class="dropdown">
        <ul>
          <li v-for="recipe in limitedRecipes" :key="recipe.id" @click="selectRecipe(recipe.id)">
            {{ recipe.title }}
          </li>
        </ul>
        <button v-if="recipes.length > 8" class="show-all-results-button" @click="showAllResults">Show All Results</button>
      </div>
      <button class="collapse-btn" @click="toggleNav">
        <span v-if="isCollapsed">☰</span>
        <span v-else>✖</span>
      </button>
    </div>
    <nav class="navbar" :class="{ 'show': !isCollapsed }">
      <router-link to="/" @click="closeNav">Home</router-link>
      <router-link to="/SmartSearch" @click="closeNav">Grocery Search</router-link>
      <router-link to="/meal-planner" @click="closeNav">Meal Planner</router-link>
      <router-link to="/recipe-of-the-day-and-tips" @click="closeNav">Inspire Me</router-link>
    </nav>
  </div>
</template>

<script>
import apiService from '@/apiService';

export default {
  data() {
    return {
      searchQuery: '',
      recipes: [],
      loading: false,
      error: null,
      isSpinning: false,
      isCollapsed: true
    };
  },
  computed: {
    limitedRecipes() {
      return this.recipes.slice(0, 5);
    }
  },
  methods: {
    async searchRecipes() {
      if (this.searchQuery.length < 3) {
        this.recipes = [];
        return;
      }
      this.loading = true;
      try {
        const response = await apiService.searchRecipes(this.searchQuery);
        this.recipes = response.data.results || response.data;
      } catch (error) {
        this.error = "There was an error fetching the results.";
      } finally {
        this.loading = false;
      }
    },
    closeDropdown() {
      this.recipes = [];
    },
    selectRecipe(id) {
      this.getRecipeDetails(id);
      this.closeDropdown();
      this.searchQuery = '';
    },
    getRecipeDetails(id) {
      this.$router.push({ name: 'RecipeDetails', params: { id } });
    },
    showAllResults() {
      this.$router.push({ name: 'AllResults', query: { searchQuery: this.searchQuery } });
      this.closeDropdown();
    },
    goHome() {
      this.$router.push({ name: 'home' });
    },
    spinLogo() {
      this.isSpinning = true;
    },
    stopSpinLogo() {
      this.isSpinning = false;
    },
    toggleNav() {
      this.isCollapsed = !this.isCollapsed;
    },
    closeNav() {
      this.isCollapsed = true;
    },
    handleClickOutside(event) {
      if (this.$refs.searchContainer && !this.$refs.searchContainer.contains(event.target)) {
        this.closeNav();
        this.closeDropdown();
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: #f8f5e1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #8c8c8c;
  z-index: 1000;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex: 1;
  margin-left: 27%;

  .logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
    transition: transform 0.5s ease;

    &.spinning {
      transform: rotate(360deg);
    }
  }

  input[type="text"] {
    flex: 1;
    max-width: 400px;
    padding: 10px 15px;
    border: 1px solid #8c8c8c;
    border-radius: 30px;
    font-size: 16px;
    outline: none;
    background-color: #f0f0e6;
    color: #2c2c2c;

    &::placeholder {
      color: #888;
    }
  }

  .collapse-btn {
    display: none;
    background: none;
    border: none;
    color: #c9b373;
    font-size: 24px;
    cursor: pointer;
    margin-left: -10px;
  }

  .dropdown {
    position: absolute;
    top: 105%;
    left: 55%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 430px;
    background: #f8f5e1;
    border: 1px solid #c9b373;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    overflow-y: hidden;
    overflow-x: hidden;
    padding: 0;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        padding: 10px;
        cursor: pointer;
        background: #f8f5e1;
        color: #2c2c2c;
        border-bottom: 1px solid #c9b373;
        &:hover {
          background: #c9b373;
          color: #2c2c2c;
        }
      }
    }

    .show-all-results-button {
  width: 100%;
  padding: 12px 24px; 
  background: #c9b373;
  color: #000;
  border: none;
  cursor: pointer;
  font-family: 'Lora', serif;
  font-size: 18px;
  
  text-transform: uppercase;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background: #bfa660;
  }
}
  }
}

.navbar {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 90px;
  right: 20px;
  background: #f8f5e1;
  border: 1px solid #c9b373;
  border-radius: 4px;
  padding: 20px; 
  width: 180px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-right: 20px;

  a {
    color: #2c2c2c;
    text-decoration: none;
    padding: 15px; 
    text-align: center;
    font-size: 18px; 
    border-bottom: 1px solid #c9b373;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: #c9b373;
      color: #2c2c2c;
    }

    &:visited {
      color: #2c2c2c;
    }
  }

  &.show {
    display: flex;
  }
}

@media (max-width: 768px) {
  .search-container {
    flex: 1;
    margin-left: 0;

    .collapse-btn {
      display: block;
      padding-right: 20px;
      padding-left: 20px;
      margin-right: 12px;
    }
    .dropdown {
      left: 47%;
      transform: translateX(-50%);
      width: 70%;
      max-width: 350px;
    }
  }

  .navbar {
    a {
      color: #2c2c2c;
      text-align: center;
      padding: 10px;
      text-decoration: none;
      border-bottom: 1px solid #c9b373;

      &:visited {
        color: #2c2c2c;
      }
    }
  }
}

@media (max-width: 480px) {
  .navbar {
    a {
      font-size: 14px;
      padding: 8px;
    }
  }
}

@media (min-width: 769px) {
  .navbar {
    display: flex;
    margin-left: auto;
    flex-direction: row;
    position: static;
    top: auto;
    right: auto;
    background: none;
    border: none;
    padding-right: 50px;
    width: auto;
    box-shadow: none;

    a {
      text-align: left;
      padding: 0 15px;
      color: #2c2c2c;
      font-weight: bold;
      border-bottom: none;
      background-color: transparent;
      position: relative;

      &:hover {
        background-color: transparent;
        color: #c9b373;
      }

      &:hover::after {
        transform: scaleX(1);
      }

      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: -5px;
        left: 0px;
        right: -5px;
        width: 100%;
        height: 2px;
        background-color: #c9b373;
        transform: scaleX(0);
        transform-origin: bottom left;
        transition: transform 0.3s ease;
      }

      &:visited {
        color: #2c2c2c;
      }
    }
  }
}
</style>