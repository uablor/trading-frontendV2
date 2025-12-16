// src/modules/auth/stores/authStore.ts
import { defineStore } from "pinia";
import type { authtoken } from "../entities/auth.entities";

export const useAuthStore = defineStore("auth", () => {
  const Statelogin = async (payload: authtoken) => {
    localStorage.setItem("token", payload.access);
    localStorage.setItem("is_superuser", (payload.is_superuser ?? false).toString());
    localStorage.setItem("is_2fa_enabled", (payload.is_2fa_enabled ?? false).toString());
    localStorage.setItem("is_active", (payload.is_active ?? false).toString());
    localStorage.setItem("email", payload.email);
    localStorage.setItem("username", payload.username);
    if (Array.isArray(payload.group)) {
      localStorage.setItem("group", JSON.stringify(payload.group));
    }
    localStorage.setItem("refresh", payload.refresh);
  };

  const clearlogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("auth");

    sessionStorage.clear();

    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return { Statelogin, clearlogout };
});
