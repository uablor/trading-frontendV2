<template>
  <a-layout style="min-height: 100vh;">
    <!-- Navbar Fixed Top -->
    <NavbarComponent :style="{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: '#fff',
      borderBottom: '1px solid #f0f0f0',
    }" />

    <!-- Layout body -->
    <a-layout style="margin-top: 64px;">
      <!-- Sidebar -->
      <a-layout-sider :width="80" breakpoint="lg" theme="light" :style="{
        position: 'fixed',
        top: '64px',
        left: 0,
        bottom: 0,
        height: 'calc(100vh - 64px)',
        overflow: 'auto',
        zIndex: 999,
      }" class=" hidden md:block">
        <SidebarComponent :is-sidebar-open="true" />
      </a-layout-sider>

      <!-- Content -->
      <a-layout :style="{
        // marginLeft: '80px',
        transition: 'all 0.2s',
      }" class=" ml-0 md:ml-20">
        <a-layout-content :style="{
          padding: '24px',
          minHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import NavbarComponent from "./NavbarLayout.vue";
import SidebarComponent from "./SidebarLayout.vue";
import { useProfile } from "../profile/composables/profile/useProfile";
useProfile();

</script>

<style scoped lang="scss">
.ant-layout-sider {
  transition: all 0.2s !important;

}
</style>
