<template>
  <mainComponent />

  <a-drawer v-model:open="open" class="custom-class" root-class-name="root-class-name" :root-style="{ color: 'blue' }"
    style="color: red" placement="right" :closable="true" :mask-closable="false" @close="handleClose"
    @after-open-change="afterOpenChange">
    <router-view />
  </a-drawer>
</template>

<script setup lang="ts">
import mainComponent from '../components/main/main.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const router = useRouter();
const route = useRoute();

const open = ref(false);

watch(
  () => route.name,
  (newName) => {
    if (newName === 'auth.login' || newName === 'auth.register' ||
      newName === 'auth.email-verify' || newName === 'auth.resend-verify' ||
      newName === 'auth.reset-password' || newName === 'auth.confirm-password'
    ) {
      open.value = true;
    } else {
      open.value = false;
    }
  },
  { immediate: true } // ให้ทำงานทันทีตอน mount
);

const afterOpenChange = (_bool: boolean) => {
  // message.success('open', bool);
};

const handleClose = () => {
  open.value = false;
  router.push({ name: 'homepage' });
};
</script>
