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
              <p>Preparation time: {{ similar.readyInMinutes }} mins</p>
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
        await this.fetchSimilarRecipes(id);
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
  padding: 60px 20px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px; 
}

.card {
  background-color: #000; 
  color: #f8f5e1; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 30px;
  max-width: 800px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px; 
}

.recipe-info-container {
  display: flex;
  justify-content: center; 
  align-items: center;
}

.image-container {
  position: relative;
  display: flex;
  justify-content: center; 
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
  background-color: #c9b373; 
  color: #000; 
  border-radius: 50%;
  padding: 10px 20px;
  margin-bottom: 10px; 
  text-align: center;
  font-weight: bold;
  width: max-content;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #c9b373; 
  font-family: 'Lora', serif; 
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
  color: #e0e0e0; 
  margin-bottom: 20px;
}

h2 {
  font-size: 28px;
  margin-top: 20px;
  color: #c9b373; 
  font-family: 'Lora', serif; 
}

.instructions {
  font-size: 18px;
  line-height: 1.6;
  color: #e0e0e0; 
}

.ingredients ul {
  list-style: none;
  padding: 0;
}

.ingredients li {
  padding: 10px 0;
  border-bottom: 1px solid #c9b373; 
  font-size: 16px;
  color: #e0e0e0; 
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
  font-family: 'Lora', serif; 
}

.similar-recipes-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.similar-recipes .card {
  background-color: #000;
  color: #f8f5e1; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 250px; 
  height: auto; 
  box-sizing: border-box;
  margin-bottom: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  text-align: center;
}

.similar-recipes .card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.similar-recipes .card a {
  color: #c9b373; 
  text-decoration: none;
}

.similar-recipes .card p {
  margin-top: 10px;
  font-size: 16px;
  color: #e0e0e0; 
}

@media (max-width: 768px) {
  .recipe-details {
    padding: 40px 10px; 
    margin-top: 120px; 
  }

  .card {
    max-width: 90%; 
    margin: 0 auto 20px auto; 
    padding: 20px; 
    font-size: 18px; 
    line-height: 1.6; 
  }

  h1 {
    font-size: 28px; 
    margin-bottom: 15px; 
    text-align: center; 
  }

  h2 {
    font-size: 24px; 
    margin-top: 15px; 
    text-align: center; 
  }

  .similar-recipes-cards {
    gap: 15px; 
    justify-content: center; 
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    margin: 0 auto;
    width: 100%;
  }

  .similar-recipes .card {
    width: 100%; 
    margin: 0 auto; 
    padding: 15px; 
  }

  .similar-recipes-title {
    font-size: 24px; 
    margin-bottom: 15px; 
    padding: 8px 15px; 
    display: inline-block;
  }

  .summary, .instructions, .ingredients li {
    font-size: 16px; 
    line-height: 1.5; 
    margin-bottom: 15px; 
  }
}

@media (max-width: 480px) {
  .recipe-details {
    padding: 30px 5px; 
    margin-top: 100px;
    max-width: 100%;
  }

  .card {
    max-width: 85%; 
    padding: 15px; 
    font-size: 16px; 
    line-height: 1.5; 
  }

  h1 {
    font-size: 24px; 
    margin-bottom: 10px;
    text-align: center;
  }

  h2 {
    font-size: 20px; 
    margin-top: 10px; 
    text-align: center;
  }

  .similar-recipes-cards {
    gap: 10px; 
    grid-template-columns: repeat(2, 1fr); 
    width: 100%;
  }

  .similar-recipes .card {
    width: 100%; 
    padding: 10px; 
  }

  .similar-recipes-title {
    font-size: 20px; 
    margin-bottom: 10px; 
    padding: 5px 10px; 
    display: inline-block;
  }

  .summary, .instructions, .ingredients li {
    font-size: 14px; 
    line-height: 1.4; 
    margin-bottom: 10px; 
  }
}
</style>
