<template>
  <div class="grocery-search-container">
    <div class="content-container">
      <div v-if="loading">
        <LoadingSpinner />
      </div>
      <div v-else-if="error">
        <ErrorOrNoResults :message="error" />
      </div>
      <div v-else>
        <div class="search-filters card" :class="{ 'with-results': hasResults }">
          <h1 class="title1">Explore Our Grocery Search!</h1><br>
          <p class="card-description">Discover a world of culinary delights with our innovative grocery search tool! <br>
            <br>Effortlessly find grocery products tailored to your unique culinary needs and spice up <br> your meals with ease.
             From exotic spices to fresh produce, elevate your cooking experience today.</p><br>
          <div class="filter-group">
            <input type="text" v-model="searchQuery" id="query" placeholder="Search for grocery products..." class="search-input" />
          </div>
          <button @click="searchGroceries" class="search-button"><i class="fas fa-search"></i> Search Groceries</button>
        </div>
        <div class="results-container" v-if="groceryProducts.length">
          <h2 class="results-title">Grocery Results</h2>
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
  computed: {
    hasResults() {
      return this.groceryProducts.length > 0;
    }
  },
  methods: {
    async searchGroceries() {
      this.searchPerformed = true;
      this.loading = true;
      this.error = null;
      try {
        const response = await apiService.searchGroceryProducts(this.searchQuery, 20);
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

<style scoped lang="scss">
.title1 {
  margin-top: -5px;
  color: #c9b373;
  font-family: 'Lora', serif;
}

.grocery-search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  margin: auto;
  min-height: 62.5vh;
  margin-top: 70px;
}

.header-container {
  text-align: center;
  padding: 20px;
  margin-bottom: 20px;
}

p {
  color: #bfa660;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
}

.content-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-filters.card {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  background: #000;
  border-radius: 10px;
}

.card-description {
  margin-bottom: 20px;
  color: #f8f5e1;
}

.filter-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.search-input {
  width: 96%;
  padding: 12px;
  margin-top: 10px;
  border: 1px solid #c9b373;
  border-radius: 5px;
  background-color: #2c2c2c;
  color: #f8f5e1;
}

.search-button {
  width: auto;
  padding: 10px 40px;
  background-color: #c9b373;
  border: none;
  border-radius: 5px;
  color: #2c2c2c;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
}

.search-button:hover {
  background-color: #bfa660;
}

.results-container {
  width: 100%;
  padding-top: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.grocery-item {
  background-color: #282828;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
}

.grocery-item img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.search-filters.card.with-results {
  margin-top: 60px; /* Adds space when results are present */
}

.results-title {
  background-color: #2c2c2c;
  color: #c9b373;
  padding: 10px 20px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 40px;
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

</style>
