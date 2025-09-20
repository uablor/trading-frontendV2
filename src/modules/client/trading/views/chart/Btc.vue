<template>
  <div class="relative w-full h-[450px]">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white z-50">
      <a-spin size="large" />
    </div>

    <div ref="chartContainer" class="chart-container h-full w-full z-10"></div>
  </div>
</template>

<script lang="ts" setup>
import { useTradingChart } from '../../composables/useTradingChart';

const { chartContainer, loading } = useTradingChart('btc');
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
