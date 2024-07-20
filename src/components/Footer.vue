<template>
  <div class="footer-wrapper">
    <footer>
      <div class="footer-content">
        <p>&copy; 2024 Mateo Rumac. All rights reserved.</p>
        <div class="social-icons">
          <a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin-in"></i></a>
          <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
          <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
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
  margin-top: auto;
}

footer {
  background: #000;
  color: white;
  text-align: center;
  padding: 20px 0;
  width: 100%;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
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
    a {
      color: #c9b373;
      margin: 0 10px;
      font-size: 20px;
      transition: color 0.3s;

      &:hover {
        color: #42b983;
      }
    }
  }
}
</style>
