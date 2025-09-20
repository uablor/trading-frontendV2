<template>
    <div class="verify-container">
        <resend-verify />
    </div>
</template>

<script setup lang="ts">
import ResendVerify from '../components/ResendVerify.component.vue';
</script>

<style scoped lang="scss">
.verify-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
