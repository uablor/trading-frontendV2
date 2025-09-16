import { reactive, ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import type { AuthRegisterPayload } from "../interfaces/auth.interfaces";
import { clientApi } from "@/common/configurations/axios.config";
import { useI18n } from "vue-i18n";
import { openNotificationWithIcon } from "@/common/ui/notificationwithIcon";

export function useRegisterForm() {
  const { t } = useI18n();
  const form = reactive<AuthRegisterPayload>({
    email: "",
    password: "",
    username: "",
    password2: "",
  });

  const loading = ref<boolean>(false);
  const router = useRouter();
  const onFinish = async () => {
    loading.value = true;
    try {
      const result = await clientApi.post("user-register/", form);
      if (result.data.is_2fa_enabled) {
        router.push({
          name: "verify2fa",
          query: {
            email: form.email,
            twoFALoginToken: result.data.access,
          },
        });
      } else {
        if (result.status === 201) {
          openNotificationWithIcon("success", "Success", "Register successful");
          await router.push({ name: "customer.lucifer" });
        } else {
          openNotificationWithIcon("error", "Error", "Login failed");
        }
      }
    } catch (error: any) {
      if (error.response.data.non_field_errors) {
        openNotificationWithIcon(
          "error",
          "Error",
          `${t("error.message.login")}`
        );
      } else {
        openNotificationWithIcon(
          "error",
          "Error",
          `${t("error.message.login")}`
        );
      }
    } finally {
      loading.value = false;
    }
  };

  const onFinishFailed = () => {
    // error.value = "Login failed. Please check your credentials.";
  };

  return { form, onFinish, loading, onFinishFailed };
}
