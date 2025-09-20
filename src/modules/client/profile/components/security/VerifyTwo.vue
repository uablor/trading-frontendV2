<template>
  <a-card class="max-w-sm mx-auto p-6 rounded-lg shadow-lg text-white">
    <h3 class="text-xl font-semibold text-center mb-6">
      {{ $t("security.enterOTP") }}
    </h3>

    <a-form @submit.prevent="handleSubmit" layout="vertical">
      <a-form-item label="OTP">
        <a-input v-model:value="otp" placeholder="กรอก OTP" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" block>
          {{ $t("security.confirmOTP") }}
        </a-button>
      </a-form-item>

    </a-form>
  </a-card>
</template>

<script setup lang="ts">
import { use2FAValidation } from "../../composables/security/use2FAValidation";
const { otp, loading, validateOTP } = use2FAValidation();

const handleSubmit = async () => {
  await validateOTP();
};
</script>

<style scoped>
.text-green-500 {
  color: #22c55e;
}

.text-red-500 {
  color: #ef4444;
}
</style>
