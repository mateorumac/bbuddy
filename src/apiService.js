import axios from 'axios';

const apiKey = process.env.VUE_APP_SPOONACULAR_API_KEY;
const baseUrl = 'https://api.spoonacular.com';

const apiService = {
  searchRecipes(query) {
    return axios.get(`${baseUrl}/recipes/complexSearch`, {
      params: { query, number: 40, apiKey } // Fetch 20 results for recipes
    });
  },
  getRecipeDetails(id) {
    return axios.get(`${baseUrl}/recipes/${id}/information`, {
      params: { apiKey, includeNutrition: true }
    });
  },
  searchRecipesByIngredient(ingredient) {
    return axios.get(`${baseUrl}/recipes/findByIngredients`, {
      params: { ingredients: ingredient, number: 40, apiKey } // Fetch 20 results by ingredient
    });
  },
  searchRecipesByNutrients(query, minCalories, maxCalories) {
    return axios.get(`${baseUrl}/recipes/complexSearch`, {
      params: { query, minCalories, maxCalories, number: 40, apiKey } // Fetch 20 results for nutrients search
    });
  },
  searchGroceryProducts(query, number = 40) {
    return axios.get(`${baseUrl}/food/ingredients/search`, {
      params: { query, number, apiKey } // Fetch 20 results for grocery products
    });
  },
  getWinePairing(food) {
    return axios.get(`${baseUrl}/food/wine/pairing`, {
      params: { food, apiKey }
    });
  },
  convertIngredientAmount(ingredientName, sourceAmount, sourceUnit, targetUnit) {
    return axios.get(`${baseUrl}/recipes/convert`, {
      params: {
        ingredientName, sourceAmount, sourceUnit, targetUnit, apiKey
      }
    });
  },
  findIngredientSubstitutes(ingredientName) {
    return axios.get(`${baseUrl}/food/ingredients/substitutes`, {
      params: { ingredientName, apiKey }
    });
  },
  getMealPlan(date, targetCalories, preferences = {}) {
    // Ensuring default preferences are set if not provided
    const params = {
      apiKey: apiKey,
      timeFrame: 'day',
      targetCalories: targetCalories,
      date: date,
      ...preferences // Merging preferences safely with default parameters
    };
  
    return axios.get(`${baseUrl}/mealplanner/generate`, {
      params
    });
  },
  getSimilarRecipes(id) {
    return axios.get(`${baseUrl}/recipes/${id}/similar`, {
      params: { apiKey }
    });
  },
  getNutritionalAnalysis(meals) {
    if (!meals || !meals.length) {
      console.error("No meals provided for nutritional analysis.");
      return Promise.reject("No meals provided.");
    }
    const ingredients = meals.flatMap(meal => meal.ingredients || []).map(ingredient => ingredient.name).filter(Boolean).join(',');
    return axios.get(`${baseUrl}/recipes/analyze`, {
      params: {
        apiKey,
        ingredientList: ingredients
      }
    });
  },
  generateShoppingList(meals) {
    if (!meals || !meals.length) {
      console.error("No meals provided for generating a shopping list.");
      return Promise.reject("No meals provided.");
    }
    const ingredients = meals.flatMap(meal => meal.ingredients || []).map(ingredient => ingredient.name).filter(Boolean).join(',');
    return axios.post(`${baseUrl}/mealplanner/shopping-list`, {
      apiKey,
      ingredients
    });
  },
  customizeMealPlan(preferences) {
    return axios.get(`${baseUrl}/mealplanner/generate`, {
      params: {
        apiKey: apiKey,
        timeFrame: 'day',
        ...preferences
      }
    });
  },
  advancedRecipeSearch(query, filters) {
    return axios.get(`${baseUrl}/recipes/complexSearch`, {
      params: {
        apiKey: apiKey,
        query: query,
        diet: filters.diet,
        intolerances: filters.intolerances,
        number: 20 // Fetch 20 results for advanced search
      }
    });
  },
  getRecipeOfTheDay() {
    return axios.get(`${baseUrl}/recipes/random`, {
      params: { apiKey, number: 1 }
    }).then(response => response.data.recipes[0]);
  }
};

export default apiService;
