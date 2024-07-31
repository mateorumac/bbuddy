<template>
    <div class="spinner">
      <div class="loader"></div>
    </div>
  </template> 
  <style scoped>
  .spinner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
  }
  
  .loader {
  border: 16px solid #000; /* Light grey border */
  border-top: 16px solid #c9b373; /* Colored top border */
  border-radius: 50%;
  border-color: #f3f3f3 #f3f3f3 #f3f3f3 #c9b373; /* Ensure the right segment is colored */
  width: 200px;
  height: 200px;
  animation: spin 1.5s linear infinite;
}  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  