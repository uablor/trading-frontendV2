<template>
  <!-- Trigger Button -->
  <a-button type="primary" class="bg-purple-600 hover:bg-purple-700" @click="openModal">
    {{ $t("wallet.deposit") }}
  </a-button>

  <!-- Modal -->
  <a-modal v-model:open="showModal" :footer="null" centered width="450px" class="custom-modal" @cancel="closeModal">
    <template #title>
      <span class="text-lg font-semibold text-white">Deposit Crypto</span>
    </template>

    <!-- Tabs -->
    <a-tabs v-model:activeKey="activeTab" class="custom-tabs">
      <!-- Internal Tab -->
      <a-tab-pane key="internal" tab="Internal Network">
        <div class="text-gray-400 text-sm">
          <div class="mb-2">Username</div>
          <div class="flex justify-between items-center bg-gray-800 p-2 rounded mb-4">
            <span class="text-white">{{ profile.username }}</span>
            <a-button type="link" class="ml-auto text-purple-500" @click="copyToClipboard(profile.username)">
              <CopyOutlined />
              Copy
            </a-button>
          </div>

          <div class="text-center">
            <img src="https://th.bing.com/th/id/OIP.ZFt9Ib6ypFgdYK14UxUAhwHaHa?w=204&h=204" alt="QR Code"
              class="w-[300px] mx-auto" />
          </div>

          <div class="text-purple-400 text-sm text-center mt-4">
            Lucifer Trade Wallet<br />
            This QR Code is used for transferring funds within BXTrade.net.
          </div>
        </div>
      </a-tab-pane>

      <!-- Crypto Tab -->
      <a-tab-pane key="crypto" tab="Crypto Network">
        <div class="text-gray-400 text-sm space-y-6">
          <!-- Select Crypto -->
          <div>
            <label class="block text-gray-300 text-lg mb-2">Select Crypto</label>
            <a-select placeholder="Choose crypto" class="w-full">
              <a-select-option value="BTC">Bitcoin</a-select-option>
              <a-select-option value="ETH">Ethereum</a-select-option>
            </a-select>
          </div>

          <!-- Select Network -->
          <div>
            <label class="block text-gray-300 text-lg mb-2">Select Network</label>
            <a-select placeholder="Choose network" class="w-full">
              <a-select-option value="ERC20">ERC20</a-select-option>
              <a-select-option value="BEP20">BEP20</a-select-option>
            </a-select>
          </div>

          <!-- Deposit Address -->
          <div>
            <label class="block text-gray-300 text-lg mb-2">Deposit Address</label>
            <div class="bg-gray-800 text-white rounded-lg p-3">
              <div class="flex justify-between items-center">
                <span>0x1234abcd5678efgh</span>
                <a-button type="link" class="text-orange-500" @click="copyToClipboard('0x1234abcd5678efgh')">
                  <CopyOutlined />
                  Copy
                </a-button>
              </div>
            </div>
          </div>

          <div class="text-purple-400 text-sm text-center mt-6">
            Crypto Trade Wallet<br />
            This QR Code is used for transferring funds within the Crypto
            Network.
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script setup lang="ts">
import { useDepositModal } from "../composables/useDepositModal";
import { useProfileStore } from "../../profile/stores/profile.store";
const { profile } = useProfileStore();
const { showModal, activeTab, openModal, closeModal, copyToClipboard } =
  useDepositModal();

import { CopyOutlined } from "@ant-design/icons-vue";
</script>

<style scoped>
/* Customize Ant Design Modal with Tailwind look */
.custom-modal .ant-modal-content {
  background-color: #1f2937;
  /* gray-900 */
  color: white;
  border-radius: 0.75rem;
  /* rounded-xl */
}

.custom-tabs .ant-tabs-nav {
  margin-bottom: 1rem;
}
</style>
