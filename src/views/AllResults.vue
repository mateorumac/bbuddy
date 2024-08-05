<template>
  <div class="results-container">
    <div class="header-container">
      <h1>All Results for "{{ $route.query.searchQuery }}"</h1>
    </div>
    <LoadingSpinner v-if="loading" loadingText="Loading results..." />
    <div v-else>
      <div v-if="recipes.length" class="grid">
        <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
          <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image" />
          <h2>{{ recipe.title }}</h2>
          <p v-if="recipe.ingredients">Ingredients: {{ recipe.ingredients.map(i => i.name).join(', ') }}</p>
          <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id } }" class="view-details-button">View Details</router-link>
        </div>
      </div>
      <ErrorOrNoResults v-else message="No results found." />
    </div>
  </div>
</template>

<script>
import apiService from '@/apiService';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorOrNoResults from '@/components/ErrorOrNoResults.vue';

export default {
  components: {
    LoadingSpinner,
    ErrorOrNoResults
  },
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
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
}

.header-container {
  background-color: #000;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
}

h1 {
  color: #c9b373; /* Gold text color */
  font-family: 'Lora', serif;
  font-size: 36px;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.recipe-item {
  padding: 15px;
  border: 1px solid #444;
  border-radius: 8px;
  text-align: center;
  background-color: #000;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
    object-fit: cover;
  }

  h2 {
    margin: 10px 0;
    font-size: 24px;
    color: #c9b373;
    font-family: 'Lora', serif;
  }

  p {
    margin: 5px 0;
    font-size: 16px;
    color: #ccc;
    font-family: 'Roboto', sans-serif;
  }

  .view-details-button {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 20px;
    background: #c9b373;
    color: #000;
    border-radius: 5px;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
      background: #bfa660;
    }
  }
}
</style>