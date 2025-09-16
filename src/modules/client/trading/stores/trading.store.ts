import { defineStore } from 'pinia';

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    selectedWalletMode: localStorage.getItem('walletMode') || 'real', // Default to 'pinai'
  }),
  actions: {

    setSelectedWalletMode(mode: string) {
      this.selectedWalletMode = mode;
      // Save the selected mode to localStorage whenever it changes
      localStorage.setItem('walletMode', mode);
    },
  },
});