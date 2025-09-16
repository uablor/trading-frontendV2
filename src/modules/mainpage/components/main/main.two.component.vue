<template>
  <div class="p-6 mt-20 rounded-md text-black">
    <!-- Tabs -->
    <div class="flex gap-4 border-b mb-4">
      <button
        :class="activeTab === 'highestPrice' ? 'text-orange-500 border-orange-500 font-semibold' : 'text-gray-400 hover:text-orange-500 hover:border-orange-500 hover:cursor-pointer'"
        @click="activeTab = 'highestPrice'"
        class="pb-2"
      >
        {{ $t('tabs.highestPrice') }}
      </button>
      <button
        :class="activeTab === 'highestProfit' ? 'text-orange-500 border-b-2 border-orange-500 font-semibold' : 'text-gray-400 hover:text-orange-500 hover:border-orange-500 hover:cursor-pointer '"
        @click="activeTab = 'highestProfit'"
        class="pb-2"
      >
        {{ $t('tabs.highestProfit') }}
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm border-none">
        <thead>
          <tr class="border-none ">
            <th class="p-2">{{ $t('tableHeaders.name') }}</th>
            <th class="p-2">{{ $t('tableHeaders.lastPrice') }}</th>
            <th class="p-2">{{ $t('tableHeaders.change24h') }}</th>
            <th class="p-2">{{ $t('tableHeaders.chart') }}</th>
            <th class="p-2 text-center">{{ $t('tableHeaders.trade') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedData" :key="item.name" class="border-none">
            <td class="p-2 flex items-center gap-2 mt-5">
              <img :src="item.icon" alt="crypto" class="w-6 h-6"/>
              <span>{{ item.name }}</span>
            </td>
            <td class="p-2">{{ item.price }}</td>
            <td class="p-2" :class="item.change24h > 0 ? 'text-green-400' : 'text-red-400'">
              {{ item.change24h > 0 ? '+' : '' }}{{ item.change24h }}%
            </td>
            <td class="p-2">
              <div class="h-10 w-24 rounded" :class="item.change24h > 0 ? 'bg-green-400' : 'bg-red-400'"></div>
            </td>
            <td class="p-2 text-center">
              <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded-md">
                {{ $t('tableHeaders.tradeAction') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import btcIcon from '@/assets/image/iconCrypto/bitcoin-btc-logo.png';
import bchIcon from '@/assets/image/iconCrypto/bitcoin-cash-bch-logo.png';
import ethIcon from '@/assets/image/iconCrypto/ethereum-eth-logo.png';
import solIcon from '@/assets/image/iconCrypto/solana-sol-logo.png';
import adaIcon from '@/assets/image/iconCrypto/cardano-ada-logo.png';
import dogeIcon from '@/assets/image/iconCrypto/dogecoin-doge-logo.png';
import shibaIcon from '@/assets/image/iconCrypto/shiba-inu-shib-logo.png';
import bnbIcon from '@/assets/image/iconCrypto/binance-coin-bnb-logo.png';

interface CryptoData {
  name: string;
  icon: string;
  price: string;
  change24h: number;
}

const data: CryptoData[] = [
  { name: "BTC/USDT", icon: btcIcon, price: "$100,284.35", change24h: -0.63 },
  { name: "ETH/USDT", icon: ethIcon, price: "$3,924.47", change24h: -0.44 },
  { name: "BNB/USDT", icon: bnbIcon, price: "$717.11", change24h: 0.45 },
  { name: "BCH/USDT", icon: bchIcon, price: "$532.80", change24h: -2.73 },
  { name: "SOL/USDT", icon: solIcon, price: "$223.55", change24h: -2.76 },
  { name: "ADA/USDT", icon: adaIcon, price: "$0.45", change24h: 1.25 },
  { name: "DOGE/USDT", icon: dogeIcon, price: "$0.086", change24h: -0.84 },
  { name: "SHIB/USDT", icon: shibaIcon, price: "$0.000024", change24h: 2.13 },
];

const activeTab = ref('highestPrice');

const sortedData = computed(() => {
  if (activeTab.value === 'highestPrice') {
    return [...data].sort((a, b) => parseFloat(b.price.replace(/[$,]/g, '')) - parseFloat(a.price.replace(/[$,]/g, '')));
  } else {
    return [...data].sort((a, b) => b.change24h - a.change24h);
  }
});
</script>
