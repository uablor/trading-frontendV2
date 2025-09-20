<template>
    <a-card v-if="securityData" class="text-white rounded-lg" :loading="loading">
        <h2 class="text-xl font-semibold mb-4">{{ $t("security.title") }}</h2>

        <!-- Identity Verification -->
        <div class="mb-4 flex flex-col space-y-2">
            <div class="flex justify-between items-center">
                <p>{{ $t("security.identityVerification") }}</p>
                <verify2FA :is2faEnabled="securityData.is_2fa_enabled" ref="modalRef" />
            </div>
            <p class="text-sm text-gray-400">
                {{ $t("security.identityVerificationInfo") }}
            </p>
        </div>

        <!-- Change Password -->
        <div class="mb-4 flex flex-col space-y-2">
            <div class="flex justify-between items-center">
                <p>{{ $t("security.password") }}</p>
                <password-component />
            </div>
            <p class="text-sm text-gray-400">
                {{ $t("security.changePasswordInfo") }}
            </p>
        </div>

        <!-- 2FA -->
        <div class="mb-4 flex flex-col space-y-2">
            <div class="flex justify-between items-center">
                <p>{{ $t("security.twoFACode") }}</p>
                <a-switch v-model:checked="securityData.is_2fa_enabled" :disabled="!securityData.is_2fa_enabled" />
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
import { ref } from "vue";
import { useSecurity } from "../../composables/security/useSecurity";
import PasswordComponent from "./Password.component.vue";
import verify2FA from "./Verify2FAModal.vue";

const {
    securityData,
    loading,
    toggleTransactionPassword,
} = useSecurity();
const modalRef = ref<InstanceType<typeof verify2FA>>();

</script>

<style scoped>
.bg-gray-800 {
    background-color: #1f1f1f;
}
</style>
