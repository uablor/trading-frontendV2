<template>
  <a-layout-sider v-model:collapsed="adminSidebarOpen" :width="200">
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="light">
      <a-menu-item key="trading">
        <template #icon>
          <line-chart-outlined style="color: #000;" />
        </template>
        <router-link :to="{ name: 'admin.dashboard' }" @click="colseDrawer()">
          <span> dashboard</span>
        </router-link>
      </a-menu-item>

      <a-menu-item key="wallet">
        <template #icon>
          <wallet-outlined style="color: #000;" />
        </template>
        <router-link :to="{ name: 'admin.user' }" @click="colseDrawer()">
          <span>user</span>
        </router-link>
      </a-menu-item>

     

      <a-menu-divider />

      <a-menu-item key="logout" @click="showLogoutModal" class="logout-item">
        <template #icon>
          <logout-outlined style="color: #000;" />
        </template>
        <span>Logout</span>
      </a-menu-item>
    </a-menu>

  </a-layout-sider>
  <LogoutFrom :is-modal-visible="isModalVisible" @update:isModalVisible="isModalVisible = $event" />
</template>

<script setup lang="ts">
import LogoutFrom from '@/modules/auth/views/LogoutFrom.vue';

import { computed, ref, watch } from 'vue';
import {
  LineChartOutlined,
  WalletOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
const props = defineProps<{ isSidebarOpen: boolean }>();
const emit = defineEmits(['close-drawer']);
const adminSidebarOpen = ref<boolean>(false);

const colseDrawer = () => emit('close-drawer', false);
const isModalVisible = ref<boolean>(false);
const showLogoutModal = () => {
  isModalVisible.value = true;
  colseDrawer();
};
const route = useRoute();
const selectedKeys = ref<string[]>([]);

// map route.name -> menu key
const routeToMenuKey: Record<string, string> = {
  'customer.trading': 'trading',
  'customer.lucifer.trading': 'trading',
  'customer.lucifer.trading.btc': 'trading',
  'customer.lucifer.trading.eth': 'trading',
  'customer.wallet': 'wallet',
  'customer.profile': 'profile',
};

watch(
  () => route.name,
  (routeName) => {
    if (routeName) {
      const menuKey = routeToMenuKey[routeName as string];
      selectedKeys.value = menuKey ? [menuKey] : [];
    }
  },
  { immediate: true }
);



</script>

<style scoped lang="scss">
.ant-layout-sider {
  transition: all 0.2s !important;
}

:deep(.ant-menu-light) {
  background: #fff !important;

  .ant-menu-item {
    color: #000 !important;
  }

  .ant-menu-item:hover {
    background: #f5f5f5 !important;
    color: #000 !important;
  }

  .ant-menu-item-selected {
    background: #e6f7ff !important;
    color: #000 !important;
    font-weight: 500;
  }
}

.ant-layout-sider {
  width: 250px !important;
  transition: all 0.2s !important;

  @media screen and (max-width: 768px) {
    width: 200px !important;
  }

  @media screen and (max-width: 480px) {
    width: 150px !important;
  }
}
</style>