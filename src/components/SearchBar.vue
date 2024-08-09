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
      isCollapsed: true // Controls whether the navbar is collapsed or not
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
      this.searchQuery = ''; // Clear the search query after selecting an option
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
      this.isCollapsed = !this.isCollapsed; // Toggle the navbar visibility
    },
    closeNav() {
      this.isCollapsed = true; // Close the navbar
    },
    handleClickOutside(event) {
      if (this.$refs.searchContainer && !this.$refs.searchContainer.contains(event.target)) {
        this.closeNav(); // Close the dropdown if clicking outside
        this.closeDropdown(); // Close the recipe dropdown as well
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
  background: #000;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex: 1;
  margin-left: 24%; /* Adjust this value to bring the search bar and logo more to the right */
  
  .logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
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
    border: 1px solid #c9b373;
    border-radius: 30px;
    font-size: 16px;
    outline: none;
    background-color: #2c2c2c;
    color: #f8f5e1;

    &::placeholder {
      color: #888;
    }
  }

  .collapse-btn {
    display: none; /* Initially hidden, only shown in mobile view */
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
    left: 53.8%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 430px;
    background: #000;
    border: 1px solid #444;
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
        background: #000;
        color: #f8f5e1;
        border-bottom: 1px solid #444;
        &:hover {
          background: #c9b373;
          color: #2c2c2c;
        }
      }
    }

    .show-all-results-button {
      width: 100%;
      padding: 10px;
      background: #c9b373;
      color: #000;
      border: none;
      cursor: pointer;
      font-family: 'Lora', serif;
      font-size: 16px;
      margin: 0;
      border-top: 1px solid #444;
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
  top: 90px; /* Position the navbar dropdown further down */
  right: 20px; /* Margin from the right side */
  background: #000;
  border: 1px solid #c9b373;
  border-radius: 4px;
  padding: 10px;
  width: 150px; /* Less wide for mobile view */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow for a better look */
  margin-right: 20px; /* Added margin from the screen edge */

  a {
    color: #c9b373;
    text-decoration: none; /* Remove underline from links */
    padding: 10px;
    text-align: center; /* Center-align text in mobile view */
    border-bottom: 1px solid #444;

    &:hover {
      background-color: #c9b373;
      color: #2c2c2c;
    }

    &:visited {
      color: #f8f5e1; /* Ensure visited links don't turn purple */
    }
  }

  &.show {
    display: flex;
  }
}

@media (max-width: 768px) {
  .search-container {
    flex: 1;
    margin-left: 0; /* Reset the margin for responsiveness */

    .collapse-btn {
      display: block; /* Show the burger button in mobile view */
      padding-right: 20px;
      padding-left: 20px; /* Ensure the button has enough padding in mobile view */
      margin-right: 12px; /* Add more margin to separate it from the screen edge */
    }
    .dropdown {
    left: 47%;
    transform: translateX(-50%);
    width: 70%;
    max-width: 350px; }
  }

  .navbar {
    a {
      color: #f8f5e1; /* Set text color to white-ish for nav links in mobile view */
      text-align: center;
      padding: 10px;
      text-decoration: none;
      border-bottom: 1px solid #c9b373;

      &:visited {
        color: #f8f5e1; /* Ensure visited links remain white-ish */
      }
    }
  }
}

@media (max-width: 480px) {
  .navbar {
    a {
      font-size: 14px; /* Slightly smaller font size for very small screens */
      padding: 8px; /* Adjust padding for smaller screens */
    }
  }
}

@media (min-width: 769px) {
  .navbar {
    display: flex;
    margin-left: auto;
    flex-direction: row; /* Align nav links horizontally for monitor view */
    position: static; /* Ensure navbar is positioned normally in monitor view */
    top: auto; /* Reset positioning for monitor view */
    right: auto; /* Reset positioning for monitor view */
    background: none; /* Remove background for monitor view */
    border: none; /* Remove border for monitor view */
    padding-right: 50px;
    width: auto; /* Let width be determined by content */
    box-shadow: none; /* Remove shadow for monitor view */

    a {
      text-align: left; /* Align text normally */
      
      padding: 0 15px; /* Add padding between links */
      color: #f8f5e1; /* Ensure the correct color */
      font-weight: bold;
      border-bottom: none; /* Remove border for monitor view */
      background-color: transparent;
      position: relative; /* Needed for the ::after pseudo-element */

      &:hover {
        background-color: transparent; /* No background color on hover */
        color: #f8f5e1; /* Keep text color consistent */
      }

      &:hover::after {
        transform: scaleX(1); /* Scale up the line on hover */
      }

      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: -5px; /* Position the line slightly below the text */
        left: 0px; /* Extend the line slightly to the left */
        right: -5px;
        width: 100%;
        height: 2px; /* Line height */
        background-color: #c9b373; /* Gold color */
        transform: scaleX(0); /* Start with the line hidden */
        transform-origin: bottom left; /* Animate from the left */
        transition: transform 0.3s ease; /* Smooth transition */
      }

      &:visited {
        color: #f8f5e1; /* Ensure visited links don't turn purple */
      }
    }
  }
}

</style>
