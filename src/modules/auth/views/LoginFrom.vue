<template>
    <div class="login-container">
        <Login />
    </div>
</template>

<script setup lang="ts">
import Login from '../components/Login.component.vue';
</script>

<style scoped lang="scss">
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
