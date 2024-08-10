<template>
  <div class="meal-planner-container">
    <div class="card">
      <h1>Meal Planner</h1>
      <p class="description">
        Plan your meals by choosing a date and your desired calorie intake. <br><br>This tool helps you create a meal plan for the selected date based on the calorie input.
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
            <img :src="meal.image || 'path/to/default-image.jpg'" alt="Meal Image" v-if="meal.image" />
            <h3>{{ meal.title }}</h3>
            <p>Preparation time: {{ meal.readyInMinutes }} minutes</p>
            <p v-if="getCalories(meal)">Calories: {{ getCalories(meal) }} kcal</p>
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
    getCalories(meal) {
      if (!meal.nutrition || !meal.nutrition.nutrients) return null;
      const caloriesInfo = meal.nutrition.nutrients.find(nutrient => nutrient.title === "Calories");
      return caloriesInfo ? caloriesInfo.amount : 'No calorie data';
    },
    getMealImage(meal) {
      // Assuming the image is directly under the meal object
      return meal.image || 'default-image-url.jpg'; // Provide a default if no image is available
    },
    goToRecipe(id) {
      this.$router.push({ name: 'RecipeDetails', params: { id } });
    }
  }
};
</script>

<style scoped lang="scss">
.meal-planner-container {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 77.6vh;
  box-sizing: border-box;
}

.card {
  background: #000; // Keep the background color as black
  color: #f8f5e1; // Light text color for readability
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 800px; // Increased max-width for a wider card
  margin-top: 136px;
}

h1 {
  color: #c9b373; // Gold color for headings
  font-family: 'Lora', serif;
}

.description {
  margin-bottom: 20px;
  color:#f8f5e1;
  font-family: 'Roboto', sans-serif;
}

.date-picker-container, .additional-parameters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-field, .full-width-input {
  padding: 12px;
  border: 1px solid #c9b373;
  border-radius: 5px;
  background-color: #2c2c2c;
  color: #f8f5e1;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  width: auto;
  padding: 10px 20px;
  background-color: #c9b373;
  border: none;
  border-radius: 5px;
  color: #2c2c2c;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
}

button:hover {
  background-color: #bfa660;
}

.meal-plan-header, .meal-cards {
  width: 100%;
}

.meal-cards {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap; /* Ensure all cards are in a single row */
  overflow-x: auto; /* Allows scrolling horizontally if screen width is small */
  overflow-y: hidden;
  padding: 10px;
}

.meal-card {
  background: #000; // Keep the background color as black
  border-radius: 10px;
  padding: 10px;
  color: #c9b373; // Light text color for readability
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 10px; /* Space between cards */
  flex: 0 0 auto; /* Do not grow or shrink */
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 300px; /* Fixed width for each card */
}

.meal-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.meal-plan-header h2 {
  background: #000;
  padding: 10px 10px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: fit-content;
  border-radius: 5px;
  color: #c9b373; // Gold color for headings
  font-family: 'Lora', serif;
}

@media (max-width: 768px) {
  .meal-planner-container {
    margin-top: 150px; /* Match the margin from the previous file to move it down */
  }

  .card {
    width: 90%; /* Make the card take up 90% of the available width */
    max-width: 90%; /* Ensure it doesn’t exceed the container width */
    margin: 20px auto; /* Center the card and add spacing on sides */
    padding: 20px; /* Adjust padding for better fit */
    box-sizing: border-box; /* Include padding in the width calculation */
  }

  .meal-cards {
    display: flex;
    flex-direction: column; /* Stack meal cards in a column */
    gap: 15px; /* Space between meal cards */
    padding: 10px; /* Padding around the meal cards */
    margin-left: 5%; /* Align the meal cards with the main card */
    width: 90%; /* Ensure meal cards start from the same point as the main card */
    box-sizing: border-box;
  }

  .meal-card {
    width: 100%; /* Make meal cards take up full width of container */
    max-width: 100%; /* Ensure meal cards don’t exceed the container width */
    margin: 0 auto; /* Center the meal cards */
    box-sizing: border-box; /* Include padding in the width calculation */
  }
}

@media (max-width: 480px) {
  .meal-planner-container {
    margin-top: 150px; /* Match the margin from the previous file to move it down */
  }

  .card {
    width: 85%; /* Further reduce width on smaller screens */
    max-width: 85%; /* Ensure it doesn’t exceed the container width */
    margin: 20px auto; /* Center the card and add spacing on sides */
    padding: 15px; /* Adjust padding for better fit */
    box-sizing: border-box; /* Include padding in the width calculation */
  }

  .meal-cards {
    display: flex;
    flex-direction: column; /* Stack meal cards in a column */
    gap: 10px; /* Space between meal cards */
    padding: 10px; /* Padding around the meal cards */
    margin-left: 7.5%; /* Align the meal cards with the main card */
    width: 85%; /* Ensure meal cards start from the same point as the main card */
    box-sizing: border-box;
  }

  .meal-card {
    width: 100%; /* Make meal cards take up full width of container */
    max-width: 100%; /* Ensure meal cards don’t exceed the container width */
    margin: 0 auto; /* Center the meal cards */
    box-sizing: border-box; /* Include padding in the width calculation */
  }
}

</style>
