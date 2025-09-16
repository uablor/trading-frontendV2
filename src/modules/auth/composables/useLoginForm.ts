import { reactive, ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router";
import type { AuthLoginPayload } from "../interfaces/auth.interfaces";
import { clientApi } from "@/common/configurations/axios.config";
import type { IResponseError } from "@/common/interfaces/repones.error";
import { useI18n } from "vue-i18n";

export function useLoginForm() {
  const { t } = useI18n();
  const form = reactive<AuthLoginPayload>({ email: "", password: "" });

  const loading = ref(false);
  const authStore = useAuthStore();
  const router = useRouter();

  const openNotificationWithIcon = (
    type: string,
    message?: string,
    description?: string
  ) => {
    (notification as any)[type]({
      message: message,
      description: description,
    });
  };

  const onFinish = async () => {
    loading.value = true;
    try {
      const result = await clientApi.post("user-login/", form);
      if (result.data.is_2fa_enabled) {
        router.push({
          name: "verify2fa",
          query: {
            email: form.email,
            twoFALoginToken: result.data.access,
          },
        });
      } else {
        if (result.status === 200) {
          openNotificationWithIcon("success", "Success", "Login successful");
          await authStore.Statelogin(result.data);
          await router.push({ name: "customer.lucifer.trading.btc" });
        } else {
          openNotificationWithIcon("error", "Error", "Login failed");
        }
      }
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data.non_field_errors[0] === "รหัสผ่านไม่ถูกต้อง." || error.response.data.non_field_errors[0] === "อีเมลนี้ไม่ได้ลงทะเบียน.") {
        openNotificationWithIcon(
          "error",
          "Error",
          `${t("error.message.passwor_or_email_is_incorrect")}`
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
