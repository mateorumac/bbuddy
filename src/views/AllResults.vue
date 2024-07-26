<template>
  <div class="results-container">
    <div class="header-container">
      <h1>All Results for "{{ $route.query.searchQuery }}"</h1>
    </div>
    <div v-if="recipes.length" class="grid">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
        <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image" />
        <h2>{{ recipe.title }}</h2>
        <p v-if="recipe.ingredients">Ingredients: {{ recipe.ingredients.map(i => i.name).join(', ') }}</p>
        <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id } }" class="view-details-button">View Details</router-link>
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
  padding: 60px 20px; /* Padding around the content */
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 60px; /* Adjusted margin-top */
}

.header-container {
  background-color: #c9b373; /* Background color for the header container */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

h1 {
  text-align: center;
  margin: 0;
  color: #000; /* Changed text color to black */
  font-family: 'Roboto', sans-serif; /* Nice font */
  font-size: 28px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  .recipe-item {
    padding: 15px;
    border: 1px solid #444; /* Dark border color */
    border-radius: 8px;
    text-align: center;
    background-color: #000; /* Black background color */
    color: #fff; /* White text color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 15px;
      object-fit: cover; /* Ensures the image fits nicely */
    }

    h2 {
      margin: 10px 0;
      font-size: 22px;
      color: #c9b373; /* Headline color */
    }

    p {
      margin: 5px 0;
      font-size: 16px;
      color: #ccc; /* Light gray text color */
    }

    .view-details-button {
      display: inline-block;
      margin-top: 10px;
      padding: 8px 15px;
      background: #c9b373; /* Button background color */
      color: #000; /* Changed text color to black */
      border-radius: 4px;
      text-decoration: none;

      &:hover {
        background: #bfa660; /* Darker shade for hover effect */
      }
    }
  }
}

</style>
