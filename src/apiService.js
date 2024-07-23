import axios from 'axios';

const apiKey = process.env.VUE_APP_SPOONACULAR_API_KEY;
const baseUrl = 'https://api.spoonacular.com';

const apiService = {
  searchRecipes(query) {
    return axios.get(`${baseUrl}/recipes/complexSearch`, {
      params: { query, apiKey }
    });
  },
  getRecipeDetails(id) {
    return axios.get(`${baseUrl}/recipes/${id}/information`, {
      params: { apiKey, includeNutrition: true }
    });
  },
  searchRecipesByIngredient(ingredient) {
    return axios.get(`${baseUrl}/recipes/findByIngredients`, {
      params: { ingredients: ingredient, number: 10, apiKey }
    });
  },
  searchRecipesByNutrients(query, minCalories, maxCalories) {
    return axios.get(`${baseUrl}/recipes/complexSearch`, {
      params: { query, minCalories, maxCalories, apiKey }
    });
  },
  searchGroceryProducts(query) {
    return axios.get(`${baseUrl}/food/ingredients/search`, {
      params: { query, apiKey }
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
  getMealPlan(date, targetCalories) {
    return axios.get(`${baseUrl}/mealplanner/generate`, {
      params: {
        apiKey: apiKey,
        timeFrame: 'day',
        targetCalories: targetCalories,
        date: date
      }
    });
  },
  getSimilarRecipes(id) {
    return axios.get(`${baseUrl}/recipes/${id}/similar`, {
      params: { apiKey }
    });
  },
  getNutritionalAnalysis(meals) {
    const ingredients = meals.map(meal => meal.ingredients).flat().map(ingredient => ingredient.name).join(',');
    return axios.get(`${baseUrl}/recipes/analyze`, {
      params: {
        apiKey: apiKey,
        ingredientList: ingredients
      }
    });
  },
  generateShoppingList(meals) {
    const ingredients = meals.map(meal => meal.ingredients).flat().map(ingredient => ingredient.name).join(',');
    return axios.post(`${baseUrl}/mealplanner/shopping-list`, {
      apiKey: apiKey,
      ingredients: ingredients
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
        ...filters
      }
    });
  }
};

export default apiService;
