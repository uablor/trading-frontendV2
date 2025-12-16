<template>
  <a-layout-footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        &copy; 2025 Lucifer Trade. All rights reserved.
      </div>
      <div class="footer-right">
        <a href="#" target="_blank">Privacy Policy</a>
        <span class="separator">|</span>
        <a href="#" target="_blank">Terms of Service</a>
      </div>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
// ไม่มี logic พิเศษใน Footer
</script>

<style scoped>
.footer {
  padding: 16px 50px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-left {
  font-size: 14px;
}

.footer-right a {
  margin: 0 4px;
  text-decoration: none;
}

.footer-right .separator {
  margin: 0 4px;
}

.footer-right a:hover {
  text-decoration: underline;
}
</style>
