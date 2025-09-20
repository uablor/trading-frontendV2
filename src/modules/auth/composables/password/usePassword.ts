import { onMounted, reactive, ref } from "vue";
import { clientApi } from "@/common/configurations/axios.config";
import { openNotificationWithIcon } from "@/common/ui/notificationwithIcon";
import type { AxiosError } from "axios";
import { message } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import type { Email } from "../../entities/auth.entities";

export function useResetPassword() {
  const route = useRoute();
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
      const result = await clientApi.post("send-reset-password/", form);

      if (result.status === 200) {
        openNotificationWithIcon(
          "success",
          "Success",
          "Successfully resent for reset password. Please check your email to reset your password."
        );
        clearForm();
        await waitOnemit();
      } else {
        openNotificationWithIcon(
          "error",
          "Error",
          "Failed to resent for reset password."
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
    // await waitOnemit();
  });
  return {
    waitonemit,
    waitOnemit,
    countdown,
    form,
    onFinish,
    loading,
    onFinishFailed,
    email_verify_,
  };
}

export function useConfirmPassword() {
  const route = useRoute();
  const waitonemit = ref<boolean>(false); // เริ่มต้น disable
  const countdown = ref<number>(30); // เวลาเริ่มต้น 30 วินาที

  const form = reactive<{ password: string; confirm_password: string }>({
    password: "",
    confirm_password: "",
  });

  const loading = ref<boolean>(false);
  const clearForm = () => {
    form.password = "";
    form.confirm_password = "";
  };

  const onFinish = async () => {
    loading.value = true;
    try {
      const encode_id = route.params.encode_id as string;
      const token = route.params.token as string;

      const result = await clientApi.patch(
        `reset-password/${encode_id}/${token}/`,
        form
      );

      if (result.status === 200) {
        openNotificationWithIcon(
          "success",
          "Success",
          "change new password successfully"
        );
        clearForm()
      } else {
        openNotificationWithIcon(
          "error",
          "Error",
          "Failed to resent for reset password."
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
    // await waitOnemit();
  });
  return {
    waitonemit,
    waitOnemit,
    countdown,
    form,
    onFinish,
    loading,
    onFinishFailed,
  };
}
