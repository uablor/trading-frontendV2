<template>
    <a-card class="p-4 sm:p-6 w-full bg-gray-900 text-white rounded-2xl shadow-lg">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <div class="text-lg font-semibold">
                    {{ $t("wallet.totalBalance") }}
                </div>
                <div class="text-2xl sm:text-3xl font-bold text-green-500 pt-3 pb-3">
                    ${{ Price }}
                </div>
                <div class="text-sm text-gray-400">
                    {{ $t("wallet.pnlToday") }} ${{ PnL }} ({{ PnLPercent }}%)
                </div>
            </div>
            <div class="text-left sm:text-right w-full sm:w-auto">
                <div class="text-sm">{{ $t("wallet.last30Days") }}</div>
                <div class="text-red-500">
                    {{ $t("wallet.pnlLast30Days") }} ${{ PnL }}
                </div>
                <div class="w-24 sm:w-32 h-1 bg-red-500 mt-2"></div>
            </div>
        </div>
        <div class="flex flex-col sm:flex-row sm:space-x-4 gap-2 mb-6 w-full">
            <DepositComponent class="w-full sm:w-auto" />
            <WithdrawComponent class="w-full sm:w-auto" />
            <TransferComponent class="w-full sm:w-auto" />
        </div>

        <!-- Table Section -->
        <div class="h-[320px] overflow-x-auto overflow-y-auto rounded-lg">
            <a-card class="bg-gray-800 text-white rounded-lg min-w-[500px]">
                <TableComponent />
            </a-card>
        </div>
    </a-card>
</template>

<script setup lang="ts">
import DepositComponent from "../components/DepositModal.vue";
import WithdrawComponent from "../components/WithdrawModal.vue";
import TransferComponent from "../components/TransferModal.vue";
import TableComponent from "../components/Table.component.vue";

// ใช้ composable
import { useWallet } from "../composables/useWallet";

const { Price,wallet, PnL, PnLPercent } = useWallet();
</script>

<style scoped lang="scss"></style>
