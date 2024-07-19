<template>
  <div>
    <h1>{{ recipe.title }}</h1>
    <img :src="recipe.image" alt="Recipe Image" />
    <div v-html="recipe.summary"></div>
    <div v-if="recipe.reviews && recipe.reviews.length">
      <h2>Reviews</h2>
      <ul>
        <li v-for="(review, index) in recipe.reviews" :key="index">
          {{ review }}
        </li>
      </ul>
    </div>
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
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

img {
  max-width: 100%;
  margin-bottom: 20px;
}

div[ v-html] {
  margin-bottom: 20px;
}
</style>
