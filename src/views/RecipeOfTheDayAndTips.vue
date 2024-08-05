<template>
  <div class="combined-container">
    <div class="header-container">
      <h1 class="title">Recipe of the Day</h1>
    </div>
    <div class="content-container">
      <LoadingSpinner v-if="loading" loadingText="Loading recipe of the day..." />
      <ErrorOrNoResults v-else-if="error" :message="error" />
      <div v-else class="recipe-of-the-day card">
        <h3>{{ recipe.title }}</h3>
        <img :src="recipe.image" alt="Recipe Image" />
        <p v-html="cleanSummary"></p>
        <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id } }" class="view-details-button">View Details</router-link>
      </div>
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
      recipe: null,
      loading: true,
      error: null
    };
  },
  computed: {
    cleanSummary() {
      return this.recipe ? this.removeLinks(this.recipe.summary) : '';
    }
  },
  created() {
    this.fetchRecipeOfTheDay();
  },
  methods: {
    async fetchRecipeOfTheDay() {
      try {
        const data = await apiService.getRecipeOfTheDay();
        this.recipe = data;
      } catch (error) {
        this.error = "There was an error fetching the recipe of the day.";
        console.error("Error:", error);
      } finally {
        this.loading = false;
      }
    },
    removeLinks(text) {
      if (!text) return '';
      return text.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1');
    }
  }
};
</script>

<style scoped>
.combined-container {
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

.title {
  color: #c9b373;
  font-family: 'Lora', serif;
  font-size: 36px;
  margin: 0;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background-color: #000;
  color: #f8f5e1;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 30px;
}

.recipe-of-the-day img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

h3 {
  color: #c9b373;
  font-family: 'Lora', serif;
  font-size: 24px;
}

p {
  color: #e0e0e0;
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
  transition: background 0.3s;

  &:hover {
    background: #bfa660;
  }
}
</style>
