import { clientApi } from "@/common/configurations/axios.config";
import { ref } from "vue";
import { message } from "ant-design-vue";
import { useProfileStore } from "../../stores/profile.store";

export function useEditProfile() {
  const { profile } = useProfileStore();
  const loading = ref<boolean>(true);
  const defaultAvatar = ref<string>("https://via.placeholder.com/150");

  // เก็บ File object สำหรับส่งไป backend
  const avatarFile = ref<File | null>(null);

  const saveProfile = async () => {
    loading.value = true;
    if (!profile.username || !profile.email) return;

    try {
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("email", profile.email);

      if (avatarFile.value) {
        formData.append("avatar", avatarFile.value); // ส่งไฟล์จริง
      }

      await clientApi.patch("auth-me/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("update profile success");
    } catch (error: any) {
      message.error("Error saving profile");
      console.error(error);
    }
    finally {
      loading.value = false;
    }
  };

  const updateAvatar = (file: File) => {
    avatarFile.value = file; // เก็บไฟล์สำหรับส่ง
    const reader = new FileReader();
    reader.onload = (e) => {
      profile.avatar = e.target?.result as string; // สำหรับ preview
    };
    reader.readAsDataURL(file);
  };

  return {
    profile,
    loading,
    defaultAvatar,
    saveProfile,
    updateAvatar,
    avatarFile,
  };
}
