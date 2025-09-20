<template>
  <a-layout-header class="navbar" style="margin: 0;">
    <div class="logo">
      <img src="../../../../assets//image/logo/R.png" alt="logo" />
    </div>

    <div class="header-action-container">
      <div class="hidden md:block">
        <LanguageSwitcher @language-changed="onLanguageChanged" />
      </div>

      <a-button type="primary" ghost >
        <router-link :to="{ name: 'auth.login' }">{{ $t('common.login') }}</router-link>
      </a-button>

      <a-button type="primary">
        <router-link :to="{ name: 'auth.register' }">{{ $t('common.register') }}</router-link>
      </a-button>
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import LanguageSwitcher from '@ui/Language.vue'
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const onLanguageChanged = (locale: string) => {
  console.log('Language changed to:', locale)
  message.success(t('common.success'))
}
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  background: #fff;

  .logo {
    width: 120px;
    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  .header-action-container {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
