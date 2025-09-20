<template>
    <div class="verify-container">
        <EmailVerifyComponent />
    </div>
</template>

<script setup lang="ts">
import EmailVerifyComponent from '../components/EmailVerify.component.vue';
</script>

<style scoped lang="scss">
.verify-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
