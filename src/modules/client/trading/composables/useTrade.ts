// composables/useTrade.ts
import { ref, computed } from "vue";

import { notification, Modal, Button } from "ant-design-vue";
import { h } from "vue";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons-vue";
import { clientApi } from "@/common/configurations/axios.config";
import { useWalletStore } from "../stores/trading.store";

export function useTrade() {
  const walletStore = useWalletStore();

  const price = ref<number>(0);
  const quickAmounts = [5, 10, 20, 50, 100];
  const profitPercentage = ref<number>(95);
  const is_button_enter = ref(false);
  const pendingTrade = ref<any>(null);

  const calculatedProfit = computed(() => {
    return (profitPercentage.value / 100) * price.value + price.value;
  });

  const decreaseAmount = () => {
    if (price.value > 0) price.value -= 1;
  };

  const increaseAmount = () => {
    price.value += 1;
  };

  const setAmount = (value: number | "all") => {
    if (value === "all") {
      // Logic to set max amount
    } else {
      price.value += value;
    }
  };

  const openNotificationWithIcon = (title: string, type: "success" | "error") => {
    const icon =
      type === "error"
        ? h(FrownOutlined, { class: "icon-error" })
        : h(SmileOutlined, { class: "icon-success" });

    notification[type]({
      message: title,
      class: "notification",
      icon,
      closeIcon: h("span", { class: "custom-close-icon" }, "x"),
      style: {
        width: "250px",
        height: "60px",
        backgroundColor: type === "error" ? "#e74c3c" : "#2ecc71",
        borderRadius: "8px",
        fontSize: "16px",
        padding: "20px",
      },
    });
  };

  const queueTrade = async (order_type: string, symbol: string) => {
    const ModeTrading = walletStore.selectedWalletMode === "real" ? false : true;
    if (price.value <= 0 || isNaN(price.value)) {
      openNotificationWithIcon("Warning ...", "error");
      return;
    }

    openNotificationWithIcon("Successful ...", "success");

    pendingTrade.value = { order_type, symbol, price: price.value, tradeMode: ModeTrading };
    await sendPendingTrade();
  };

  const sendPendingTrade = async () => {
    if (!pendingTrade.value) return;
    try {
      const response = await clientApi.post("trading/", pendingTrade.value);
      if (response.status !== 200) {
        console.error("Trade Error:", response.data);
      }
    } catch (error) {
      console.error("Trade API error:", error);
      alert("ข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    } finally {
      pendingTrade.value = null;
    }
  };

  // Modal Countdown
  const countDown = (title: string, content: string) => {
    let secondsToGo = 5;
    const formattedContent = content.replace(/\n/g, "<br/>");

    const ModalContent = {
      props: ["content"],
      template: `<div class="modal-content"><span v-html="content"></span></div>`,
    };

    const modal = Modal.success({
      title,
      style: { textAlign: "center", borderRadius: "3px" },
      content: h(ModalContent, { content: `${formattedContent}<br/><br/><br/> ${secondsToGo} seconds.` }),
      footer: [
        h(Button, { type: "primary", shape: "round", class: "custom-ok-btn w-[200px] h-[40px]", onClick: () => modal.destroy() }, "OK"),
      ],
    });

    const interval = setInterval(() => {
      secondsToGo -= 1;
      modal.update({ content: h(ModalContent, { content: `${formattedContent}<br/><br/><br/> ${secondsToGo} seconds.` }) });
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      modal.destroy();
    }, secondsToGo * 1000);
  };

  return {
    price,
    quickAmounts,
    calculatedProfit,
    is_button_enter,
    decreaseAmount,
    increaseAmount,
    setAmount,
    queueTrade,
    countDown,
  };
}
