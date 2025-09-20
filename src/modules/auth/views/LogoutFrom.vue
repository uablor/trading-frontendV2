<template>
    <!-- Logout Confirmation Modal -->
    <a-modal v-model:open="props.isModalVisible" title="Confirm Logout" :width="420" :mask-closable="false"
        class="logout-modal" centered>
        <div class="modal-content">
            <a-result status="warning" class="logout-result">
                <template #icon>
                    <exclamation-circle-outlined class="warning-icon" />
                </template>
                <template #title>
                    <a-typography-text class="logout-title">
                        Are you sure you want to logout?
                    </a-typography-text>
                </template>
                <template #subTitle>
                    <a-typography-text class="logout-subtitle">
                        You will need to sign in again to access your account.
                    </a-typography-text>
                </template>
            </a-result>
        </div>

        <template #footer>
            <a-space>
                <a-button @click="cancelLogout" size="large">
                    Cancel
                </a-button>
                <a-button @click="logout" type="primary" danger size="large" :loading="logoutLoading">
                    <template #icon>
                        <logout-outlined />
                    </template>
                    Logout
                </a-button>
            </a-space>
        </template>
    </a-modal>
</template>
<script setup lang="ts">
import { LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';

import { ref } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
const router = useRouter();

const logoutLoading = ref<boolean>(false);
const props = defineProps<{
    isModalVisible: boolean;
}>();

const emit = defineEmits<{
    (e: "update:isModalVisible", value: boolean): void;
}>();

const logout = async () => {
    logoutLoading.value = true;
    // const res = await clientApi.post("logout/");

    message.success("Logged out successfully!");
    localStorage.clear();
    router.push({ name: "homepage" });
    emit("update:isModalVisible", false); // ปิด modal
};

const cancelLogout = () => {
    emit("update:isModalVisible", false); // ปิด modal
};


</script>

<style scoped></style>
