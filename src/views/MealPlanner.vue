<template>
  <div class="meal-planner-container">
    <div class="card">
      <h1>Meal Planner</h1>
      <p class="description">
        Plan your meals by choosing a date and your desired calorie intake. This tool helps you create a meal plan for the selected date based on the calorie input.
      </p>
      <div v-if="currentView === 'main'" class="date-picker-container">
        <input type="date" v-model="targetDate" class="input-field" />
        <input type="number" v-model="targetCalories" placeholder="Desired Calories" class="input-field" />
        <div class="button-group">
          <button @click="switchToCustomizeView">Customize</button>
          <button @click="fetchMealPlan">Get Meal Plan</button>
        </div>
      </div>
      <div v-if="currentView === 'customize'" class="additional-parameters">
        <h2>Customize Meal Plan</h2>
        <input type="text" v-model="diet" placeholder="Diet (e.g., vegetarian)" class="full-width-input" />
        <input type="text" v-model="exclude" placeholder="Exclude Ingredients (e.g., nuts)" class="full-width-input" />
        <div class="button-group">
        <button @click="switchToMainView">Back</button>
        <button @click="customizeMealPlan">Customize</button>
        
      </div>
    </div>
    </div>
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="error">
      <ErrorOrNoResults :message="error" />
    </div>
    <div v-else class="meal-plan">
      <div v-if="mealPlan">
        <div class="meal-plan-header">
          <h2>Meals for {{ new Date(targetDate).toLocaleDateString('en-GB') }}</h2>
        </div>
        <div class="meal-cards">
          <div v-for="(meal, index) in mealPlan.meals" :key="index" class="meal-card" @click="goToRecipe(meal.id)">
            <h3>{{ meal.title }}</h3>
            <p>Preparation time: {{ meal.readyInMinutes }} minutes</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p style="color: black;"><b>Choose a date to see your meal plan!</b></p>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '@/apiService';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorOrNoResults from '@/components/ErrorOrNoResults.vue';

export default {
  components: { LoadingSpinner, ErrorOrNoResults },
  data() {
    return {
      targetDate: new Date().toISOString().slice(0, 10),
      targetCalories: 2000,
      mealPlan: null,
      loading: false,
      error: null,
      diet: '',
      exclude: '',
      currentView: 'main'
    };
  },
  methods: {
    async fetchMealPlan() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiService.getMealPlan(this.targetDate, this.targetCalories);
        this.mealPlan = response.data;
        this.currentView = 'main';
      } catch (error) {
        this.error = `There was an error fetching the meal plan: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
    async customizeMealPlan() {
      this.loading = true;
      this.error = null;
      try {
        const preferences = { diet: this.diet, exclude: this.exclude };
        const response = await apiService.customizeMealPlan(preferences);
        if (response.data) {
          this.mealPlan = response.data;
          this.switchToMainView(); // Optionally switch view to display the meal plan
        }
      } catch (error) {
        this.error = `There was an error customizing the meal plan: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
    switchToCustomizeView() {
      this.currentView = 'customize';
    },
    switchToMainView() {
      this.currentView = 'main';
    },
    goToRecipe(id) {
      this.$router.push({ name: 'RecipeDetails', params: { id } });
    }
  }
};
</script>

<style scoped>
.meal-planner-container {
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px;
  min-height: 100vh;
  box-sizing: border-box;
}

.card {
  background: #000;
  color: #c9b373;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
}

.description, .button-group button {
  text-align: center;
}

.input-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.input-field {
  margin: 5px;
  padding:9px;
  width: 24.2%;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  width: 28%;
  padding: 10px 20px;
  background-color: #c9b373;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #bfa660;
}

.meal-plan-header, .meal-cards {
  width: 100%;
}

.meal-card {
  background: #000;
  border-radius: 10px;
  padding: 10px;
  color: #c9b373;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.meal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.meal-plan-header h2 {
  background: black;
  padding: 5px 10px;
  margin: 0 auto;
  width: fit-content;
  border-radius: 5px;
}
.full-width-input {
  width: 24%;
  padding: 8px;
  margin: 6px;
}
</style>
