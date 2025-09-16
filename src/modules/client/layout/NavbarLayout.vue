<template>
    <div class="header flex justify-between items-center px-5 py-2 bg-gray-900 border-b-2 border-purple-700 text-white">

        <div class="logo flex items-center flex-row gap-5">

            <img src="@/assets/image/logo/R.png" alt="Logo" class="logo-icon mr-2" />
            <span class="text-xl font-bold">Trade</span>
            <div class="tabs-container">
                <a-tabs v-model:activeKey="activeTab" type="card" size="small"
                    class="custom-tabs overflow-x-auto flex-nowrap " @change="onTabChange">
                    <a-tab-pane v-for="(tab, index) in tabs" :key="tab.key" class="hover:bg-purple-600">
                        <template #tab>
                            <span class="flex items-center gap-1">
                                <img v-if="tab.icon" :src="tab.icon" alt="icon" class="w-4 h-4" />
                                {{ tab.title }}
                            </span>
                        </template>
                    </a-tab-pane>
                    <template #rightExtra>
                        <button
                            class="add-tab-btn ml-2 px-3 py-1 rounded-lg bg-purple-600 text-white hover:bg-purple-500"
                            @click="addTab">
                            +
                        </button>
                    </template>
                </a-tabs>
            </div>
        </div>



        <div class="user-section flex items-center gap-4">

            <walletComponent />
            <Language />
            <a-button type="text" @click="isNotificationOpen = true">
                <BellOutlined class="text-[18px]" />
            </a-button>
            <a-drawer v-model:open="isNotificationOpen" title="Notification" placement="right" :width="300" closable>
                <p>Some placeholder notification text.</p>
            </a-drawer>

            <router-link :to="{ name: 'customer.profile' }" class="user-avatar">
                <img src="@/assets/image/Avatar/Aavatar.png" alt="User Avatar"
                    class="rounded-full border-2 border-orange-500 hover:border-purple-600 transition-transform transform hover:scale-110" />
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BellOutlined } from '@ant-design/icons-vue';
import Language from '@/common/ui/Language.vue';
import walletComponent from './wallet.component.vue';
import { onMounted, ref, watch } from 'vue';

const isNotificationOpen = ref(false);
import { useRouter, useRoute } from "vue-router";

interface Tab {
    key: string;
    title: string;
    path: string; // ใช้ path ของ router
    name: string;
    icon: string;
}
import btcIcon from "@/assets/image/iconCrypto/bitcoin-btc-logo.png";
import ethIcon from "@/assets/image/iconCrypto/ethereum-eth-logo.png";

const router = useRouter();
const route = useRoute();
const tabs = ref<Tab[]>([
    { key: "btc", title: "BTC/USDT", icon: btcIcon, name: "customer.lucifer.trading.btc", path: "trading/btc" },
    { key: "eth", title: "ETH/USDT", icon: ethIcon, name: "customer.lucifer.trading.eth", path: "trading/eth" },
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

onMounted(() => {
    const savedTabKey = localStorage.getItem("tradingTab");
    const tab = tabs.value.find(t => t.key === savedTabKey) || tabs.value[0];
    activeTab.value = tab.key;

    if (router.hasRoute(tab.name)) {
        router.push({ name: tab.name });
    }
});
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
