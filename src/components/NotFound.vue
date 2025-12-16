<template>
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
        <template #extra>
            <router-link :to="{ name: 'Login' }">
                <a-button type="primary">{{ $t('login') }}</a-button>
            </router-link>
        </template>
    </a-result>
</template>
