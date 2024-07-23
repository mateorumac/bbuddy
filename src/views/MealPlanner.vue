<template>
  <div class="meal-planner-container">
    <div class="card">
      <h1>Meal Planner</h1>
      <p class="description">
        Plan your meals by choosing a date and your desired calorie intake. This tool helps you create a meal plan for the selected date based on the calorie input.
      </p>

      <div v-if="currentView === 'main'" class="date-picker-container">
        <input type="date" v-model="targetDate" @change="fetchMealPlan" />
        <input type="number" v-model="targetCalories" placeholder="Desired Calories" />
        <button @click="fetchMealPlan">Get Meal Plan</button>
      </div>

      <div v-if="currentView === 'customize'" class="additional-parameters">
        <h2>Customize Meal Plan</h2>
        <input type="text" v-model="diet" placeholder="Diet (e.g., vegetarian)" />
        <input type="text" v-model="exclude" placeholder="Exclude Ingredients (e.g., nuts)" />
        <button @click="customizeMealPlan">Customize Meal Plan</button>
        <button @click="switchToMainView">Back</button>
      </div>

      <div v-if="currentView === 'search'" class="additional-parameters">
        <h2>Advanced Recipe Search</h2>
        <input type="text" v-model="query" placeholder="Search Query (e.g., pasta)" />
        <input type="text" v-model="dietFilter" placeholder="Diet Filter (e.g., vegetarian)" />
        <input type="text" v-model="intolerances" placeholder="Intolerances (e.g., gluten)" />
        <button @click="searchRecipes">Advanced Recipe Search</button>
        <button @click="switchToMainView">Back</button>
      </div>

      <div v-if="currentView === 'main'" class="additional-functions">
        <button @click="switchToCustomizeView">Customize Meal Plan</button>
        <button @click="switchToSearchView">Advanced Recipe Search</button>
        <button @click="getNutritionalAnalysis">Get Nutritional Analysis</button>
        <button @click="generateShoppingList">Generate Shopping List</button>
      </div>
    </div>

    <div v-if="loading" class="spinner">
      <div class="loader"></div>
    </div>

    <div v-if="!loading && mealPlan" class="meal-plan">
      <div class="meal-plan-header">
        <h2>Meals for {{ targetDate }}</h2>
      </div>
      <div class="meal-cards">
        <div v-for="(meal, index) in mealPlan.meals" :key="index" class="meal-card" @click="goToRecipe(meal.id)">
          <h3>{{ meal.title }}</h3>
          <p>Preparation time: {{ meal.readyInMinutes }} minutes</p>
        </div>
      </div>
    </div>

    <div v-if="!loading && !mealPlan">
      <p style="color: black;"><b>Choose a date to see your meal plan!</b></p>
    </div>

    <div v-if="nutritionalInfo" class="nutritional-info">
      <h3>Nutritional Information</h3>
      <p>{{ nutritionalInfo }}</p>
    </div>

    <div v-if="shoppingList" class="shopping-list">
      <h3>Shopping List</h3>
      <ul>
        <li v-for="item in shoppingList" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import apiService from '@/apiService';

const cache = {};
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

export default {
  data() {
    return {
      targetDate: new Date().toISOString().slice(0, 10), // Today's date
      targetCalories: 2000, // Default calorie intake
      mealPlan: null,
      loading: false, // Loading state
      nutritionalInfo: null, // Store nutritional information
      shoppingList: null, // Store shopping list
      diet: '', // Diet preference for meal plan customization
      exclude: '', // Ingredients to exclude for meal plan customization
      query: '', // Search query for advanced recipe search
      dietFilter: '', // Diet filter for advanced recipe search
      intolerances: '', // Intolerances for advanced recipe search
      currentView: 'main' // Current view ('main', 'customize', 'search')
    };
  },
  methods: {
    async fetchMealPlan() {
      this.loading = true; // Set loading to true before fetching data
      try {
        const response = await apiService.getMealPlan(this.targetDate, this.targetCalories);
        this.mealPlan = response.data;
      } catch (error) {
        console.error("Error fetching meal plan:", error);
        this.mealPlan = null;
      } finally {
        this.loading = false; // Set loading to false after fetching data
      }
    },
    async getNutritionalAnalysis() {
      if (!this.mealPlan) return;
      try {
        const response = await apiService.getNutritionalAnalysis(this.mealPlan.meals);
        this.nutritionalInfo = response.data;
      } catch (error) {
        console.error("Error fetching nutritional analysis:", error);
      }
    },
    async generateShoppingList() {
      if (!this.mealPlan) return;
      try {
        const response = await apiService.generateShoppingList(this.mealPlan.meals);
        this.shoppingList = response.data;
      } catch (error) {
        console.error("Error generating shopping list:", error);
      }
    },
    async customizeMealPlan() {
      const preferences = {
        diet: this.diet, // User input for diet preference
        exclude: this.exclude // User input for ingredients to exclude
      };
      this.loading = true; // Set loading to true before fetching data
      try {
        const response = await apiService.customizeMealPlan(preferences);
        this.mealPlan = response.data;
      } catch (error) {
        console.error("Error customizing meal plan:", error);
        this.mealPlan = null;
      } finally {
        this.loading = false; // Set loading to false after fetching data
      }
    },
    async searchRecipes() {
      const filters = {
        diet: this.dietFilter, // User input for diet filter
        intolerances: this.intolerances // User input for intolerances
      };
      this.loading = true; // Set loading to true before fetching data
      try {
        const response = await apiService.advancedRecipeSearch(this.query, filters);
        console.log(response.data.results); // Handle the search results as needed
      } catch (error) {
        console.error("Error searching recipes:", error);
      } finally {
        this.loading = false; // Set loading to false after fetching data
      }
    },
    switchToCustomizeView() {
      this.currentView = 'customize';
    },
    switchToSearchView() {
      this.currentView = 'search';
    },
    switchToMainView() {
      this.currentView = 'main';
    },
    goToRecipe(id) {
      this.$router.push({ name: 'RecipeDetails', params: { id } });
    }
  },
  mounted() {
    this.fetchMealPlan(); // Fetch the meal plan for today's date on component mount
  }
};
</script>


<style scoped>
.meal-planner-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 60px 20px 20px;
  min-height: 100vh;
  box-sizing: border-box;
  margin-top: 70px; /* Added margin-bottom for spacing above the footer */
}

.card {
  background: #000;
  color: #c9b373;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
}

.description {
  color: #c9b373;
  margin-bottom: 20px;
  text-align: center;
}

h1 {
  color: #c9b373;
  margin: 0;
}

.date-picker-container,
.additional-parameters {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px; /* Added margin-bottom for spacing */
}

input[type="date"],
input[type="number"],
input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}

button {
  padding: 10px 20px;
  background-color: #c9b373;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  

  &:hover {
    background-color: #bfa660;
  }
}

.meal-plan {
  width: 100%;
  max-width: 1200px;
}

.meal-plan-header {
  display: inline-block;
  background: #000;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.meal-plan-header h2 {
  color: #c9b373;
  margin: 0;
  font-size: 24px;
  text-align: center;
}

.meal-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 items per row */
  gap: 20px;
  justify-content: center;
}

.meal-card {
  background: #000;
  border-radius: 10px;
  padding: 20px;
  color: #c9b373;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 0;
    color: #c9b373;
  }

  p {
    color: #c9b373;
  }
}

.additional-functions {
  margin-bottom: 20px; /* Added margin-bottom for spacing */
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap if necessary */
  gap: 10px;
  justify-content: center;

  button {
    padding: 5px 10px; /* Smaller buttons */
    background-color: #c9b373;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    min-width: 200px;

    &:hover {
      background-color: #bfa660;
    }
  }
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

