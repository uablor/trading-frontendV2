<template>
    <div>
        <!-- ปุ่มเปิด Modal -->
        <a-button type="primary" :disabled="is2faEnabled" @click="openModal" class="rounded-lg shadow-md">
            <SecurityScanOutlined class="mr-2" />
            {{ is2faEnabled ? $t("security.verified") : $t("security.verifyNow") }}
        </a-button>

        <!-- Modal -->
        <a-modal v-model:open="showModal" :title="$t('security.twoFactorAuth')" width="450px" centered :footer="null"
            class="custom-modal" :mask-closable="false">
            <div v-if="loading" class="flex justify-center py-10">
                <a-spin size="large" />
            </div>

            <div v-else class="text-center">
                <!-- QR Code -->
                <div v-if="qrCode"
                    class="relative mx-auto my-5 w-[200px] h-[200px] rounded-lg overflow-hidden border border-gray-700 shadow-md">
                    <img :src="'data:image/png;base64,' + qrCode" alt="QR Code" class="w-full h-full object-contain" />
                </div>

                <!-- OTP URL -->
                <p v-if="otpUrl" class="mt-20 text-xs text-gray-400 px-2 break-all">
                    {{ otpUrl }}
                </p>

                <!-- Verify Step -->
                <div class="mt-6">
                    <verifyTwo />
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import verifyTwo from "./VerifyTwo.vue";
import { use2FA } from "../../composables/security/use2FA";
import { SecurityScanOutlined } from "@ant-design/icons-vue";

defineProps({
    is2faEnabled: {
        type: Boolean,
        required: true,
    },
});

const showModal = ref(false);

const { otpUrl, qrCode, loading, generateOTP } = use2FA();

const openModal = async () => {
    showModal.value = !showModal.value;
    if (!showModal.value) return;
    await generateOTP();
};

defineExpose({ showModal, openModal });
</script>

<style scoped>
.custom-modal {
    .ant-modal-content {
        border-radius: 12px;
        background: #1e1e2f;
        color: #fff;
    }

    .ant-modal-header {
        background: #1e1e2f;
        border-bottom: none;
        color: #fff;
        text-align: center;
    }

    .ant-modal-title {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
    }
}
</style>
