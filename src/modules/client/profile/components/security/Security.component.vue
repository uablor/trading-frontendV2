<template>
    <a-card v-if="securityData" class="text-white rounded-lg" :loading="loading">
        <h2 class="text-xl font-semibold mb-4">{{ $t("security.title") }}</h2>

        <!-- Identity Verification -->
        <div class="mb-4 flex flex-col space-y-2">
            <div class="flex justify-between items-center">
                <p>{{ $t("security.identityVerification") }}</p>
                <verify2FA :is2faEnabled="securityData.is_2fa_enabled" />
            </div>
            <p class="text-sm text-gray-400">
                {{ $t("security.identityVerificationInfo") }}
            </p>
        </div>

        <!-- Change Password -->
        <div class="mb-4 flex flex-col space-y-2">
            <div class="flex justify-between items-center">
                <p>{{ $t("security.password") }}</p>
                <a-button type="primary" danger @click="changePassword">
                    {{ $t("security.change") }}
                </a-button>
            </div>
            <p class="text-sm text-gray-400">
                {{ $t("security.changePasswordInfo") }}
            </p>
        </div>

        <!-- 2FA -->
        <div class="mb-4 flex flex-col space-y-2">
            <div class="flex justify-between items-center">
                <p>{{ $t("security.twoFACode") }}</p>
                <a-switch v-model:checked="securityData.is_2fa_enabled" @change="toggle2FA" />
            </div>
            <p class="text-sm text-gray-400">{{ $t("security.twoFAInfo") }}</p>
        </div>

        <!-- Transaction Password -->
        <div class="mb-4 flex flex-col space-y-2">
            <div class="flex justify-between items-center">
                <p>{{ $t("security.transactionPassword") }}</p>
                <a-switch v-model:checked="securityData.transaction_password_enabled"
                    @change="toggleTransactionPassword" />
            </div>
            <p class="text-sm text-gray-400">
                {{ $t("security.transactionPasswordInfo") }}
            </p>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import { useSecurity } from "../../composables/security/useSecurity";
import verify2FA from "./Verify2FAModal.vue";

const {
    securityData,
    loading,
    toggle2FA,
    toggleTransactionPassword,
} = useSecurity();

const changePassword = () => {
    // redirect หรือเปิด modal เปลี่ยนรหัสผ่าน
    console.log("Change password clicked");
};
</script>

<style scoped>
.bg-gray-800 {
    background-color: #1f1f1f;
}
</style>
