<template>
  <div class="verify-page">
    <div class="verify-card shadow-lg rounded-lg p-8 flex flex-col items-center">
      <a-spin v-if="loading" size="large" class="mb-6" />

      <template v-else>
        <div v-if="!email_verify_">
          <CheckCircleOutlined style="color: #22c55e" class="text-green-500 text-6xl mb-4" />
          <h2 class="text-2xl font-bold mb-2 text-center"style="color: #22c55e">{{ $t('auth.verifyEmailSuccess') }}</h2>
          <p class="text-center text-gray-600 mb-4">
            {{ $t('auth.verifyEmailSent') }} <span class="font-semibold text-blue-500">{{ $t('auth.checkYourEmail') }}</span>
          </p>
          <router-link
            :to="{ name: 'auth.login' }"
            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition "
          >
            {{ $t('auth.goToLogin') }}
          </router-link>
        </div>

        <div v-else class="text-center flex flex-col items-center">
          <CloseCircleOutlined class="text-red-500 text-6xl mb-4" />
          <h2 class="text-2xl font-bold mb-2 text-center">{{ $t('auth.verifyEmailFailed') }}</h2>
          <p class="text-center text-gray-600 mb-4">
            {{ $t('auth.verifyEmailError') }}
          </p>
          <router-link
            :to="{ name: 'auth.register' }"
            class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            {{ $t('auth.tryRegisterAgain') }}
          </router-link>
          <router-link
            :to="{ name: 'auth.resend-verify' }"
            class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            {{ $t('auth.tryResendVerifyAgain') }}
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import { useVerifyEmailForm } from '../composables/ีuseVerify';

const { email_verify, email_verify_, loading } = useVerifyEmailForm();

onMounted(async () => {
  await email_verify();
});
</script>

<style scoped lang="scss">
.verify-page {
height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f0f4ff, #e6f7ff);
  padding: 10px;
}

.verify-card {
  max-width: 450px;
  width: 100%;
  background: #ffffff;
  text-align: center;
}
</style>
