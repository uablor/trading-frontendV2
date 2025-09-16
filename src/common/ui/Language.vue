<template>
  <div class="language-select">
    <a-select
      v-model:value="selectedLanguage"
      @change="onLanguageChange"
      style="width: 120px"
    >
      <a-select-option 
        v-for="language in languages" 
        :key="language.value" 
        :value="language.value"
      >
        <div class="option-item">
          <img :src="language.image" alt="" class="flag" />
          <span>{{ language.text }}</span>
        </div>
      </a-select-option>
    </a-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

// Language data
import enImage from "@assets/image/english.jpeg";
import laImage from "@assets/image/laos.png";
import thImage from "@assets/image/thai.png";

const languages = [
  { text: "English", value: "en", image: enImage },
  { text: "Lao", value: "la", image: laImage },
  { text: "Thai", value: "th", image: thImage },
];

const { locale } = useI18n();
const selectedLanguage = ref(locale.value);

// Handle language change
const onLanguageChange = (value: string) => {
  locale.value = value;
  localStorage.setItem("locale", value);
};
</script>

<style lang="scss" scoped>
.language-select {
  .ant-select {
    .ant-select-selector {
      display: flex;
      align-items: center;
      padding: 4px 8px;
    }
  }

  .option-item {
    display: flex;
    align-items: center;
    gap: 8px;

    .flag {
      width: 24px;
      height: 16px;
      object-fit: cover;
      border: 1px solid #ddd;
      border-radius: 2px;
    }
  }
}
</style>
