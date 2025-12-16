<template>
    <div
        class="header flex justify-between items-center px-5 md:px-10 py-2 bg-gray-900 border-b-2 border-purple-700 text-white">
        <DrawerSidebar class="md:hidden" />
        <div class="logo flex items-center flex-row gap-5 text-center">
            <img src="@/assets/image/logo/R.png" alt="Logo"
                class=" object-center logo-icon mr-2 hidden md:w-[100px] lg:h-[20px] md:block " />
            <span class="text-xl font-bold  hidden lg:block">Trade</span>

   
        </div>

        <div class="user-section flex items-center gap-4">

            <!-- <walletComponent /> -->
            <Language class="hidden lg:block" />

            <router-link :to="{ name: 'customer.profile' }" class="user-avatar">
                <img src="@/assets/image/Avatar/Aavatar.png" alt="User Avatar"
                    class="rounded-full border-2 border-orange-500 hover:border-purple-600 transition-transform transform hover:scale-110" />
            </router-link>
            <a-button type="text" @click="isNotificationOpen = true" class="md:hidden lg:block">
                <BellOutlined class="text-[18px]" />
            </a-button>
            <div class="flex items-center space-x-4">
            <a-badge :count="5" >
            <a-drawer v-model:open="isNotificationOpen" title="Notification" placement="right" :width="300" closable>
                <p>Some placeholder notification text.</p>
            </a-drawer>
            </a-badge>
</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BellOutlined } from '@ant-design/icons-vue';
import Language from '@/common/ui/Language.vue';
// import walletComponent from '@modules/client/wallet/components/wallet/switch.wallet.vue';
import DrawerSidebar from './DrawerSidebar.vue';
import { ref } from 'vue';
const isNotificationOpen = ref(false);
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
