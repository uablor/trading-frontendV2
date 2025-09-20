import { message } from "ant-design-vue";
import { ref } from "vue";

export function useDepositModal() {
  const showModal = ref(false);
  const activeTab = ref("internal");

  const openModal = () => {
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
  };

  const copyToClipboard = async (text: string) => {
  
      navigator.clipboard.writeText(text)
    .then(() => {
      message.success("Copied to clipboard");
    })
    .catch(() => {
      message.error("Failed to copy to clipboard");
    });
  };

  return {
    showModal,
    activeTab,
    openModal,
    closeModal,
    copyToClipboard,
  };
}
