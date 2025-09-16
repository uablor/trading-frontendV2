import { ref } from "vue";
import { clientApi } from "@/common/configurations/axios.config";

export function use2FAValidation() {
  const otp = ref<string>("");
  const message = ref<string | null>(null);
  const messageType = ref<"success" | "error" | "">("");
  const loading = ref<boolean>(false);

  const validateOTP = async () => {
    if (!otp.value) return;
    loading.value = true;

    try {
      const response = await clientApi.post("validate-otp/", { otp: otp.value });
      message.value = response.data.detail;
      messageType.value = "success";
      return true;
    } catch (error: any) {
      if (error.response && error.response.data) {
        message.value = error.response.data.detail || "เกิดข้อผิดพลาด";
        messageType.value = "error";
      } else {
        message.value = "เกิดข้อผิดพลาด";
        messageType.value = "error";
      }
      return false;
    } finally {
      loading.value = false;
    }
  };

  return { otp, message, messageType, loading, validateOTP };
}
