<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} TV TONIGHT. All rights reserved.</p>
      <p class="attribution">
        Data provided by
        <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer">TVMaze.com</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #121212;
  color: #e5ecee;
  padding: 0 0 2rem 0;
  text-align: center;
  margin-top: auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Work Sans', sans-serif;
}

p {
  margin: 0;
  font-size: 0.9rem;
}

a {
  color: #7da3cc;
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: #66b2ff;
  text-decoration: underline;
}
</style>
