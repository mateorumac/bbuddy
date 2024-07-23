<template>
  <div class="footer-wrapper">
    <footer>
      <div class="footer-content">
        <p>&copy; 2024 Mateo Rumac. All rights reserved.</p>
        <div class="social-icons">
          <a href="https://www.linkedin.com/in/mateo-rumac-170a0b304/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
          <a href="https://www.facebook.com/Rooksoni21/" target="_blank"><i class="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/Rooksoni/" target="_blank"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
/* Ensure the footer is styled correctly */
.footer-wrapper {
  margin-top: 0;
  
}

footer {
  background: #000;
  color: white;
  text-align: center;
  padding: 20px 0;
  width: 100%;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  border-top: 2px solid #c9b373;
  position: absolute;

}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin: 0;
    padding: 5px 0;
    color: #c9b373;
  }

  .social-icons {
    margin-top: 10px;
    display: flex;
    gap: 20px;

    a {
      color: #c9b373;
      font-size: 20px;
      position: relative;
      transition: color 0.3s;

      &:hover::after {
        content: '';
        position: absolute;
        width: 120%;
        height: 2px;
        background-color: #c9b373;
        bottom: -5px;
        left: 0;
        transform: scaleX(1);
        transition: transform 0.3s;
      }

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #c9b373;
        bottom: -5px;
        left: 0;
        transform: scaleX(0);
        transition: transform 0.3s;
      }
    }
  }
}
</style>
