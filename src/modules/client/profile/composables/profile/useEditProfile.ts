import { clientApi } from "@/common/configurations/axios.config";
import { ref, reactive, onMounted } from "vue";
import type { Profile } from "../../entities/profile.entities";
import { message } from "ant-design-vue";

export function useEditProfile() {
  const profile = reactive<Profile>({
    username: "",
    email: "",
    avatar: "",
  });

  const loading = ref<boolean>(true);

  const defaultAvatar = ref<string>("https://via.placeholder.com/150");

  const saveProfile = async () => {
    if (!profile.username || !profile.email) return;
    try {
      const response = await clientApi.patch("auth-me/", {
        username: profile.username,
        email: profile.email,
        avatar: profile.avatar,
        
      });
      
      message.success("update profile success");
    } catch (error: any) {
      message.error("Error saving profile:", error);
    }
  };

  const updateAvatar = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      profile.avatar = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return {
    profile,
    loading,
    defaultAvatar,
    saveProfile,
    updateAvatar,
  };
}
