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
  min-height: 84.5vh;
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
  max-width: 900px;
  padding: 20px;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.card {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  padding: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  max-width: 900px;
  width: 100%;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
}

.main-card h1 {
  font-size: 40px;
  line-height: 1.2;
  color: #c9b373;
  font-family: 'Lora', serif;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
}

.main-card p {
  font-size: 20px;
  line-height: 1.8;
  margin-bottom: 30px;
  color: #f8f5e1;
  font-family: 'Roboto', sans-serif;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.about-card {
  margin-top: 40px; 
}

.about-card h1 {
  font-size: 36px;
  color: #c9b373;
  font-family: 'Lora', serif;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
}

.about-card p {
  font-size: 20px;
  line-height: 1.8;
  margin-bottom: 20px;
  color: #f8f5e1;
  font-family: 'Roboto', sans-serif;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

button {
  padding: 15px 30px;
  font-size: 20px;
  background-color: #c9b373;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #000;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #bfa660;
  transform: scale(1.05);
}

.hero-logo {
  width: 240px;
  height: 240px;
  margin-bottom: -50px;
  margin-top: -40px;
  animation: bounceIn 1s ease-out;
}

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

@media (max-width: 768px) {
  #home-view {
    padding-left: 0;
    padding-right: 0;
    margin-right: auto;
    margin-left: -8px;
    width: 100%;
    padding-top: 70px;
  }

  .hero-container {
    width: 100%;
    padding: 10px;
    margin: 0 auto;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .card, .about-card {
    width: 85%;
    max-width: 85%;
    margin: 20px auto;
    padding: 15px;
    box-sizing: border-box;
  }

  .about-card {
    text-align: center;
    margin-top: 20px;
  }

  .about-card p {
    font-size: 18px;
    line-height: 1.6;
  }
}

@media (max-width: 480px) {
  .card, .about-card {
    width: 85%;
    max-width: 85%;
    margin: 20px auto;
    padding: 10px;
    box-sizing: border-box;
  }

  h1 {
    font-size: 28px;
  }

  p {
    font-size: 16px;
  }

  button {
    padding: 8px 16px;
    font-size: 16px;
  }
}
</style>
