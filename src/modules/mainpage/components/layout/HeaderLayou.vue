<template>
  <a-layout-header class="header">
    <div class="logo">
      <img src="@/assets/image/logo/R.png" alt="logo" />
      <span class="title">Lucifer Trade</span>
    </div>

    <div class="header-right">
      <!-- Wallet Dropdown -->
      <WalletDropdown />

      <!-- Notification -->
      <a-button type="text" @click="showDrawer">
        🔔
      </a-button>

      <!-- Avatar -->
      <a-avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=123" />
    </div>

    <!-- Drawer สำหรับ Notification -->
    <a-drawer title="Notifications" placement="right" :open="drawerVisible" @close="drawerVisible = false">
      <p>You have 3 new messages.</p>
      <p>Account update successful.</p>
      <p>Welcome to Lucifer Trade 🚀</p>
    </a-drawer>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WalletDropdown from "../../../client/layout/wallet.component.vue";

const drawerVisible = ref(false);

const showDrawer = () => {
  drawerVisible.value = true;
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #001529;
  padding: 0 20px;

  .logo {
    display: flex;
    align-items: center;

    img {
      height: 32px;
      margin-right: 8px;
    }

    .title {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
