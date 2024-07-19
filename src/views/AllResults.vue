<!-- src/views/AllResults.vue -->
<template>
  <div class="results-container">
    <h1>All Results for "{{ $route.query.searchQuery }}"</h1>
    <div v-if="recipes.length" class="grid">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
        <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image" />
        <h2>{{ recipe.title }}</h2>
        <p v-if="recipe.ingredients">Ingredients: {{ recipe.ingredients.map(i => i.name).join(', ') }}</p>
        <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id } }">View Details</router-link>
      </div>
    </div>
    <div v-else>
      <p>No results found.</p>
    </div>
  </div>
</template>

<script>
import apiService from '@/apiService';

export default {
  data() {
    return {
      recipes: [],
      error: null,
      loading: true
    };
  },
  created() {
    this.searchRecipes();
  },
  methods: {
    searchRecipes() {
      const query = this.$route.query.searchQuery;
      apiService.searchRecipes(query)
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
    }
  }
};
</script>

<style scoped>
.results-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;

    .recipe-item {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
      text-align: center;
      background-color: #fff;

      img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }

      h2 {
        margin: 10px 0;
        font-size: 20px;
      }

      p {
        margin: 5px 0;
        font-size: 14px;
        color: #666;
      }

      a {
        display: inline-block;
        margin-top: 10px;
        padding: 5px 10px;
        background: #42b983;
        color: white;
        border-radius: 4px;
        text-decoration: none;

        &:hover {
          background: #339966;
        }
      }
    }
  }
}
</style>
