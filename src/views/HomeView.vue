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
            <p>Welcome to Bite Buddy, your premium destination for culinary inspiration and gourmet meal planning. With Bite Buddy, you can effortlessly explore and discover exquisite recipes tailored to your ingredients and preferences.</p>
            <p>Our app, powered by the cutting-edge Spoonacular API, provides you with access to an extensive collection of the most current and celebrated recipes. Whether you're an avid home cook or a culinary enthusiast, Bite Buddy helps you search for groceries and generate personalized meal plans. You can even search for recipes by simply entering the ingredients you have on hand.</p>
            <p>Not sure what to prepare next? Our 'Inspire Me' section offers a randomly generated recipe to elevate your dining experience. Begin your culinary journey with Bite Buddy today, and let us inspire your next gourmet creation.</p>
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
html {
  scroll-behavior: smooth;
}

p {
  color: #e0e0e0;
}

body {
  overflow-x: hidden;
  margin: 0;
  color: #000;
  font-family: 'Roboto', sans-serif;
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
  max-width: 900px; /* Increased max-width for wider card */
  padding: 20px;
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  color: #ffffff;
  max-width: 800px; /* Increased max-width for wider card */
  width: 100%;
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-card {
  margin-top: 10px;
  margin-bottom: 10px;
}

.about-card {
  background-color: #2c2c2c;
  color: #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  text-align: left;
  max-width: 900px; /* Increased max-width for wider card */
  width: 100%;

  h1 {
    color: #c9b373;
    font-size: 28px;
    margin-bottom: 15px;
    font-family: 'Lora', serif;
    text-align: center;
  }

  p {
    font-size: 18px;
    line-height: 1.8;
    margin-bottom: 15px;
    font-family: 'Roboto', sans-serif;
    color: #e0e0e0;
  }
}

.hero-logo {
  width: 240px;
  height: 240px;
  margin-bottom: -50px;
  margin-top: -40px;
  animation: bounceIn 1s ease-out;

  @keyframes bounceIn {
    0%, 20%, 40%, 60%, 80%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    70% {
      transform: translateY(-5px);
    }
    90% {
      transform: translateY(-2px);
    }
  }
}

h1 {
  font-size: 36px;
  color: #c9b373;
  margin-bottom: 10px;
  font-family: 'Lora', serif;
}

p {
  font-size: 20px;
  margin-bottom: 10px;
  line-height: 1.6;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  color: #ffffff;
  background: #c9b373;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #bfa660;
    transform: scale(1.05);
  }
}

</style>
