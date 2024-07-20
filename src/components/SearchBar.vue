<template>
    <div class="search-container">
      <img src="@/assets/logo.png" alt="App Logo" class="logo" @click="goHome" @mouseover="spinLogo" @mouseleave="stopSpinLogo" :class="{ spinning: isSpinning }" />
      <input type="text" placeholder="Search for recipes or ingredients..." v-model="searchQuery" @input="searchRecipes" />
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
        apiService.searchRecipes(this.searchQuery)
          .then(response => {
            this.recipes = response.data.results;
          })
          .catch(error => {
            apiService.searchRecipesByIngredient(this.searchQuery)
              .then(response => {
                this.recipes = response.data;
              })
              .catch(err => {
                this.error = "There was an error fetching the recipes.";
                console.error("Error:", err);
              });
          })
          .finally(() => {
            this.loading = false;
          });
      },
      getRecipeDetails(id) {
        this.$router.push({ name: 'RecipeDetails', params: { id } });
      },
      showAllResults() {
        this.$router.push({ name: 'AllResults', query: { searchQuery: this.searchQuery } });
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
      max-width: 500px;
      padding: 10px 15px;
      border: 1px solid #ccc;
      border-radius: 30px;
      font-size: 16px;
      outline: none;
    }
  
    .dropdown {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 500px;
      max-height: 200px;
      overflow-y: auto;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      z-index: 1000;
  
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
  
        li {
          padding: 10px;
          cursor: pointer;
          &:hover {
            background: #f0f0f0;
          }
        }
      }
  
      button {
        width: 100%;
        padding: 10px;
        background: #42b983;
        color: white;
        border: none;
        cursor: pointer;
        &:hover {
          background: #339966;
        }
      }
    }
  }
  </style>
  