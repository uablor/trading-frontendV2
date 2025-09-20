import { defineStore } from "pinia";
import { reactive } from "vue";
import type { WalletEntity } from "../entities/wallet.enitity";

export const useWalletStore = defineStore('wallet', () => {
      const wallet = reactive<WalletEntity>({
        currency: "",
        demo_balance: 0,
        real_balance: 0,
        last_updated: "",
        reserved: 0
      });

    return { wallet };
}
 
);
