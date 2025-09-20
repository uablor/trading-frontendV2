<template>
    <div class="tabs-container flex-1">
        <a-tabs v-model:activeKey="activeTab" type="card" size="small" class="custom-tabs overflow-x-auto flex-nowrap"
            @change="onTabChange" :tabBarStyle="{ padding: '0 8px' }">
            <a-tab-pane v-for="(tab, _index) in tabs" :key="tab.key" class="hover:bg-purple-600">
                <template #tab>
                    <span class="flex items-center gap-1">
                        <img v-if="tab.icon" :src="tab.icon" alt="icon" class="w-4 h-4 md:w-3 md:h-3" />
                        <span class="text-sm md:text-xs">{{ tab.title }}</span>
                    </span>
                </template>
            </a-tab-pane>

            <template #rightExtra>
                <button
                    class="add-tab-btn ml-2 px-2 py-0.5 md:px-1 md:py-0.5 rounded-lg bg-purple-600 text-white text-sm md:text-xs hover:bg-purple-500"
                    @click="addTab">
                    +
                </button>
            </template>
        </a-tabs>
    </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';

import { useRouter, useRoute } from "vue-router";

interface Tab {
    key: string;
    title: string;
    path: string;
    name: string;
    icon: string;
}
import btcIcon from "@/assets/image/iconCrypto/bitcoin-btc-logo.png";
import ethIcon from "@/assets/image/iconCrypto/ethereum-eth-logo.png";

const router = useRouter();
const route = useRoute();
const tabs = ref<Tab[]>([
    { key: "btc", title: "BTC/USDT", icon: btcIcon, name: "customer.lucifer.trading.btc", path: "trading/btc" },
    // { key: "eth", title: "ETH/USDT", icon: ethIcon, name: "customer.lucifer.trading.eth", path: "trading/eth" },
]);

const activeTab = ref(tabs.value[0].key);

watch(
    () => route.name,
    () => {
        const currentTab = tabs.value.find(tab => tab.name === route.name);
        if (currentTab) activeTab.value = currentTab.key;
    },
    { immediate: true }
);

const addTab = () => {
    const newTabKey = `tab-${tabs.value.length + 1}`;
    const newTab: Tab = {
        key: newTabKey,
        title: `Tab ${tabs.value.length + 1}`,
        path: `trading/${newTabKey}`,
        name: `customer.lucifer.trading.${newTabKey}`,
        icon: "",
    };
    tabs.value.push(newTab);
    activeTab.value = newTabKey;

    localStorage.setItem("tradingTab", newTabKey);
    if (router.hasRoute(newTab.name)) {
        router.push({ name: newTab.name });
    }
};

const onTabChange = (key: string) => {
    const tab = tabs.value.find((tab) => tab.key === key);
    if (tab) {
        activeTab.value = key;
        localStorage.setItem("tradingTab", tab.key);

        if (router.hasRoute(tab.name)) {
            router.push({ name: tab.name });
        }
    }
};

</script>

<style scoped lang="scss">
* {
    color: #1f1f1f;
}

.header {
    background-color: #1f1f1f;
}

.logo-icon {
    height: 30px;
}

.user-avatar img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 2px solid #ff6700;
    transition: 0.3s;
}

.user-avatar img:hover {
    border-color: #a200ff;
    transform: scale(1.1);
}
</style>
