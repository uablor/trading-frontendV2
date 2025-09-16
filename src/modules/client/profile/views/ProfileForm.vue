<template>
  <div class="flex flex-col lg:flex-row gap-5 lg:gap-10 md:flex-col">

    <div class="w-full lg:w-1/3">
      <ProfileComponent />
    </div>

    <div class="w-full lg:w-2/3">
      <SecurityComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileComponent from '../components/profile/Profile.component.vue';
import SecurityComponent from '../components/security/Security.component.vue';
</script>

<style scoped lang="scss">
</style>
