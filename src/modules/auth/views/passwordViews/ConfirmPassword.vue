<template>
    <div class="verify-container">
        <ConfirmResetPassword />
    </div>
</template>

<script setup lang="ts">
import ConfirmResetPassword from '../../components/password/ConfirmResetPassword.vue';
</script>

<style scoped lang="scss">
.verify-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
