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
          this.loadMoreResults(); // Load initial set of results
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
  background-color: #000;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: fit-content;
  margin: 0 auto 20px auto; /* Center align the title container */
}

h1 {
  color: #c9b373; /* Gold text color */
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%; /* Make the card's height consistent */
  padding: 15px;
  border: 1px solid #444;
  border-radius: 8px;
  text-align: center;
  background-color: #000;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05); /* Slightly enlarge the card */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Increase the shadow for a more pronounced effect */
  }

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
    flex-grow: 1; /* Allows the title to take up as much space as needed */
  }

  p {
    margin: 5px 0;
    font-size: 16px;
    color: #ccc;
    font-family: 'Roboto', sans-serif;
    flex-grow: 1; /* Allows the description to take up space while keeping the button aligned */
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
    align-self: center; /* Ensure the button is centered horizontally */

    &:hover {
      background: #bfa660;
    }
  }
}

.load-more-button {
  display: block;
  width: 200px; /* Less wide */
  margin: 20px auto; /* Center aligned */
  padding: 12px 20px; /* Added height */
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
    width: 90%; /* Ensure the title container isn't wider than the cards */
    padding: 15px;
    box-sizing: border-box;
    margin: 0 auto 20px auto; /* Center align the title container */
  }

  .recipe-item {
    width: calc(100% - 20px); /* Ensure cards have some padding from the edges */
    margin: 10px auto; /* Center the cards with margin */
    max-width: 350px; /* Set a maximum width to prevent cards from being too wide */
  }

  h2 {
    font-size: 24px; /* Adjust font size for smaller screens */
  }

  .view-details-button {
    padding: 10px 20px; /* Adjust button padding */
    margin-bottom: 20px; /* Add space below the button */
  }

  .load-more-button {
    width: 200px; /* Increase the width for better visibility */
    font-size: 16px; /* Slightly larger font */
    padding: 12px 24px; /* Add height */
    margin: 20px auto; /* Center align the button */
  }
}

@media (max-width: 480px) {
  .header-container {
    width: 90%; /* Ensure the title container isn't wider than the cards */
    padding: 15px;
    box-sizing: border-box;
    margin: 0 auto 20px auto; /* Center align the title container */
  }
  .recipe-item {
    width: calc(100% - 20px); /* Ensure cards have some padding from the edges */
    margin: 10px auto; /* Center the cards with margin */
    max-width: 325px; /* Set a maximum width to prevent cards from being too wide */
  }

  h2 {
    font-size: 24px; /* Adjust font size for smaller screens */
  }

  .view-details-button {
    padding: 10px 20px; /* Adjust button padding */
    margin-bottom: 20px; /* Add space below the button */
  }

  .load-more-button {
    width: 200px; /* Increase the width for better visibility */
    font-size: 16px; /* Slightly larger font */
    padding: 12px 24px; /* Add height */
    margin: 20px auto; /* Center align the button */
    margin-top: 50px;
    margin-bottom: -30px;
  }
}

</style>
