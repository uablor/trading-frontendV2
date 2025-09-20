<template>
  <a-button type="primary" @click="show = true" icon>
    <EditOutlined />
    {{ $t('profile.editProfilePicture') }}
  </a-button>

  <a-modal v-model:open="show" :title="$t('profile.editProfile')" width="400px" :centered="true"
    :ok-text="$t('profile.save')" @ok="handleSave" @cancel="show = false" :loading="loading">
    <div class="text-center mb-4 relative w-32 mx-auto">
      <!-- Avatar clickable -->
      <a-avatar :src="profile.avatar || defaultAvatar" size="large" class="!w-32 !h-32 cursor-pointer"
        @click="showPreview = true" />

      <!-- Overlay Edit Icon -->
      <div class="absolute bottom-0 right-0 rounded-full p-1 cursor-pointer" @click="openUpload">
        <EditOutlined class="text-blue-500" />
      </div>

      <!-- Hidden Upload -->
      <a-upload :show-upload-list="false" :before-upload="beforeUpload" class="hidden" ref="uploadRef"></a-upload>

      <!-- Preview Modal -->
      <a-modal v-model:open="showPreview" footer={null} centered width="80%"
        body-style="padding: 0; text-align: center;" :close-icon="true" brack>
        <img :src="profile.avatar || defaultAvatar" class="w-full h-auto max-h-[80vh] object-contain"
          alt="Avatar Preview" />
      </a-modal>
    </div>

    <a-form layout="vertical">
      <a-form-item :label="$t('profile.name')">
        <a-input v-model:value="profile.username" />
      </a-form-item>

      <a-form-item :label="$t('profile.email')">
        <a-input v-model:value="profile.email" type="email" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEditProfile } from "../../composables/profile/useEditProfile";
import { useProfile } from "../../composables/profile/useProfile";
import { EditOutlined } from "@ant-design/icons-vue";
const show = ref(false);
const { profile, loading, defaultAvatar, saveProfile, updateAvatar } = useEditProfile();
const { fetchProfile } = useProfile();

const handleSave = async () => {
  await saveProfile();
  show.value = false;
  await fetchProfile();
};

// ใช้ beforeUpload เพื่อดักจับไฟล์
const beforeUpload = (file: File) => {
  updateAvatar(file); // preview + เก็บไฟล์
  return false; // ป้องกัน auto upload
};

const showPreview = ref(false);
const uploadRef = ref<any>(null);

// เปิด file selector
const openUpload = () => {
  uploadRef.value?.$el.querySelector('input[type="file"]')?.click();
};


</script>

<style scoped>
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
