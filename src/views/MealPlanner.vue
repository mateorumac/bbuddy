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
          this.switchToMainView(); 
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
      return meal.image || 'default-image-url.jpg'; 
    },
    goToRecipe(id) {
      this.$router.push({ name: 'RecipeDetails', params: { id } });
    }
  }
};
</script>

<style scoped lang="scss">
.meal-planner-container {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 83.5vh;
  box-sizing: border-box;
}

.card {
  background-color: rgba(0, 0, 0, 0.5);
  color: #f8f5e1; 
  border-radius: 15px;
  padding: 50px;
  width: 100%;
  max-width: 800px; 
  margin-top: 136px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
}

h1 {
  color: #c9b373;
  font-family: 'Lora', serif;
  font-size: 36px;
  margin-top: -20px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.description {
  margin-bottom: 20px;
  color: #f8f5e1;
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  line-height: 1.8;
  text-align: center;
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
  gap: 15px;
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
  margin-top: 15px;
  margin-bottom: -20px;
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
  flex-wrap: nowrap; 
  overflow-x: auto; 
  overflow-y: hidden;
  padding: 10px;
}

.meal-card {
  background-color: rgba(0, 0, 0, 0.5); 
  border-radius: 15px;
  padding: 20px;
  color: #f8f5e1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 10px; 
  flex: 0 0 auto; 
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 300px; 
  backdrop-filter: blur(15px);
}

.meal-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.meal-plan-header h2 {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  width: fit-content;
  color: #c9b373;
  font-family: 'Lora', serif;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
}

.meal-card h3 {
  color: #c9b373;
  font-family: 'Lora', serif;
  font-size: 28px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}

.meal-card p {
  color: #f8f5e1;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

@media (max-width: 768px) {
  .meal-planner-container {
    margin-top: 150px;
  }

  .card {
    width: 90%; 
    max-width: 90%; 
    margin: 20px auto; 
    padding: 40px;
    box-sizing: border-box; 
  }

  h1 {
    font-size: 32px;
    padding-top: 20px;
    margin-bottom: 25px;
  }

  button {
    padding: 15px 30px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .meal-cards {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
    margin-left: 5%;
    width: 90%;
    box-sizing: border-box;
  }

  .meal-card {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }
}

@media (max-width: 480px) {
  .meal-planner-container {
    margin-top: 150px;
  }

  .card {
    width: 85%;
    max-width: 85%;
    margin: 20px auto;
    padding: 30px;
    box-sizing: border-box;
  }

  h1 {
    font-size: 28px;
    padding-top: 15px;
    margin-bottom: 20px;
  }

  button {
    padding: 12px 25px;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .meal-cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    margin-left: 7.5%;
    width: 85%;
    box-sizing: border-box;
  }

  .meal-card {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }
}


</style>
