<template>
    <div class="verify-container">
        <ResetPassword />
    </div>
</template>

<script setup lang="ts">
import ResetPassword from '../../components/password/ResetPassword.vue';
</script>

<style scoped lang="scss">
.verify-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
