<template>
    <div class="combined-container">
      <div class="header-container">
        <h1>Recipe of the Day</h1>
      </div>
      <div class="content-container">
        <div class="recipe-of-the-day card">
          <div v-if="recipe">
            <h3>{{ recipe.title }}</h3>
            <img :src="recipe.image" alt="Recipe Image" />
            <p v-html="cleanSummary"></p>
            <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id } }" class="view-details-button">View Details</router-link>
          </div>
          <div v-else>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiService from '@/apiService';
  
  export default {
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
    padding: 60px 20px; /* Padding around the content */
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 60px;
  }
  
  .header-container {
    background-color: #c9b373; /* Background color for the header container */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  h1 {
    text-align: center;
    margin: 0;
    color: #000; /* Black text color */
    font-family: 'Roboto', sans-serif; /* Nice font */
    font-size: 28px;
  }
  
  .content-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .card {
    background-color: #000; /* Black background color */
    color: #c9b373; /* Text color */
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 30px;
  }
  
  .recipe-of-the-day img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #c9b373;
  }
  
  p {
    color: #ccc; /* Light gray text color */
  }
  
  .view-details-button {
    display: inline-block;
    margin-top: 10px;
    padding: 8px 15px;
    background: #c9b373; /* Button background color */
    color: #000; /* Black text color */
    border-radius: 4px;
    text-decoration: none;
  
    &:hover {
      background: #bfa660; /* Darker shade for hover effect */
    }
  }
  </style>
  