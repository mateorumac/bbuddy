<template>
  <div class="footer-wrapper">
    <footer>
      <div class="footer-content">
        <p>&copy; 2024 Mateo Rumac. All rights reserved.</p>
        <div class="social-icons">
          <a href="https://www.linkedin.com/in/mateo-rumac-170a0b304/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
          <a href="https://github.com/mateorumac" target="_blank"><i class="fab fa-github"></i></a>
          <a href="https://www.instagram.com/rooksoni/" target="_blank"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped lang="scss">
.footer-wrapper {
  margin-top: 0;
  width: 100%;
  position: relative;
}

footer {
  background: #f8f5e1;
  color: #2c2c2c;
  text-align: center;
  padding: 20px 0;
  width: 100%;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  border-top: 2px solid #8c8c8c;

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      margin: 0;
      padding: 5px 0;
      color: #2c2c2c;
      font-size: 16px;
    }

    .social-icons {
      margin-top: 10px;
      display: flex;
      gap: 20px;

      a {
        color: #2c2c2c;
        font-size: 20px;
        position: relative;
        transition: color 0.3s ease;

        &:hover {
          color: #c9b373;
        }

        &:hover::after {
          transform: scaleX(1);
        }

        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          transform: scaleX(0);
          transform-origin: bottom left;
          transition: transform 0.3s ease;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .footer-wrapper {
    margin-left: 22px;
  }
}

</style>
