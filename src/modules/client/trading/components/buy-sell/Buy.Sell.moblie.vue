<template>
    <div>
        <!-- Mobile Bottom Panel -->
        <div
            class="fixed text-[#000] bottom-0 left-0 right-0 w-full bg-[#fff] shadow-2xl border-t-2 p-4 lg:hidden z-50 rounded-t-lg">
            <!-- Amount -->
            <div class=" flex justify-center items-center gap-1">
                <button class="adjust-button" @click="decreaseAmount">-</button>
                <input type="number" v-model="price" class="amount-input" />
                <button class="adjust-button" @click="increaseAmount">+</button>
            </div>

            <!-- Quick Amount -->
            <!-- <div class="flex flex-wrap gap-2 mb-2">
                <button v-for="value in quickAmounts" :key="value" @click="setAmount(value)"
                    class="quick-amount bg-gray-700 text-white px-3 py-1 rounded">
                    +{{ value }}
                </button>
                <button @click="setAmount('all')" class="quick-amount bg-gray-700 text-white px-3 py-1 rounded">
                    All
                </button>
            </div> -->

            <!-- Profit -->
            <div class="flex justify-between items-center mb-2">
                <span class="profit-label text-black font-medium">Profit</span>
                <span class="profit-value font-bold" :class="{
                    'text-green-500': calculatedProfit > 0,
                    'text-red-500': calculatedProfit < 0
                }">
                    {{ calculatedProfit.toFixed(2) }}$
                </span>
            </div>

            <!-- Buy/Sell Buttons -->
            <div class="flex gap-2 text-white">
                <button class="flex-1 bg-green-500 py-2 rounded cursor-pointer radio-lg" @click="queueTrade('buy', 'BTCUSDT')">
                    BUY
                </button>
                <div v-if="loading" class="flex items-center justify-center">
                    <a-spin size="large" />
                </div>
                <div v-else class="countdown">{{ nextCandlestickTime }}</div>
                <button class="flex-1 bg-red-500 py-2 rounded cursor-pointer radio-lg" @click="queueTrade('sell', 'BTCUSDT')">
                    SELL
                </button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useTrade } from '../../composables/useTrade';
import { BaseWebsocket } from '@/common/configurations/ws.config';

interface CandlestickMessage {
    next_candlestick_time?: string;
    is_button_enter?: boolean;
}

const loading = ref<boolean>(true);
const nextCandlestickTime = ref<string>("Loading...");
let socket2: ReturnType<typeof BaseWebsocket>;

const {
    price,
    quickAmounts,
    calculatedProfit,
    is_button_enter, // ต้องเป็น ref<boolean>
    decreaseAmount,
    increaseAmount,
    setAmount,
    queueTrade
} = useTrade();

onMounted(async () => {
    loading.value = true;
    try {
        socket2 = BaseWebsocket("candlestick/"); // create WS instance
        await socket2.connect(); // เชื่อมต่อ WS

        socket2.onMessage((data: CandlestickMessage) => {
            if (data.next_candlestick_time) nextCandlestickTime.value = data.next_candlestick_time;
            if (typeof data.is_button_enter === "boolean") is_button_enter.value = data.is_button_enter;
        });
    } catch (err) {
        console.error("WebSocket error:", err);
    } finally {
        loading.value = false;
    }
});

onBeforeUnmount(() => {
    socket2?.close();
});
</script>


<style scoped>
.amount-input {
    width: 60px;
}

.adjust-button {
    padding: 2px 8px;
}

.quick-amount {
    font-size: 14px;
}

.buy-button {
    background-color: #2ecc71;
    color: white;
    padding: 10px 0;
    border-radius: 8px;
}

.sell-button {
    background-color: #e74c3c;
    color: white;
    padding: 10px 0;
    border-radius: 8px;
}

.countdown {
    text-align: center;
    background-color: #333333;
    color: white;
    padding: 10px 0;
    width: 100px;
    border-radius: 8px;
}


.adjust-button {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.adjust-button:hover {
  background-color: #fa5252;
}
</style>
