import { clientApi } from "@/common/configurations/axios.config";
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
      qrCode.value = response.data.qr_code; // Base64 QR code
    } catch (error) {
      console.error("Cannot generate OTP:", error);
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
