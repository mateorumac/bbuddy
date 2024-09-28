<template>
  <div class="error-container">
    <img src="@/assets/error.png" alt="Error Image" class="error-image" />
    <div class="error-message">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "No results found."
    }
  }
};
</script>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 54.7vh; 
  color: #c9b373;
  font-size: 18px;
  margin-bottom: -20px;
  font-family: 'Roboto', sans-serif; 
}

.error-image {
  width: 350px;
  height: 350px;
  margin-bottom: 10px;
  border-radius: 8px; 
}

.error-message {
  background-color: #000; 
  padding: 10px 20px; 
  border-radius: 8px;
  color: #c9b373; 
  font-family: 'Roboto', sans-serif; 
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}
</style>
