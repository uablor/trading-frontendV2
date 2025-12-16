import { clientApi } from "@/common/configurations/axios.config";
import { ref, onMounted } from "vue";
import type { Profile } from "../../entities/profile.entities";
import { useProfileStore } from "../../stores/profile.store";

export function useProfile() {
  const profile = useProfileStore();

  const loading = ref<boolean>(true);

  const fetchProfile = async () => {
    loading.value = true;
    try {
      const response = await clientApi.get<Profile>("/auth/me/");
      // console.log(response.data);
       Object.assign(profile.profile, response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    await fetchProfile();
  });

  return {
    loading,
    fetchProfile,
  };
}
