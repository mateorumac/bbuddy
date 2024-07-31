<template>
  <div id="home-view">
    <main :class="{ 'collapsed': isCollapsed }">
      <div class="hero-container">
        <div class="hero-content">
          <div class="card main-card">
            <img src="@/assets/logo_transparent.png" alt="App Logo" class="hero-logo" />
            <h1>Welcome to Bite Buddy!</h1>
            <p>Discover delicious recipes and explore a world of culinary possibilities with our easy-to-use recipe search app.</p>
            <button @click="toggleAboutCard">{{ showAboutCard ? 'Show Less' : 'Learn More' }}</button>
          </div>
          
          <div v-if="showAboutCard" class="card about-card">
            <h1>About Bite Buddy</h1>
            <p>Welcome to Bite Buddy, your go-to app for discovering delicious recipes and food ideas. With Bite Buddy, you can easily search for recipes using ingredients you have on hand and explore a wide range of recipes. Our app is powered by the Spoonacular API, ensuring you have access to the latest and most popular recipes available.</p>
            <p>Whether you're a home cook looking for new dinner ideas or a foodie exploring new dishes, Bite Buddy helps you find and save recipes that suit your taste. Start searching today and let Bite Buddy inspire your next meal!</p>
          </div>
          
        </div>
      </div>
    </main>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isCollapsed: false,
      showAboutCard: false
    };
  },
  methods: {
    toggleAboutCard() {
      this.showAboutCard = !this.showAboutCard;
    }
  }
};
</script>

<style lang="scss">

p{
  color:#bfa660;
}

body {
  overflow-x: hidden;
  margin: 0;
}

#home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 83vh;
  text-align: center;
  overflow-x: hidden;
  width: 100%;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
}

.hero-container {
  margin-top: 60px;
  width: 100%;
  max-width: 800px;
}
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.card {
  background-color: #000;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  text-align: center;
  color: #c9b373;
  max-width: 800px;
  width: 100%;
}

.main-card {
  margin-top: 10px; /* Reduced margin for less space from top */
  margin-bottom: 10px; /* Reduced margin for less space from bottom */
}

.about-card {
  background-color: #000;
  color: #c9b373;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  max-width: 800px;
  width: 100%;

  h1 {
    color: #c9b373;
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    line-height: 1.6;
  }
}

.hero-logo {
  width: 240px;
  height: 240px;
  margin-bottom: -50px;
  margin-top: -40px;
}

h1 {
  font-size: 36px;
  color: #c9b373;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;
}

p {
  font-size: 20px;
  margin-bottom: 10px;
  line-height: 1.6;
  font-family: 'Roboto', sans-serif;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  color: #000;
  background: #c9b373;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    background: #bfa660;
  }
}

</style>
