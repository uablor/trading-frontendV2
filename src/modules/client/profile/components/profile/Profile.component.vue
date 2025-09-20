<template>
  <a-card class="bg-gray-800 text-white rounded-lg shadow-lg lg:h-[500px]  " bordered>
    <template #title>
      <span class="text-xl font-semibold">{{ $t("profile.title") }}</span>
    </template>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-full">
      <a-spin size="large" />
    </div>

    <!-- Profile Content -->
    <div v-else>
      <div class="flex flex-col items-center">
        <a-avatar :src="profile.avatar" size="large" class="!w-24 !h-24" />
        <span class="font-semibold mt-2">{{ profile.username }}</span>
        <EditProfileComponent />
      </div>

      <div class="mt-6 bg-gray-50 p-4 shadow-lg rounded-lg  space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-gray-500 font-medium">{{ $t("profile.email") }}:</span>
          <span class="text-gray-800 font-semibold">{{ profile.email }}</span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-gray-500 font-medium">{{ $t("profile.username") }}:</span>
          <span class="text-gray-800 font-semibold">{{ profile.username }}</span>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { useProfile } from '../../composables/profile/useProfile';
import { useProfileStore } from '../../stores/profile.store';
import EditProfileComponent from "./EditProfileModal.vue";
const { profile } = useProfileStore();
const { loading } = useProfile();
</script>

<style scoped>
/* ใช้ tailwind เป็นหลัก เลยไม่ต้องเพิ่ม CSS เยอะ */
</style>
