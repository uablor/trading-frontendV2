<template>
   <div v-if="loading" class="flex items-center justify-center h-full">
    <a-spin size="large" />
  </div>
  <div v-else ref="chartContainer" class="chart-container h-[450px] w-full"></div>
 

</template>

<script lang="ts" setup>
import { useTradingChart } from '../../composables/useTradingChart';

// 🔹 เปลี่ยน symbol ได้เป็น 'btc', 'eth', 'doge' ...
const { chartContainer, loading } = useTradingChart('btc');
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>

