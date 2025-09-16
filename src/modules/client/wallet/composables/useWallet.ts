// src/composables/useWallet.ts
import { clientApi } from "@/common/configurations/axios.config";
import { ref, onMounted } from "vue";
import type { WalletEntity } from "../entities/wallet.enitity";

export function useWallet() {
  const wallet = ref<WalletEntity[]>([]);
  const Price = ref<number>(0);
  const PnL = ref<number>(0);
  const PnLPercent = ref<number>(0);

  const GetPrice = async (): Promise<void> => {
    try {
      const response = await clientApi.get("wallet/");
      wallet.value = response.data.results;
      if (response.data?.results?.length) {
        Price.value = response.data.results[0].real_balance;
      } else {
        Price.value = 0;
      }
    } catch (error) {
      console.error("Error fetching wallet price:", error);
      Price.value = 0;
    }
  };

  onMounted(() => {
    GetPrice();
  });

  return {
    Price,
    wallet,
    PnL,
    PnLPercent,
    GetPrice,
  };
}
