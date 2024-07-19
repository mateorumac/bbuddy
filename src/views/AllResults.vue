<template>
    <div class="results-grid">
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-else>
        <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card" @click="getRecipeDetails(recipe.id)">
          <img :src="recipe.image" :alt="recipe.title" />
          <div class="recipe-info">
            <h3>{{ recipe.title }}</h3>
            <p>Ingredients: {{ recipe.ingredients.join(', ') }}</p>
            <p>Time: {{ recipe.readyInMinutes }} minutes</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiService from '@/apiService'
  
  export default {
    data() {
      return {
        recipes: [],
        loading: false,
        error: null
      };
    },
    created() {
      this.fetchRecipes();
    },
    methods: {
      fetchRecipes() {
        this.loading = true;
        this.error = null;
        apiService.searchRecipes(this.$route.query.searchQuery)
          .then(response => {
            this.recipes = response.data.results;
          })
          .catch(error => {
            this.error = "There was an error fetching the recipes.";
            console.error("Error:", error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      getRecipeDetails(id) {
        this.$router.push({ name: 'RecipeDetails', params: { id } });
      }
    }
  };
  </script>
  
  <style lang="scss">
  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    .recipe-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
      }
      .recipe-info {
        padding: 10px;
        h3 {
          margin: 0 0 10px;
        }
        p {
          margin: 0 0 5px;
        }
      }
      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }
  </style>
  