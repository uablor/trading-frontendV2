<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#00b96b', 
      borderRadius: 12,       
      colorTextBase: '#333',  
    },
  }">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
