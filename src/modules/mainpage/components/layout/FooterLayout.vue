<template>
  <a-layout-footer class="footer">
    <!-- Top Section -->
    <a-row justify="space-between" align="middle" class="footer-top">
      <!-- Logo and Contact -->
      <a-col :xs="24" :md="8">
        <div class="logo">
          <img src="../../../../assets/image/logo/R.png" class="logo-img" />
          <span class="logo-text">{{ $t('footer.title') }}</span>
        </div>
        <p class="copy">&copy; 2024 Lucifer Trade. All rights reserved.</p>
        <p class="contact">
          Email:
          <a href="mailto:Lucifer@gmail.com" class="email">Lucifer@gmail.com</a>
        </p>
      </a-col>

      <!-- License Info -->
      <a-col :xs="24" :md="8" class="license-info">
        <p>{{ $t('footer.license_info.licensed') }}</p>
        <p>{{ $t('footer.license_info.registered_since') }}</p>
        <p>{{ $t('footer.license_info.address') }}</p>
      </a-col>

      <!-- Help and Options -->
      <a-col :xs="24" :md="8" class="help-options">
        <ul>
          <li><a href="#">{{ $t('footer.help_options.help') }}</a></li>
          <li><a href="#">{{ $t('footer.help_options.terms_of_use') }}</a></li>
          <li><a href="#">{{ $t('footer.help_options.privacy_policy') }}</a></li>
          <li><a href="#">{{ $t('footer.help_options.about_us') }}</a></li>
          <li><a href="#">{{ $t('footer.help_options.how_to_register') }}</a></li>
        </ul>

        <div class="settings">
          <!-- Language Selector -->
          <Languages />

          <!-- Dark Mode Toggle -->
          <div class="theme-toggle">
            <span>🌙</span>
            <a-select v-model:value="theme" style="width: 120px">
              <a-select-option value="dark">{{ $t('footer.dark_mode') }}</a-select-option>
              <a-select-option value="light">{{ $t('footer.light_mode') }}</a-select-option>
            </a-select>
          </div>
        </div>
      </a-col>
    </a-row>

    <a-divider />

    <!-- Bottom Disclaimer -->
    <div class="footer-bottom">
      <p>{{ $t('footer.risk_warning') }}</p>
      <p>{{ $t('footer.disclaimer') }}</p>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Languages from "@ui/Language.vue";

const theme = ref<"dark" | "light">("dark");
</script>

<style lang="scss" scoped>
.footer {
  // background: #001529;
  color: #000000;
  padding: 24px;

  .footer-top {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  .logo {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .logo-img {
      height: 56px;
      margin-right: 8px;
    }

    .logo-text {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .copy {
    // color: rgba(255, 255, 255, 0.65);
    font-size: 13px;
  }

  .contact {
    font-size: 13px;
    margin-top: 4px;

    .email {
      color: #fa8c16;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .license-info {
    p {
      // color: rgba(255, 255, 255, 0.65);
      font-size: 14px;
      margin: 4px 0;
    }
  }

  .help-options {
    ul {
      list-style: none;
      padding: 0;

      li {
        margin: 4px 0;

        a {
          // color: rgba(255, 255, 255, 0.65);
          transition: color 0.2s;

          &:hover {
            // color: #fff;
          }
        }
      }
    }

    .settings {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;

      .theme-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }

  .footer-bottom {
    text-align: center;
    font-size: 12px;
    // color: rgba(255, 255, 255, 0.45);
  }
}
</style>
