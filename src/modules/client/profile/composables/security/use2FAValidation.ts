import { ref } from "vue";
import { clientApi } from "@/common/configurations/axios.config";
import { message } from "ant-design-vue";
import type { AxiosError } from "axios";

export function use2FAValidation() {
  const otp = ref<string>("");
  const loading = ref<boolean>(false);

  const validateOTP = async () => {
    if (!otp.value) return;
    loading.value = true;

    try {
      const response = await clientApi.post("validate-otp/", {
        otp: otp.value,
      });
      if (response.status == 200) {
        message.success("Validate OTP successfully");
        window.location.reload();
      }
      if (response.status == 201) {
        message.error("Validate OTP successfully");
        window.location.reload();
      } else {
        message.error("Validate OTP failed");
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

  return { otp, loading, validateOTP };
}
