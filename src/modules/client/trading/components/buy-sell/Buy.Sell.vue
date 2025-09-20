<template>
  <div class="trade-container">
    <!-- Amount -->
    <div class="amount-section">
      <button class="adjust-button" @click="decreaseAmount">-</button>
      <input type="number" v-model="price" class="amount-input" />
      <button class="adjust-button" @click="increaseAmount">+</button>
    </div>

    <!-- Quick Amount -->
    <div class="quick-amount-buttons">
      <button v-for="value in quickAmounts" :key="value" @click="setAmount(value)" class="quick-amount">
        +{{ value }}
      </button>
      <button @click="setAmount('all')" class="quick-amount">All</button>
    </div>

    <!-- Profit -->
    <div class="profit-section">
      <span class="profit-label">Profit</span>
      <span class="profit-value" :class="{ high: calculatedProfit > 0, low: calculatedProfit < 0 }">
        {{ calculatedProfit.toFixed(2) }}$
      </span>
    </div>

    <!-- Buy/Sell -->
    <button class="buy-button" :disabled="is_button_enter" @click="queueTrade('buy', 'BTCUSDT')">BUY</button>

    <div v-if="loading" class="flex items-center justify-center h-full">
      <a-spin size="large" />
    </div>
    <div v-else class="countdown">{{ nextCandlestickTime }}</div>

    <button class="sell-button" :disabled="is_button_enter" @click="queueTrade('sell', 'BTCUSDT')">SELL</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useTrade } from "../../composables/useTrade";
import { BaseWebsocket } from "@/common/configurations/ws.config";
const loading = ref<boolean>(true);
const { price, quickAmounts, calculatedProfit, is_button_enter, decreaseAmount, increaseAmount, setAmount, queueTrade } = useTrade();

const nextCandlestickTime = ref("Loading...");

let socket2: ReturnType<typeof BaseWebsocket>; // ⚡ keep reference globally in this component

onMounted(async () => {
  loading.value = true;
  try {
    socket2 = await BaseWebsocket("candlestick/"); // create WS instance
    await socket2.connect(); // ⚡ ต้องเรียก connect
    socket2.onMessage((data: any) => {      // ⚡ ใช้ onMessage ไม่ใช่ onmessage
      if (data.next_candlestick_time) nextCandlestickTime.value = data.next_candlestick_time;
      is_button_enter.value = data.is_button_enter;
    });
  } finally {
    loading.value = false;
  }
});

onBeforeUnmount(() => {
  socket2?.close(); // close WS เมื่อ component ถูกทำลาย
});
</script>


<style scoped>
@font-face {
  font-family: "Phetsarath_OT", "Press Start 2P", sans-serif;
  /* Pixelated font */
  src: url("../../assets/font/Phetsarath OT.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

* {
  font-family: "Phetsarath OT", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.custom-close-icon {
  color: white;
  /* Change this to any color you prefer */
}

.icon-error {
  color: rgb(255, 255, 255);
  font-size: 24px;
}

.icon-success {
  color: rgb(255, 255, 255);
  font-size: 24px;
}

.notification .ant-notification-notice-message {
  color: white !important;
  /* Force white font for error notifications */
}

.countdown {
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  background-color: #333333;
  color: white;
  padding: 14px 8px 8px 8px;
  border-radius: 8px;
  font-weight: bold;
}

.container {
  height: 100%;
  width: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgb(163, 31, 240);
  border-left: 1px solid rgb(163, 31, 240);
  border-right: 1px solid rgb(163, 31, 240);
  /* border-radius: 12px; */
  padding: 10px;
  background-color: #1f1f1f;
}

.trade-container {
  color: white;
  padding: 20px;
  border-radius: 12px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.amount-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.adjust-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.adjust-button:hover {
  background-color: #fa5252;
}

.amount-input {
  width: 70px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  background-color: #1f1f1f;
  color: white;
  font-size: 16px;
}

.quick-amount-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 15px;
}

.quick-amount {
  background-color: #3a3a3a;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s ease;
}

.quick-amount:hover {
  background-color: #5a5a5a;
  transform: scale(1.1);
}

.profit-section {
  text-align: center;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.profit-label {
  font-size: 16px;
  color: #f1c40f;
}

.profit-value {
  font-size: 18px;
  font-weight: bold;
  color: orange;
}

.profit-value.high {
  color: #2ecc71;
}

.profit-value.low {
  color: #e74c3c;
}

.profit-amount {
  font-size: 18px;
  font-weight: bold;
}

.profit-amount.positive {
  color: #2ecc71;
}

.profit-amount.negative {
  color: #e74c3c;
}

.buy-button,
.sell-button {
  width: 100%;
  padding: 12px 0;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s ease;
}

.buy-button {
  background-color: #2ecc71;
  border: none;
  color: white;
}

.buy-button:hover {
  background-color: #27ae60;
  transform: scale(1.02);
}

.sell-button {
  background-color: #e74c3c;
  border: none;
  color: white;
}

.sell-button:hover {
  background-color: #c0392b;
  transform: scale(1.02);
}

.buy-button.disabled,
.sell-button.disabled {
  background-color: #95a5a6 !important;
  /* Grey color when disabled */
  cursor: not-allowed;
}

.countdown {
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  background-color: #333333;
  color: white;
  padding: 10px 8px 8px 8px;
  border-radius: 8px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .trade-container {
    width: 100%;
    padding: 15px;
  }

  .quick-amount-buttons {
    gap: 5px;
  }

  .quick-amount {
    padding: 5px 10px;
    font-size: 12px;
  }

  .adjust-button {
    padding: 5px 8px;
    font-size: 16px;
  }

  .amount-input {
    width: 50px;
    font-size: 14px;
  }

  .buy-button,
  .sell-button {
    font-size: 16px;
  }
}

.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
