<template>
  <div class="flex lg:flex-row md:flex-col sm:flex-col rounded-2xl shadow-lg p-6 bg-white">
    <!-- Main content -->
    <div class="lg:w-4/5">
      <router-view></router-view>
    </div>

    <!-- Buy/Sell sidebar -->
    <div class="lg:w-1/5 mt-4 lg:mt-0">
      <buy-sell />
    </div>
  </div>
</template>

<script setup lang="ts">
import { markRaw } from "vue";
import BuySell from "../components/buy-sell/Buy.Sell.vue";

// Optional: mark component as raw to prevent proxy overhead
const buySell = markRaw(BuySell);
</script>

<style scoped lang="scss">

</style>
