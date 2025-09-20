// src/composables/useWallet.ts
import { clientApi } from "@/common/configurations/axios.config";
import { ref, onMounted } from "vue";
import { useWalletStore } from "../stores/wallet.store";

export function useWallet() {
  const { wallet } = useWalletStore();
  const Price = ref<number>(0);
  const PnL = ref<number>(0);
  const PnLPercent = ref<number>(0);
  const loading = ref<boolean>(false);

  const GetPrice = async (): Promise<void> => {
    try {
      loading.value = true;
      const response = await clientApi.get("wallet/");
      Object.assign(wallet, response.data.results[0]);
      console.log(wallet);
      if (response.data?.results?.length) {
        Price.value = response.data.results[0].real_balance;
      } else {
        Price.value = 0;
      }
      loading.value = false;  
    } catch (error) {
      console.error("Error fetching wallet price:", error);
      Price.value = 0;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    GetPrice();
  });

  return {
    loading,
    Price,
    wallet,
    PnL,
    PnLPercent,
    GetPrice,
  };
}
