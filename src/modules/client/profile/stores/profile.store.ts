import { defineStore } from "pinia";
import type { ProfileMe } from "../entities/profile.entities";
import { reactive } from "vue";

export const useProfileStore = defineStore('profile', () => {
    const profile = reactive<ProfileMe>({
        avatar: "",
        created_at: "",
        date_joined: "",
        deleted_at: null,
        email: "",
        groups: [],
        id: 0,
        is_2fa_enabled: false,
        is_active: false,
        is_deleted: false,
        is_staff: false,
        is_superuser: false,
        is_verify: false,
        last_login: "",
        updated_at: "",
        user_permissions: [],
        username: "",
    });

    return { profile };
}
 
);
