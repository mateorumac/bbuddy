<template>
  <div class="combined-container">
    <div class="header-container">
      <h1 class="title">Recipe of the Day</h1>
    </div>
    <div class="content-container">
      <LoadingSpinner v-if="loading" loadingText="Loading recipe of the day..." />
      <ErrorOrNoResults v-else-if="error" :message="error" />
      <div v-else class="recipe-of-the-day card">
        <h3>{{ recipe.title }}</h3>
        <img :src="recipe.image" alt="Recipe Image" />
        <p v-html="cleanSummary"></p>
        <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id } }" class="view-details-button">View Details</router-link>
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
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
}

.header-container {
  background-color: #000;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
}

.title {
  color: #c9b373;
  font-family: 'Lora', serif;
  font-size: 36px;
  margin: 0;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background-color: #000;
  color: #f8f5e1;
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
  font-family: 'Lora', serif;
  font-size: 24px;
}

p {
  color: #e0e0e0;
  font-family: 'Roboto', sans-serif;
}

.view-details-button {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background: #c9b373;
  color: #000;
  border-radius: 5px;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  transition: background 0.3s;

  &:hover {
    background: #bfa660;
  }
}

@media (max-width: 768px) {
  .combined-container {
    padding: 60px 10px; /* Adjust padding for mobile view */
    max-width: 90%; /* Set width to 90% of the available space */
    margin: 0 auto;
    margin-top: 70px; /* Add consistent margin from the top */
  }

  .header-container {
  background: #000;
  padding: 10px 10px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: fit-content;
  border-radius: 5px;
  color: #c9b373;
  font-family: 'Lora', serif;
  }

  .title {
    font-size: 28px; /* Adjust title font size for mobile view */
    margin: 0 auto; /* Center the title within its parent */
    padding: 5px 15px; /* Add padding to wrap the text inside the rectangle */
    word-wrap: break-word; /* Ensure text wraps properly */
    text-align: center; /* Ensure the title is centered */
    background-color: #000; /* Ensure the rectangle is black */
    display: inline-block; /* Make the container wrap the content */
    border-radius: 5px; /* Slight border radius */
    
  }

  .content-container {
    gap: 15px; /* Reduce gap between content items */
    width: 90%; /* Match the width to the header container */
    margin: 0 auto; /* Center the content container */
  }

  .card {
    padding: 20px; /* Adjust padding for better fit on mobile */
    width: 100%; /* Ensure the card takes up full width of the container */
    margin: 0 auto 20px auto; /* Center the card and add space below it */
    box-sizing: border-box; /* Ensure padding is included in width calculation */
    font-size: 18px; /* Increase the font size to match the other views */
    line-height: 1.6; /* Ensure proper readability */
  }

  .recipe-of-the-day img {
    max-width: 100%;
    height: auto;
    border-radius: 8px; /* Slightly reduce border radius for smaller screens */
    margin-bottom: 15px; /* Adjust margin below the image */
  }

  h3 {
    font-size: 22px; /* Adjust heading font size for mobile */
    margin-bottom: 10px; /* Adjust margin below heading */
    text-align: center; /* Center align the text */
    color: #c9b373; /* Gold color for consistency */
    font-family: 'Lora', serif; /* Consistent font for headings */
  }

  p {
    font-size: 18px; /* Adjust paragraph font size to be consistent with other views */
    line-height: 1.6; /* Ensure readability with proper line height */
    margin-bottom: 15px; /* Adjust margin below paragraph */
  }

  .view-details-button {
    width: 100%; /* Make button take up full width of the card */
    padding: 10px 0; /* Adjust padding for mobile */
    font-size: 18px; /* Adjust font size for button text */
    text-align: center; /* Center text in the button */
    box-sizing: border-box; /* Ensure padding is included in width calculation */
  }
}

@media (max-width: 480px) {
  .combined-container {
    padding: 60px 5px; /* Further adjust padding for very small screens */
    max-width: 95%; /* Set width to 95% of the available space */
    margin: 0 auto;
    margin-top: 70px; /* Consistent margin from the top */
  }

  .header-container {
  background: #000;
  padding: 10px 10px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: fit-content;
  border-radius: 5px;
  color: #c9b373;
  font-family: 'Lora', serif;
  }

  .title {
    font-size: 24px; /* Further adjust title font size */
    margin: 0 auto; /* Center the title within its parent */
    padding: 5px 15px; /* Add padding to wrap the text inside the rectangle */
    word-wrap: break-word; /* Ensure text wraps properly */
    text-align: center; /* Ensure the title is centered */
    background-color: #000; /* Ensure the rectangle is black */
    display: inline-block; /* Make the container wrap the content */
    border-radius: 5px; /* Slight border radius */
    width: fit-content; /* Make the width fit the content */
  }

  .content-container {
    gap: 10px; /* Further reduce gap between content items */
    width: 95%; /* Match the width to the header container */
    margin: 0 auto; /* Center the content container */
  }

  .card {
    padding: 15px; /* Further adjust padding */
    width: 100%; /* Ensure the card takes up full width of the container */
    margin: 0 auto 20px auto; /* Center the card and add space below it */
    box-sizing: border-box; /* Ensure padding is included in width calculation */
    font-size: 18px; /* Increase the font size to match the other views */
    line-height: 1.6; /* Ensure proper readability */
  }

  .recipe-of-the-day img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px; /* Further adjust margin below the image */
  }

  h3 {
    font-size: 20px; /* Further adjust heading font size */
    margin-bottom: 8px; /* Further adjust margin below heading */
    text-align: center; /* Center align the text */
    color: #c9b373; /* Gold color for consistency */
    font-family: 'Lora', serif; /* Consistent font for headings */
  }

  p {
    font-size: 18px; /* Adjust paragraph font size to be consistent with other views */
    line-height: 1.6; /* Ensure readability with proper line height */
    margin-bottom: 12px; /* Further adjust margin below paragraph */
  }

  .view-details-button {
    width: 100%; /* Make button take up full width of the card */
    padding: 10px 0; /* Adjust padding for button */
    font-size: 18px; /* Further adjust font size */
    text-align: center;
    box-sizing: border-box; /* Ensure padding is included in width calculation */
  }
}

</style>
