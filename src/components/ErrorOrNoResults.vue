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
  min-height: 62.9vh; 
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
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px 30px;
  border-radius: 10px;
  color: #f8f5e1;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  margin: 0 auto;
}
</style>
