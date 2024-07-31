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
    min-height: 53.6vh; /* Ensures the container takes up most of the viewport height */
    color: #c9b373;
    font-size: 18px;
    margin-bottom: -20px;
  }
  
  .error-image {
    width: 350px;
    height: 350px;
    margin-bottom: 10px;
  }
  
  .error-message {
    background-color: #000; /* Black background color */
    padding: 10px 20px; /* Padding around the message */
    border-radius: 8px;
  }
  </style>
  