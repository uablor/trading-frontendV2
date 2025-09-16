<template>
  <div class="text-white p-6 w-full h-full">
    <!-- Tabs Section -->
    <a-tabs v-model:activeKey="activeTab" class="custom-tabs">
      <a-tab-pane key="overview" :tab="$t('wallet.overview')">
        <div class="text-center">
          <div class="text-gray-400 mb-4">{{ $t("wallet.assetAllocation") }}</div>
          <div class="flex justify-center items-center">
            <div class="text-4xl">⚖️</div>
          </div>
        </div>
      </a-tab-pane>

      <a-tab-pane key="assets" :tab="$t('wallet.myAssets')">
        <div class="text-gray-400">{{ $t("wallet.myAssets") }} content...</div>
      </a-tab-pane>

      <a-tab-pane key="history" :tab="$t('wallet.transactionHistory')">
        <div class="text-gray-400">
          {{ $t("wallet.transactionHistory") }} content...
        </div>
      </a-tab-pane>
    </a-tabs>

    <!-- Date Filters -->
    <div
      class="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3 mt-6"
    >
      <a-segmented
        v-model:value="activeFilter"
        :options="[
          { label: $t('wallet.last7Days'), value: '7days' },
          { label: $t('wallet.last30Days'), value: '30days' },
          { label: $t('wallet.customize'), value: 'custom' },
        ]"
        class="bg-gray-800 text-white rounded-lg w-full sm:w-auto"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref("overview");
const activeFilter = ref("7days");
</script>

<style scoped>
.custom-tabs .ant-tabs-nav {
  margin-bottom: 1.5rem; /* mb-6 */
  border-bottom: 1px solid #374151; /* border-gray-700 */
}
.custom-tabs .ant-tabs-tab-btn {
  color: #9ca3af; /* text-gray-400 */
}
.custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
  color: #f97316; /* text-orange-500 */
  font-weight: 600;
}
.custom-tabs .ant-tabs-ink-bar {
  background: #f97316; /* orange-500 underline */
}
</style>
