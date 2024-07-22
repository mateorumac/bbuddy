import axios from 'axios';

const apiService = {
  searchRecipes(query) {
    return axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        query: query,
        apiKey: process.env.VUE_APP_SPOONACULAR_API_KEY
      }
    });
  },
  getRecipeDetails(id) {
    return axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey: process.env.VUE_APP_SPOONACULAR_API_KEY
      }
    });
  },
  searchRecipesByIngredient(ingredient) {
    return axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients: ingredient,
        number: 10,
        apiKey: process.env.VUE_APP_SPOONACULAR_API_KEY
      }
    });
  },
  searchRecipesByNutrients(query, minValue, maxValue) {
    return axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        query: query,
        minCalories: minValue,
        maxCalories: maxValue,
        apiKey: process.env.VUE_APP_SPOONACULAR_API_KEY
      }
    });
  },
  searchGroceryProducts(query) {
    return axios.get('https://api.spoonacular.com/food/ingredients/search', {
      params: {
        query: query,
        apiKey: process.env.VUE_APP_SPOONACULAR_API_KEY
      }
    });
  }
};

export default apiService;
