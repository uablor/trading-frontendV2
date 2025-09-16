<template>
    <div class="login-container">
        <register-from />
    </div>
</template>

<script setup lang="ts">
import RegisterFrom from '../components/Register.component.vue';
</script>

<style scoped lang="scss">
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
