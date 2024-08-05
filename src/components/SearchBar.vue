<template>
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
      isSpinning: false
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
    handleClickOutside(event) {
      if (this.$refs.searchContainer && !this.$refs.searchContainer.contains(event.target)) {
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
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
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
    width: 60%;
    max-width: 400px;
    padding: 10px 15px;
    border: 1px solid #c9b373; // Darker border for better contrast
    border-radius: 30px;
    font-size: 16px;
    outline: none;
    margin-right: 10px;
    background-color: #2c2c2c; // Dark background for premium look
    color: #f8f5e1; // Light text color for readability

    &::placeholder {
      color: #888; // Softer placeholder color
    }
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 500px;
    background: #000; // Black background to match card style
    border: 1px solid #444; // Dark border to add depth
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Adds shadow for depth
    z-index: 1000;
    overflow-y: hidden; // Prevent vertical scrollbar
    overflow-x: hidden; // Prevent horizontal scrollbar
    padding: 0; // Remove any padding from the dropdown

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        padding: 10px;
        cursor: pointer;
        background: #000; // Darker for contrast
        color: #f8f5e1; // Light text color for visibility
        border-bottom: 1px solid #444; // Separates items visually
        &:hover {
          background: #c9b373; // Highlight color on hover
          color: #2c2c2c; // Dark text color for better contrast
        }
      }
    }

    .show-all-results-button {
      width: 100%;
      padding: 10px;
      background: #c9b373; // Maintains original button color
      color: #000; // Dark text color for contrast
      border: none;
      cursor: pointer;
      font-family: 'Lora', serif;
      font-size: 16px;
      margin: 0; // Remove any margin to ensure no extra space
      border-top: 1px solid #444; // Add top border to separate from list items
      &:hover {
        background: #bfa660; 
      }
    }
  }
}

</style>
