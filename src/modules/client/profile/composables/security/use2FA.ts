import { clientApi } from "@/common/configurations/axios.config";
import { message } from "ant-design-vue";
import type {  AxiosError } from "axios";
import { ref } from "vue";

export function use2FA() {
  const otpUrl = ref<string | null>(null);
  const qrCode = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const generateOTP = async () => {
    loading.value = true;
    try {
      const response = await clientApi.post("/generate-otp/");
      otpUrl.value = response.data.otp_url;
      qrCode.value = response.data.qr_code;
      if (response.status == 201) {
        message.success("Generate OTP successfully");
      }
      else {
        message.error("Generate OTP failed");
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

  return {
    otpUrl,
    qrCode,
    loading,
    generateOTP,
  };
}
