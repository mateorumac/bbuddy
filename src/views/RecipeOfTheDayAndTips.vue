<template>
  <div class="combined-container">
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
  margin-top: 100px;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%; 
  max-width: 100%; 
}

.card {
  background-color: rgba(0, 0, 0, 0.5); 
  color: #f8f5e1;
  border-radius: 15px;
  padding: 50px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
}

.recipe-of-the-day img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 20px;
}

h3 {
  color: #c9b373;
  font-family: 'Lora', serif;
  font-size: 36px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  margin-top: -10px;
}

p {
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  line-height: 1.8;
  margin-bottom: 25px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.view-details-button {
  display: inline-block;
  margin-top: 20px;
  padding: 15px 30px;
  background: #c9b373;
  color: #000;
  font-weight: bold;
  font-size: 20px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  transition: background 0.3s ease, transform 0.2s ease;
}

.view-details-button:hover {
  background: #bfa660;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .combined-container {
    padding: 60px 10px;
    max-width: 90%;
    margin: 0 auto;
    margin-top: 70px;
  }

  .titleROTD {
    font-size: 40px;
  }

  .content-container {
    gap: 20px;
  }

  .card {
    padding: 25px;
  }

  h3 {
    font-size: 28px;
  }

  p {
    font-size: 18px;
  }

  .view-details-button {
    padding: 12px 20px;
    font-size: 18px;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .combined-container {
    padding: 50px 5px;
    max-width: 95%;
    margin: 0 auto;
    margin-top: 60px;
  }

  .titleROTD {
    font-size: 36px;
  }

  .content-container {
    gap: 15px;
  }

  .card {
    padding: 20px;
  }

  h3 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
  }

  .view-details-button {
    padding: 10px 18px;
    font-size: 16px;
    width: 100%;
  }
}
</style>