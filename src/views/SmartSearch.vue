<template>
    <div class="grocery-search-container">
      <div class="header-container">
        <h1>Grocery Search</h1>
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
              <label for="query">Search Query:</label>
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
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 70vh; /* Ensure it stretches to the bottom of the screen */
}

.header-container {
  background-color: #c9b373;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

h1 {
  text-align: center;
  margin: 0;
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center; /* Center align items horizontally */
  width: 100%; /* Ensure it takes full width */
}

.card {
  background-color: #000;
  color: #c9b373;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 30px;
  width: 100%;
  max-width: 600px;
}

.filter-group {
  margin-bottom: 20px;
  width: 100%; /* Ensure the input takes full width */
}

label {
  display: block;
  margin-bottom: 5px;
  color: #c9b373;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #222;
  color: #c9b373;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px 20px;
  background-color: #c9b373;
  border: none;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px; /* Added margin for spacing */
}

.search-button:hover {
  background-color: #bfa660;
}

.results-container {
  margin-top: 20px;
  width: 100%; /* Ensure it takes full width */
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.grocery-item {
  padding: 15px;
  border: 1px solid #444;
  border-radius: 8px;
  text-align: center;
  background-color: #000;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  h3 {
    margin: 10px 0;
    font-size: 22px;
    color: #c9b373;
  }
}
</style>
