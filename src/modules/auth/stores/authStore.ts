// src/modules/auth/stores/authStore.ts
import { defineStore } from "pinia";
import type { authtoken } from "../entities/auth.entities";

export const useAuthStore = defineStore("auth", () => {
  const Statelogin = async (payload: authtoken) => {
    localStorage.setItem("token", payload.access);
    localStorage.setItem("is_superuser", payload.is_superuser.toString());
    localStorage.setItem("role", payload.role);
    localStorage.setItem("refresh", payload.refresh);
    localStorage.setItem("user_id", payload.user_id.toString());
    // localStorage.setItem("role", payload.role);
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
