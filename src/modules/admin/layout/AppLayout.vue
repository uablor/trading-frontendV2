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
      <a-layout-sider breakpoint="lg" theme="light" :style="{
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
        marginLeft: '200px',
        transition: 'all 0.2s',
      }" class=" ml-0 md:ml-20">
        <a-layout-content :style="{
          padding: '0px 24px',
          minHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
              <router-link :to="item.path">{{ item.title }}</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
          <router-view />
          <FooterLayout />

        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import FooterLayout from "./FooterLayout.vue";
import { useProfile } from "@/modules/client/profile/composables/profile/useProfile";
import NavbarComponent from "./NavbarLayout.vue";
import SidebarComponent from "./SidebarLayout.vue";

import { adminRoutes } from "@/router/routes/admin.routes";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

// รวม children ของ adminRoutes[0] ให้เป็น array เดียว
const allAdminRoutes = adminRoutes[0].children || [];
const route = useRoute();
const router = useRouter();
useProfile();
const findBreadcrumbs = (path: string) => {
  const segments = path.split("/").filter(Boolean);
  const crumbs: { path: string; title: string }[] = [];
  let currentPath = "";

  for (const segment of segments) {
    currentPath += "/" + segment;

    // หา meta.title จาก allAdminRoutes
    const match = allAdminRoutes.find((r) => r.path === currentPath);
    crumbs.push({
      path: currentPath,
      title: match?.meta?.title?.toString() || segment.toString(),
    });
  }

  return crumbs;
};

const breadcrumbs = computed(() => findBreadcrumbs(route.path));
const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped lang="scss">
.ant-layout-sider {
  transition: all 0.2s !important;

}
</style>
