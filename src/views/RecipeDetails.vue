<template>
  <div>
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="error">
      <ErrorOrNoResults :message="error" />
    </div>
    <div v-else class="recipe-details">
      <div class="card">
        <h1>{{ recipe.title }}</h1>
        <div class="recipe-info-container">
          <div class="image-container">
            <img :src="recipe.image" alt="Recipe Image" v-if="recipe.image" />
            <div class="notifications">
              <div class="notification">{{ recipe.readyInMinutes }} mins</div>
              <div v-if="recipe.vegan" class="notification">Vegan</div>
              <div v-else-if="recipe.glutenFree" class="notification">Gluten Free</div>
              <div v-else-if="recipe.vegetarian" class="notification">Vegetarian</div>
            </div>
          </div>
        </div>
        <div v-html="cleanSummary" class="summary"></div>
        <div class="instructions" v-html="cleanInstructions"></div>
        <div class="ingredients">
          <h2>Ingredients</h2>
          <ul>
            <li v-for="ingredient in recipe.extendedIngredients" :key="ingredient.id">
              {{ ingredient.original }}
            </li>
          </ul>
        </div>
      </div>
      <!-- Similar Recipes Section -->
      <div v-if="similarRecipes.length" class="similar-recipes">
        <h2 class="similar-recipes-title">Similar Recipes</h2>
        <div class="similar-recipes-cards">
          <div v-for="similar in similarRecipes" :key="similar.id" class="card">
            <router-link :to="{ name: 'RecipeDetails', params: { id: similar.id }}">
              <h3>{{ similar.title }}</h3>
            </router-link>
          </div>
        </div>
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
      similarRecipes: [],
      error: null,
      loading: true
    };
  },
  computed: {
    cleanSummary() {
      return this.recipe ? this.removeLinks(this.recipe.summary) : '';
    },
    cleanInstructions() {
      return this.recipe ? this.removeLinks(this.recipe.instructions) : '';
    }
  },
  methods: {
    async fetchRecipeDetails() {
      const id = this.$route.params.id;
      this.loading = true;
      try {
        const { data } = await apiService.getRecipeDetails(id);
        this.recipe = data;
        await this.fetchSimilarRecipes(id); // Fetch similar recipes after fetching details
      } catch (error) {
        this.error = "There was an error fetching the recipe details.";
      } finally {
        this.loading = false;
      }
    },
    async fetchSimilarRecipes(id) {
      try {
        const { data } = await apiService.getSimilarRecipes(id);
        this.similarRecipes = data;
      } catch (error) {
        console.error("Error fetching similar recipes:", error);
      }
    },
    removeLinks(text) {
      if (!text) return '';
      return text.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1');
    }
  },
  watch: {
    '$route.params.id': 'fetchRecipeDetails'
  },
  created() {
    this.fetchRecipeDetails();
  }
};
</script>


<style scoped>
.recipe-details {
  padding: 60px 20px; /* Increased padding for more spacing */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px; /* Margin from the top */
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
  margin-bottom: 20px; /* Added margin between cards */
}

.recipe-info-container {
  display: flex;
  justify-content: center; /* Center align the image container */
  align-items: center;
}

.image-container {
  position: relative;
  display: flex;
  justify-content: center; /* Center align the image within the container */
}

.notifications {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.notification {
  background-color: #c9b373; /* Notification background color */
  color: #000; /* Notification text color */
  border-radius: 50%;
  padding: 10px 20px;
  margin-bottom: 10px; /* Space between notifications */
  text-align: center;
  font-weight: bold;
  width: max-content;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #c9b373; /* Updated to match the AllResults.vue style */
  font-family: 'Roboto', sans-serif; /* Nice font */
}

img {
  max-width: 100%; /* Ensure the image fits within the container */
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

.ingredients ul {
  list-style: none;
  padding: 0;
}

.ingredients li {
  padding: 10px 0;
  border-bottom: 1px solid #c9b373; /* Updated border color */
  font-size: 16px;
  color: #ccc; /* Light gray text color */
}

.similar-recipes {
  padding: 20px;
}

.similar-recipes-title {
  background-color: #000;
  color: #c9b373;
  padding: 10px 20px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 20px;
}

.similar-recipes-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.similar-recipes .card {
  background-color: #000;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 250px; /* Set a fixed width for consistency */
  height: 150px; /* Set a fixed height for consistency */
  box-sizing: border-box;
  margin-bottom: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.similar-recipes .card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.similar-recipes .card a {
  color: #c9b373; /* Updated link color */
  text-decoration: none; /* Remove underline */
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #c9b373;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
