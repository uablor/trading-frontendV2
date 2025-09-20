import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { AuthRegisterPayload } from "../interfaces/auth.interfaces";
import { clientApi } from "@/common/configurations/axios.config";
import { openNotificationWithIcon } from "@/common/ui/notificationwithIcon";
import type { AxiosError } from "axios";
import { message } from "ant-design-vue";

export function useRegisterForm() {
  const form = reactive<AuthRegisterPayload>({
    email: "",
    password: "",
    username: "",
    password2: "",
  });

  const loading = ref<boolean>(false);
  const router = useRouter();

  const clearForm = () => {
    form.email = "";
    form.password = "";
    form.username = "";
    form.password2 = "";
  };
  const onFinish = async () => {
    loading.value = true;
    try {
      const result = await clientApi.post("user-register/", form);

      if (result.status === 201) {
        openNotificationWithIcon("success", "Success", "Register successful");
        clearForm();
        await router.push({ name: "auth.verify", params: { email: form.email } });
        openNotificationWithIcon(
          "info",
          "Info",
          "Please check your email to verify your account."
        );
      } else {
        openNotificationWithIcon("error", "Error", "Login failed");
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
