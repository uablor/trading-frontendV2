<template>
  <a-dropdown trigger="click">
    <a class="ant-dropdown-link" @click.prevent>
      <a-avatar shape="square" size="small" style="background:#1890ff">W</a-avatar>
      <span class="wallet-label">
        {{ activeAccount.label }} ({{ activeAccount.key }})
        <span :style="{ color: balances[activeAccount.key] >= 0 ? '#52c41a' : '#f5222d', fontWeight: '600' }">
          {{ balances[activeAccount.key] }} USDT
        </span>
      </span>
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu @click="onSelectAccount">
        <a-menu-item v-for="account in accounts" :key="account.key">
          <div class="wallet-option">
            <span>{{ account.label }}</span>
            <span class="balance">{{ balances[account.key] }} USDT</span>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { useWalletStore } from "../trading/stores/trading.store";

const walletStore = useWalletStore();
interface Account {
  key: "real" | "demo";
  label: string;
}

const accounts: Account[] = [
  { key: "real", label: "Real Account" },
  { key: "demo", label: "Demo Account" },
];

const activeAccount = ref<Account>(accounts[0]);

const balances = reactive<{ [key in "real" | "demo"]: number }>({
  real: 900,
  demo: 1000,
});

const onSelectAccount = ({ key }: { key: string }) => {
  activeAccount.value = accounts.find((account) => account.key === key) || accounts[0];
};
</script>

<style lang="scss" scoped>
.wallet-label {
  margin: 0 8px;
  font-weight: 500;
}

.wallet-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 180px;

  .balance {
    color: #52c41a;
    font-weight: 600;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .wallet-label {
    display: none; // hide label on small screens
  }

  .wallet-option {
    flex-direction: column;
    align-items: flex-start;
    min-width: 140px;

    .balance {
      margin-top: 4px;
      font-size: 0.85rem;
    }
  }
}

@media (max-width: 480px) {
  .ant-dropdown-link {
    display: flex;
    align-items: center;
    font-size: 0.85rem;

    svg {
      font-size: 0.9rem;
    }
  }

  .wallet-option {
    min-width: 120px;
    font-size: 0.8rem;

    .balance {
      font-size: 0.75rem;
    }
  }
}
</style>
