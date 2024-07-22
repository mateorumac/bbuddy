<template>
  <div class="search-container">
    <img src="@/assets/logo.png" alt="App Logo" class="logo" @click="goHome" @mouseover="spinLogo" @mouseleave="stopSpinLogo" :class="{ spinning: isSpinning }" />
    <input type="text" placeholder="Search for recipes or ingredients..." v-model="searchQuery" @input="searchRecipes" />
    <div class="button-container">
      <button 
        @click="searchType = 'nutrients'" 
        :class="{ active: searchType === 'nutrients' }"
        :title="'Switch search type to Nutrients'"
      >
        <i class="fa fa-calculator"></i>
      </button>
      <button 
        @click="searchType = 'grocery'" 
        :class="{ active: searchType === 'grocery' }"
        :title="'Switch search type to Grocery Products'"
      >
        <i class="fa fa-shopping-cart"></i>
      </button>
    </div>
    <div v-if="recipes.length" class="dropdown">
      <ul>
        <li v-for="recipe in limitedRecipes" :key="recipe.id" @click="getRecipeDetails(recipe.id)">
          {{ recipe.title }}
        </li>
      </ul>
      <button v-if="recipes.length > 5" @click="showAllResults">Show All Results</button>
    </div>
  </div>
</template>

<script>
import apiService from '@/apiService';

export default {
  data() {
    return {
      searchQuery: '',
      searchType: 'recipes', // Default search type
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
    searchRecipes() {
      if (this.searchQuery.length < 3) {
        this.recipes = [];
        return;
      }
      this.loading = true;
      this.error = null;
      if (this.searchType === 'recipes') {
        apiService.searchRecipes(this.searchQuery).then(response => {
          this.recipes = response.data.results;
        }).catch(error => {
          console.error("Error:", error);
          this.error = "There was an error fetching the recipes.";
        }).finally(() => {
          this.loading = false;
        });
      } else if (this.searchType === 'nutrients') {
        // Implement nutrient search logic here
      } else if (this.searchType === 'grocery') {
        // Implement grocery search logic here
      }
    },
    getRecipeDetails(id) {
      this.$router.push({ name: 'RecipeDetails', params: { id } });
    },
    showAllResults() {
      this.$router.push({ name: 'AllResults', query: { searchQuery: this.searchQuery, searchType: this.searchType } });
    },
    goHome() {
      this.$router.push({ name: 'home' });
    },
    spinLogo() {
      this.isSpinning = true;
    },
    stopSpinLogo() {
      this.isSpinning = false;
    }
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
    width: 50px;
    height: 50px;
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
    border: 1px solid #ccc;
    border-radius: 30px;
    font-size: 16px;
    outline: none;
    margin-right: 10px;
  }

  .button-container {
    display: flex;
    margin-left: 10px;
    

    button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #c9b373; // Consistent with other buttons
      border: none;
      color: black;
      font-size: 20px;
      cursor: pointer;
      transition: background 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: -5px;
      margin-right: 18px;

      &.active {
        background: #bfa660;
      }

      &:hover {
        background: #bfa660;
      }
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
    overflow-y: auto;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        padding: 10px;
        cursor: pointer;
        background: #333; // Darker for contrast
        color: #fff; // White text for visibility
        border-bottom: 1px solid #444; // Separates items visually
        &:hover {
          background: #c9b373; // Highlight color on hover
        }
      }
    }

    button {
      width: 100%;
      padding: 10px;
      background: #c9b373; // Maintains original button color
      color: white;
      border: none;
      cursor: pointer;
      &:hover {
        background: #bfa660; // Darker green on hover
      }
    }
  }
}
</style>
