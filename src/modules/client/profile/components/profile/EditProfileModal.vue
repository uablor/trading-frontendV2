<template>
  <a-button type="default" @click="show = true" class="mt-4">
    {{ $t('profile.editProfilePicture') }}
  </a-button>

  <a-modal
    v-model:open="show"
    :title="$t('profile.editProfile')"
    width="400px"
    :centered="true"
    ok-text="$t('profile.save')"
    @ok="handleSave"
    @cancel="show = false"
  >
    <div class="text-center mb-4 flex flex-col gap-2">
      <a-avatar
        :src="profile.avatar || defaultAvatar"
        size="large"
        class="mx-auto !w-32 !h-32"
      />
      <a-upload
        :show-upload-list="false"
        :before-upload="beforeUpload"
        class="mt-2"
      >
        <a-button size="small">{{ $t('common.upload') }}</a-button>
      </a-upload>
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
import { useProfileStore } from '../../stores/profile.store';
import { useProfile } from "../../composables/profile/useProfile";
const { profile } = useProfileStore();
const show = ref(false)

const {
  defaultAvatar,
  saveProfile,
  updateAvatar,
} = useEditProfile();

const { fetchProfile } = useProfile();

const handleSave = async () => {
  await saveProfile();
  show.value = false;
  await fetchProfile();
};

const beforeUpload = (file: File) => {
  updateAvatar(file);
  
  return false;

};
</script>

<style scoped>
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
