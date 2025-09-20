<template>
  <div class="flex flex-col lg:flex-row shadow-lg p-6 bg-white">
    <!-- Main content -->
    <div class="w-full lg:w-3/4 
                pb-24 lg:pb-0" > <!-- เพิ่ม padding-bottom สำหรับมือถือ -->
      <router-view></router-view>
    </div>

    <!-- Buy/Sell sidebar - Desktop version -->
    <div class="hidden lg:block lg:w-1/4 lg:ml-4">
      <buy-sell />
    </div>

    <!-- Buy/Sell sidebar - Mobile version -->
    <div class="block lg:hidden fixed bottom-0 left-0 right-0 w-full bg-gray-900 p-4 z-[1000]">
      <buy-sell-mobile />
    </div>
  </div>
</template>


<script setup lang="ts">
import BuySell from "../components/buy-sell/Buy.Sell.vue";
import BuySellMobile from "../components/buy-sell/Buy.Sell.moblie.vue";
</script>

<style scoped lang="scss">
/* Add any additional styles here if needed */
</style>