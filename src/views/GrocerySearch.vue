<template>
    <div class="results-container">
      <div class="header-container">
        <h1>Search Results for Grocery Products: "{{ $route.query.searchQuery }}"</h1>
      </div>
      <div v-if="products.length" class="grid">
        <div v-for="product in products" :key="product.id" class="grocery-item">
          <img :src="product.image" alt="Product Image" v-if="product.image" />
          <h2>{{ product.title }}</h2>
          <p v-if="product.ingredients">Ingredients: {{ product.ingredients.map(i => i.name).join(', ') }}</p>
          <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }" class="view-details-button">View Details</router-link>
        </div>
      </div>
      <div v-else>
        <p>No results found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import apiService from '@/apiService';
  
  export default {
    data() {
      return {
        products: [],
        error: null,
        loading: true
      };
    },
    created() {
      this.searchResults();
    },
    methods: {
      searchResults() {
        const query = this.$route.query.searchQuery;
        apiService.searchGroceryProducts(query)
          .then(response => {
            this.products = response.data;
          })
          .catch(error => {
            this.error = "There was an error fetching the products.";
            console.error("Error:", error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .results-container {
    padding: 60px 20px; /* Padding around the content */
    max-width: 1200px;
    margin: 0 auto;
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
    color: #fff; /* White text color */
    font-family: 'Roboto', sans-serif; /* Nice font */
    font-size: 28px;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .grocery-item {
    padding: 15px;
    border: 1px solid #444; /* Dark border color */
    border-radius: 8px;
    text-align: center;
    background-color: #000; /* Black background color */
    color: #fff; /* White text color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .grocery-item img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
  }
  
  .grocery-item h2 {
    margin: 10px 0;
    font-size: 22px;
    color: #c9b373; /* Headline color */
  }
  
  .grocery-item p {
    margin: 5px 0;
    font-size: 16px;
    color: #ccc; /* Light gray text color */
  }
  
  .view-details-button {
    display: inline-block;
    margin-top: 10px;
    padding: 8px 15px;
    background: #c9b373; /* Button background color */
    color: white;
    border-radius: 4px;
    text-decoration: none;
  }
  
  .view-details-button:hover {
    background: #bfa660; /* Darker shade for hover effect */
  }
  </style>
  