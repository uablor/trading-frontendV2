import { clientApi } from "@/common/configurations/axios.config";
import { message } from "ant-design-vue";
import { ref, onMounted } from "vue";

export interface SecurityData {
  is_2fa_enabled: boolean;
  transaction_password_enabled: boolean;
}

export function useSecurity() {
  const securityData = ref<SecurityData | null>(null);
  const loading = ref<boolean>(true);

  const fetchSecurityData = async () => {
    loading.value = true;
    try {
      const response = await clientApi.get("/user/");
      if (response.data.results && response.data.results.length > 0) {
        securityData.value = response.data.results[0];
      }
    } catch (error: any) {
      message.error("Error fetching security data:", error);
    } finally {
      loading.value = false;
    }
  };

  const toggle2FA = async () => {
    if (!securityData.value) return;
    try {
      // ตัวอย่าง API update 2FA
      securityData.value.is_2fa_enabled = !securityData.value.is_2fa_enabled;
      await clientApi.put("/user/2fa-toggle/", {
        enabled: securityData.value.is_2fa_enabled,
      });
    } catch (error) {
      console.error("Error toggling 2FA:", error);
    }
  };

  const toggleTransactionPassword = async () => {
    if (!securityData.value) return;
    try {
      securityData.value.transaction_password_enabled =
        !securityData.value.transaction_password_enabled;
      await clientApi.put("/user/transaction-password-toggle/", {
        enabled: securityData.value.transaction_password_enabled,
      });
    } catch (error) {
      console.error("Error toggling transaction password:", error);
    }
  };

  onMounted(async () => {
    await fetchSecurityData();
  });

  return {
    securityData,
    loading,
    fetchSecurityData,
    toggle2FA,
    toggleTransactionPassword,
  };
}
