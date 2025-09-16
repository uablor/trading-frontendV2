<template>
    <div>
        <a-button type="primary" :disabled="is2faEnabled" @click="openModal">
            {{ is2faEnabled ? $t("security.verified") : $t("security.verifyNow") }}
        </a-button>

        <a-modal v-model:open="showModal" title="สแกน QR Code เพื่อเปิดใช้งาน 2FA" width="450px" :footer="null"
            centered>
            <div v-if="loading" class="flex justify-center py-10">
                <a-spin />
            </div>

            <div v-else class="text-center text-white">
                <div v-if="qrCode">
                    <img :src="'data:image/png;base64,' + qrCode" alt="QR Code" class="mx-auto h-[200px]" />
                </div>
                <p v-if="otpUrl" class="mt-4 text-sm break-all">
                    OTP URL: {{ otpUrl }}
                </p>
                <verifyTwo />
            </div>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import verifyTwo from "./VerifyTwo.vue";
import { use2FA } from "../../composables/security/use2FA";

defineProps({
    is2faEnabled: {
        type: Boolean,
        required: true,
    },
});

const showModal = ref(false);

const { otpUrl, qrCode, loading, generateOTP } = use2FA();

const openModal = async () => {
    showModal.value = true;
    await generateOTP();
};
</script>

<style scoped>
.text-white {
    color: #fff;
}
</style>
