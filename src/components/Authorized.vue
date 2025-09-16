<template>
    <a-result status="403" title="401" sub-title="Sorry, you are not authorized to access this page.">
        <template #extra>
            <router-link :to="{ name: 'Login' }">
                <a-button type="primary">{{ $t('login') }}</a-button>
            </router-link>
        </template>
    </a-result>
</template>
