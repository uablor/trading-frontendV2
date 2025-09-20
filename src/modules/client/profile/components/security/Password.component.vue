<template>
    <div>
        <a-button type="primary" @click="openModal" class="rounded-lg shadow-md">
            <KeyOutlined class="mr-2" />
            {{ $t("security.changePassword") }}
        </a-button>

        <a-modal v-model:open="showModal" :title="$t('security.changePassword')" width="400px" centered
            @ok="handleSubmit" :confirm-loading="loading" ok-text="Save" cancel-text="Cancel" class="custom-modal"
            :maskClosable="false" :keyboard="false">
            <a-form layout="vertical" class="space-y-4" :model="form">

                <p class="text-sm text-gray-400">
                    {{ $t("security.changePasswordInfo") }}
                </p>
                <a-form-item :label="$t('security.currentPassword')" required
                    :validate-status="errors.password ? 'error' : ''" :help="errors.password">
                    <a-input-password v-model:value="form.password" suggested="current-password" size="large"
                        placeholder="Enter current password" class="rounded-lg">
                        <template #prefix>
                            <LockOutlined />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item :label="$t('security.newPassword')" required
                    :validate-status="errors.new_password ? 'error' : ''" :help="errors.new_password">
                    <a-input-password v-model:value="form.new_password" suggested="new-password" size="large"
                        placeholder="Enter new password" class="rounded-lg">
                        <template #prefix>
                            <KeyOutlined />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item :label="$t('security.confirmPassword')" required
                    :validate-status="errors.new_password2 ? 'error' : ''" :help="errors.new_password2">
                    <a-input-password v-model:value="form.new_password2" suggested="new-password" size="large"
                        placeholder="Confirm new password" class="rounded-lg">
                        <template #prefix>
                            <CheckCircleOutlined />
                        </template>
                    </a-input-password>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { KeyOutlined, LockOutlined, CheckCircleOutlined } from "@ant-design/icons-vue";
import { useChangePassword } from "../../composables/security/useChangePassword";

const { showModal, loading, form, errors, openModal, handleSubmit } = useChangePassword();
</script>

<style scoped lang="scss"></style>