import { reactive, ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { message, notification } from "ant-design-vue";
import { useRouter } from "vue-router";
import type { AuthLoginPayload } from "../interfaces/auth.interfaces";
import { clientApi } from "@/common/configurations/axios.config";
import type { AxiosError } from "axios";

export function useLoginForm() {
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
      const result = await clientApi.post("auth/login/", form);
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
          authStore.Statelogin(result.data);
          console.log("admin");
          console.log(result.data);
          const groups = result.data.group ?? [];

          if (groups.includes("Admin") || result.data.is_superuser) {
            await router.push({ name: "admin.dashboard" });
            console.log("to admin dashboard");
          } else if (groups.includes("Staff")) {
            await router.push({ name: "staff.dashboard" });
          } else {
            await router.push({ name: "customer.lucifer.trading.btc" });
          }
        } else {
          openNotificationWithIcon("error", "Error", "Login failed");
        }
      }
    } catch (e: AxiosError | any) {
      if (e.response?.data) {
        const errors = e.response.data;
        for (const field in errors) {
          if (Array.isArray(errors[field])) {
            errors[field].forEach((msg: string) => {
              message.error(msg);
            });
          } else if (typeof errors[field] === "string") {
            message.error(errors[field]);
          }
        }
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
