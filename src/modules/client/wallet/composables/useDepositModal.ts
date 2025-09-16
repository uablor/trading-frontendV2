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
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return {
    showModal,
    activeTab,
    openModal,
    closeModal,
    copyToClipboard,
  };
}
