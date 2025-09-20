import { onMounted, reactive, ref } from "vue";
import { clientApi } from "@/common/configurations/axios.config";
import { openNotificationWithIcon } from "@/common/ui/notificationwithIcon";
import type { AxiosError } from "axios";
import { message } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import type { Email } from "../entities/auth.entities";

export function useResendVerifyEmailForm() {
  const route = useRoute();
  const router = useRouter();
  const waitonemit = ref<boolean>(false); // เริ่มต้น disable
  const countdown = ref<number>(30); // เวลาเริ่มต้น 30 วินาที

  const form = reactive<Email>({
    email: "",
  });

  const loading = ref<boolean>(false);
  const email_verify_ = ref<boolean>(false);
  const clearForm = () => {
    form.email = "";
  };

  const onFinish = async () => {
    loading.value = true;
    try {
      const result = await clientApi.post("resend-verify-email/", form);

      if (result.status === 200) {
        openNotificationWithIcon(
          "success",
          "Success",
          "Successfully resent verification email. Please check your email to verify your account."
        );
        clearForm();
        await waitOnemit();
      } else {
        openNotificationWithIcon(
          "error",
          "Error",
          "Failed to resend verification email."
        );
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
    message.error("Please enter a valid email before resending.");
  };
  const waitOnemit = () => {
    const timer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
      } else {
        waitonemit.value = false;
        clearInterval(timer);
      }
    }, 1000);
  };

  onMounted(async () => {
    form.email = (route.query.email as string) || "";
  });
  return {
    waitonemit,
    countdown,
    form,
    onFinish,
    loading,
    onFinishFailed,
    email_verify_,
  };
}

export const useVerifyEmailForm = () => {
  const route = useRoute();
  const loading = ref<boolean>(false);
  const email_verify_ = ref<boolean>(false);

  const email_verify = async () => {
    loading.value = true;
    email_verify_.value = true;

    try {
      const uid = route.query.uid as string;
      const token = route.query.token as string;
      if (!uid || !token) {
        openNotificationWithIcon(
          "error",
          "Error",
          `Cannot verify email without ${uid} and ${token}`
        );
        return;
      }
      const result = await clientApi.get("verify-email/", {
        params: { uid, token },
      });
      if (
        result.status === 200 &&
        result.data.detail == "Email is already verified."
      ) {
        openNotificationWithIcon(
          "success",
          "Success",
          "Email is already verified."
        );
      } else if (result.status === 200) {
        openNotificationWithIcon(
          "success",
          "Success",
          "Email verify successful"
        );
      } else {
        openNotificationWithIcon("error", "Error", "Email verify failed");
      }
      email_verify_.value = false;
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

  return { email_verify, loading, email_verify_ };
};
