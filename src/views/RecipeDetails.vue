<!-- src/views/RecipeDetails.vue -->
<template>
  <div v-if="recipe" class="recipe-details">
    <h1>{{ recipe.title }}</h1>
    <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image" />
    <div v-html="recipe.summary" class="summary"></div>
    <div v-if="recipe.instructions">
      <h2>Instructions</h2>
      <div v-html="recipe.instructions"></div>
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
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .summary {
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    margin-top: 20px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 5px 0;
    }
  }
}
</style>
