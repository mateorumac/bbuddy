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
.grocery-search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  margin: auto;
  min-height: 69.9vh;
  margin-top: 15px;
}

.search-filters.card {
  background-color: rgba(0, 0, 0, 0.5);
  color: #f8f5e1;
  border-radius: 15px;
  padding: 50px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.search-filters.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
}

.title1 {
  margin-top: -20px;
  margin-bottom: -15px;
  color: #c9b373;
  font-family: 'Lora', serif;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
}

.card-description {
  margin-bottom: 20px;
  color: #f8f5e1;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  line-height: 1.8;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
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
  margin-top: 30px;
  margin-bottom: -10px;
  
}

.search-button:hover {
  background-color: #bfa660;
}

.results-title {
  background-color: rgba(0, 0, 0, 0.5);
  color: #c9b373;
  padding: 10px 20px;
  border-radius: 15px;
  display: inline-block;
  margin-bottom: 40px;
  font-family: 'Lora', serif;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
  gap: 20px;
  width: 100%; 
  padding: 20px 0;
  box-sizing: border-box;
}

.grocery-item {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  color: #f8f5e1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px); 
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.grocery-item:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.grocery-item h3 {
  color: #c9b373;
  font-family: 'Lora', serif;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.grocery-item img {
  width: 100%;
  height: auto;
  max-height: 150px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 15px;
}

.grocery-item p {
  font-family: 'Roboto', sans-serif;
  color: #f8f5e1;
  font-size: 16px; 
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .search-filters.card {
    width: 90%;
    max-width: 90%;
    margin: 20px auto;
    padding: 30px;
    box-sizing: border-box;
    margin-top: 50px;
  }

  .results-container {
    width: 90%;
    max-width: 90%;
    margin: 20px auto;
    box-sizing: border-box;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  .grocery-item {
    padding: 15px;
    border-radius: 8px;
  }

  .grocery-item img {
    max-height: 120px;
  }

  .grocery-item h3 {
    font-size: 18px;
  }

  .grocery-item p {
    font-size: 14px;
  }

  .results-title {
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;
  }

  .search-button {
    padding: 12px 35px;
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: -3px;
  }

  .title1 {
    padding-top: 20px;
  }
}

@media (max-width: 480px) {
  .search-filters.card {
    width: 85%;
    max-width: 85%;
    margin: 20px auto;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 50px;
  }

  .results-container {
    width: 85%;
    max-width: 85%;
    margin: 20px auto;
    box-sizing: border-box;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }

  .grocery-item {
    padding: 10px;
    border-radius: 6px;
  }

  .grocery-item img {
    max-height: 100px;
  }

  .grocery-item h3 {
    font-size: 16px;
  }

  .grocery-item p {
    font-size: 12px;
  }

  .results-title {
    font-size: 18px;
    margin-bottom: 15px;
    text-align: center;
  }

  .search-button {
    padding: 10px 30px;
    font-size: 16px;
    margin-top: 15px;
  }

  .title1 {
    padding-top: 15px;
  }
}

</style>

