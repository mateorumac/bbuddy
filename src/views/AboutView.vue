<template>
  <div class="about-container">
    <div class="image-placeholder">
      <!-- Insert image here later 
      <img src="@/assets/about-placeholder.png" alt="About Image" /> -->
    </div>
    <div class="content">
      <h1>About Bite Buddy</h1>
      <p>
        Welcome to Bite Buddy, your go-to app for discovering delicious recipes and food ideas. With Bite Buddy, you can easily search for recipes using ingredients you have on hand, explore a wide range of recipes, and save your favorites. Our app is powered by the Spoonacular API, ensuring you have access to the latest and most popular recipes available.
      </p>
      <p>
        Whether you're a home cook looking for new dinner ideas or a foodie exploring new dishes, Bite Buddy helps you find and save recipes that suit your taste. Start searching today and let Bite Buddy inspire your next meal!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
};
</script>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;

  .image-placeholder {
    width: 100%;
    max-width: 600px;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
  }

  .content {
    max-width: 800px;

    h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 20px;
    }
  }
}
</style>
