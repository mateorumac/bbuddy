<template>
  <div class="results-container">
    <div class="header-container">
      <h1>All Results for "{{ $route.query.searchQuery }}"</h1>
    </div>
    <LoadingSpinner v-if="loading" loadingText="Loading results..." />
    <div v-else>
      <div v-if="recipes.length" class="grid">
        <div v-for="(recipe, index) in visibleRecipes" :key="recipe.id" class="recipe-item">
          <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image" />
          <h2>{{ recipe.title }}</h2>
          <p v-if="recipe.ingredients">Ingredients: {{ recipe.ingredients.map(i => i.name).join(', ') }}</p>
          <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id } }" class="view-details-button">View Details</router-link>
        </div>
      </div>
      <button v-if="visibleRecipes.length < recipes.length" @click="loadMoreResults" class="load-more-button">
        Show More 
      </button>
      <ErrorOrNoResults v-else-if="!recipes.length" message="No results found." />
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
      visibleRecipes: [],
      error: null,
      loading: true,
      resultsPerPage: 8,
      currentPage: 1
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
          this.loadMoreResults(); 
        })
        .catch(error => {
          this.error = "There was an error fetching the recipes.";
          console.error("Error:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadMoreResults() {
      const start = this.visibleRecipes.length;
      const end = start + this.resultsPerPage;
      this.visibleRecipes = this.visibleRecipes.concat(this.recipes.slice(start, end));
      this.currentPage++;
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
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
  width: fit-content;
  margin: 0 auto 20px auto; 
}

h1 {
  color: #c9b373; 
  font-family: 'Lora', serif;
  font-size: 36px;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  padding: 0 10px;
}

.recipe-item {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  padding: 20px;
  color: #f8f5e1;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.recipe-item:hover {
  transform: scale(1.05); 
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3); 
}

.recipe-item img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
  object-fit: cover;
  max-height: 150px;
}

.recipe-item h2 {
  margin: 10px 0;
  font-size: 24px;
  color: #c9b373;
  font-family: 'Lora', serif;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
}

.recipe-item p {
  margin: 5px 0;
  font-size: 16px;
  color: #ccc;
  font-family: 'Roboto', sans-serif;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
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
}

.view-details-button:hover {
  background: #bfa660;
}

.load-more-button {
  display: block;
  width: 200px; 
  margin: 20px auto; 
  padding: 12px 20px; 
  background-color: #c9b373;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  margin-top: 50px;
}

.load-more-button:hover {
  background-color: #bfa660;
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .header-container {
    width: 90%; 
    padding: 15px;
    box-sizing: border-box;
    margin: 0 auto 20px auto; 
  }

  .recipe-item {
    width: calc(100% - 20px); 
    margin: 10px auto; 
    max-width: 350px; 
  }

  h2 {
    font-size: 24px; 
  }

  .view-details-button {
    padding: 10px 20px; 
    margin-bottom: 20px; 
  }

  .load-more-button {
    width: 200px; 
    font-size: 16px; 
    padding: 12px 24px;
    margin: 20px auto; 
  }
}

@media (max-width: 480px) {
  .header-container {
    width: 90%; 
    padding: 15px;
    box-sizing: border-box;
    margin: 0 auto 20px auto; 
  }

  .recipe-item {
    width: calc(100% - 20px); 
    margin: 10px auto; 
    max-width: 325px; 
  }

  h2 {
    font-size: 24px; 
  }

  .view-details-button {
    padding: 10px 20px; 
    margin-bottom: 20px; 
  }

  .load-more-button {
    width: 200px; 
    font-size: 16px; 
    padding: 12px 24px; 
    margin: 20px auto; 
    margin-top: 50px;
    margin-bottom: -30px;
  }
}
</style>