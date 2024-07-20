<!-- src/views/RecipeDetails.vue -->
<template>
  <div v-if="recipe" class="recipe-details">
    <div class="card">
      <h1>{{ recipe.title }}</h1>
      <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image" />
      <div v-html="recipe.summary" class="summary"></div>
      <div v-if="recipe.instructions">
        <h2>Instructions</h2>
        <div v-html="recipe.instructions" class="instructions"></div>
      </div>
      <div v-if="recipe.reviews && recipe.reviews.length">
        <h2>Reviews</h2>
        <ul>
          <li v-for="(review, index) in recipe.reviews" :key="index">
            {{ review }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import apiService from '@/apiService';

export default {
  data() {
    return {
      recipe: null,
      error: null,
      loading: true
    };
  },
  created() {
    this.fetchRecipeDetails();
  },
  methods: {
    fetchRecipeDetails() {
      const id = this.$route.params.id;
      apiService.getRecipeDetails(id)
        .then(response => {
          this.recipe = response.data;
        })
        .catch(error => {
          this.error = "There was an error fetching the recipe details.";
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
.recipe-details {
  padding: 60px 20px; /* Increased padding for more spacing */
  display: flex;
  justify-content: center;
  margin-top: 570px;
}

.card {
  background-color: #000; /* Black background color */
  color: #fff; /* White text color */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 30px;
  max-width: 800px;
  width: 100%;
  box-sizing: border-box;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #c9b373; /* Updated to match the AllResults.vue style */
  font-family: 'Roboto', sans-serif; /* Nice font */
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.summary {
  font-size: 18px;
  line-height: 1.6;
  color: #ccc; /* Light gray text color for better readability */
  margin-bottom: 20px;
}

h2 {
  font-size: 28px;
  margin-top: 20px;
  color: #c9b373; /* Updated to match the AllResults.vue style */
}

.instructions {
  font-size: 18px;
  line-height: 1.6;
  color: #ccc; /* Light gray text color for better readability */
}

ul {
  list-style: none;
  padding: 0;

  li {
    padding: 10px 0;
    border-bottom: 1px solid #333; /* Darker border for contrast */
    font-size: 16px;
    color: #ccc; /* Light gray text color */
  }
}

/* Link styles for HTML content */
.card a {
  color: #c9b373; /* Color of the links */
  text-decoration: underline; /* Underline links */
}

.card a:hover {
  color: #fff; /* Optionally change link color on hover */
  text-decoration: none; /* Remove underline on hover (optional) */
}
</style>
