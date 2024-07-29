<template>
    <div class="grocery-search-container">
      <div class="header-container">
      </div>
      <div class="content-container">
        <div v-if="loading">
          <LoadingSpinner />
        </div>
        <div v-else-if="error">
          <ErrorOrNoResults :message="error" />
        </div>
        <div v-else>
          <div class="search-filters card">
            <h2>Search for Grocery Products</h2>
            <div class="filter-group">
              <label for="query">What are you craving?</label>
              <input type="text" v-model="searchQuery" id="query" placeholder="Search for grocery products..." />
            </div>
            <button @click="searchGroceries" class="search-button"><i class="fas fa-search"></i> Search Groceries</button>
          </div>
          <div class="results-container" v-if="groceryProducts.length">
            <h2>Grocery Results</h2>
            <div class="grid">
              <div v-for="product in groceryProducts" :key="product.id" class="grocery-item">
                <img :src="product.image" alt="Product Image" v-if="product.image" />
                <h3>{{ product.name }}</h3>
              </div>
            </div>
          </div>
          <div v-else-if="searchPerformed && !groceryProducts.length">
            <ErrorOrNoResults message="No results found." />
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
        searchQuery: '',
        groceryProducts: [],
        searchPerformed: false,
        loading: false,
        error: null
      };
    },
    methods: {
      async searchGroceries() {
        this.searchPerformed = true;
        this.loading = true;
        this.error = null;
        try {
          const response = await apiService.searchGroceryProducts(this.searchQuery, 20); // Ensure fetching 20 results
          this.groceryProducts = response.data.results.map(product => {
            return {
              ...product,
              image: product.image ? `https://spoonacular.com/cdn/ingredients_100x100/${product.image}` : null
            };
          });
        } catch (error) {
          this.error = 'Error fetching grocery products';
          console.error('Error fetching grocery products:', error);
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>  

<style scoped>
.grocery-search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  max-width: 1200px;
  margin: auto; /* Centers the container on the page */
  min-height: 70vh; /* Ensures it stretches to cover most of the viewport height */
}

.header-container {
  text-align: center; /* Ensures header text is centered */
  padding: 20px;
  margin-bottom: 20px; /* Provides spacing below the header */
}

.content-container {
  width: 100%; /* Full width of the parent container */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers all child elements */
}

.search-filters.card {
  width: 100%; /* Reduces width to make it more visually appealing */
  margin: 0 auto; /* Centers the card horizontally */
  padding: 25px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.2); /* Adds a subtle shadow for depth */
}

.filter-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.search-button {
  width: auto; /* Allows the button to grow as needed */
  padding: 10px 40px; /* Larger padding for a better touch area */
  margin-top: 10px; /* Ensures spacing from the last input field */
}

.results-container {
  width: 100%; /* Full width to accommodate all child elements */
  padding-top: 20px; /* Adds spacing above the results grid */
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid columns */
  gap: 20px;
}

.grocery-item {
  background-color: #282828; /* Darker background for contrast */
  padding: 20px;
  border-radius: 10px; /* Rounded corners for a smoother look */
  text-align: center; /* Ensures text alignment is centered */
  color: #fff; /* White text for readability */
}

.grocery-item img {
  width: 100%; /* Full width of the container */
  height: auto; /* Maintains aspect ratio */
  border-radius: 5px; /* Rounded corners for images */
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr); /* Four items per row on larger screens */
  }
}
</style>