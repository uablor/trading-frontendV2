<template>
    <section>
        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-content">
                <h1 class="hero-title">{{ $t("hero.title") }}</h1>
                <p class="hero-description">
                    {{ $t("hero.description") }}
                </p>
                <button class="btn btn-trade" @click="triggerLogin">
                    {{ $t("hero.tradeNow") }}
                </button>
            </div>
            <div class="hero-image">
                <img src="@/assets/image/logo/R.png" alt="Trading Illustration" />
            </div>
        </section>

        <!-- Crypto Ticker Section -->
        <section class="crypto-ticker text-white">
            <p class="ticker-title">
                <i class="fa fa-bullhorn text-white"></i>
                {{ $t("crypto.tickerTitle") }}
            </p>

            <div class="crypto-cards-wrapper">
                <div class="crypto-cards">
                    <div v-for="crypto in cryptos" :key="crypto.id" class="crypto-card">
                        <img :src="crypto.icon" :alt="crypto.name" class="crypto-icon" />
                        <span class="crypto-name">{{ crypto.name }}</span>
                        <p class="crypto-price">{{ getPrice(crypto.symbol) }}</p>
                        <span :class="{
                            positive: Number(getChange24h(crypto.symbol)) > 0,
                            negative: Number(getChange24h(crypto.symbol)) < 0
                        }" class="crypto-change">
                            {{ Number(getChange24h(crypto.symbol)) > 0 ? "+" : "" }}
                            {{ Number(getChange24h(crypto.symbol)) }}%
                        </span>
                    </div>

                    <!-- Duplicate cards for seamless loop -->
                    <div v-for="crypto in cryptos" :key="'duplicate-' + crypto.id" class="crypto-card">
                        <img :src="crypto.icon" :alt="crypto.name" class="crypto-icon" />
                        <span class="crypto-name">{{ crypto.name }}</span>
                        <p class="crypto-price">{{ getPrice(crypto.symbol) }}</p>
                        <span :class="{
                            positive: Number(getChange24h(crypto.symbol)) > 0,
                            negative: Number(getChange24h(crypto.symbol)) < 0
                        }" class="crypto-change">
                            {{ Number(getChange24h(crypto.symbol)) > 0 ? "+" : "" }}
                            {{ Number(getChange24h(crypto.symbol)) }}%
                        </span>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";

import btcIcon from "@/assets/image/iconCrypto/bitcoin-btc-logo.png";
import bchIcon from "@/assets/image/iconCrypto/bitcoin-cash-bch-logo.png";
import ethIcon from "@/assets/image/iconCrypto/ethereum-eth-logo.png";
import solIcon from "@/assets/image/iconCrypto/solana-sol-logo.png";
import adaIcon from "@/assets/image/iconCrypto/cardano-ada-logo.png";
import dogeIcon from "@/assets/image/iconCrypto/dogecoin-doge-logo.png";
import shibaIcon from "@/assets/image/iconCrypto/shiba-inu-shib-logo.png";
import bnbIcon from "@/assets/image/iconCrypto/binance-coin-bnb-logo.png";

interface Crypto {
    id: number;
    name: string;
    icon: string;
    symbol: string;
}

interface Coin {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
}

const cryptos = ref<Crypto[]>([
    { id: 1, name: "BTC/USDT", icon: btcIcon, symbol: "BTC" },
    { id: 2, name: "ETH/USDT", icon: ethIcon, symbol: "ETH" },
    { id: 3, name: "SOL/USDT", icon: solIcon, symbol: "SOL" },
    { id: 4, name: "ADA/USDT", icon: adaIcon, symbol: "ADA" },
    { id: 5, name: "DOGE/USDT", icon: dogeIcon, symbol: "DOGE" },
    { id: 6, name: "SHIBA/USDT", icon: shibaIcon, symbol: "SHIBA" },
    { id: 7, name: "BNB/USDT", icon: bnbIcon, symbol: "BNB" },
    { id: 8, name: "BCH/USDT", icon: bchIcon, symbol: "BCH" }
]);

const coins = ref<Coin[]>([
    { symbol: "BTC", name: "Bitcoin", price: 95787.96, change24h: -0.28 },
    { symbol: "ETH", name: "Ethereum", price: 3649.57, change24h: 0.16 },
    { symbol: "BNB", name: "Binance Coin", price: 748.79, change24h: 14.74 },
    { symbol: "BCH", name: "Bitcoin Cash", price: 565.4, change24h: 5.36 },
    { symbol: "SOL", name: "Solana", price: 235.91, change24h: 3.35 },
    { symbol: "USDT", name: "Tether", price: 1, change24h: 0 }
]);

const getPrice = (symbol: string): string => {
    const coin = coins.value.find((c) => c.symbol === symbol);
    return coin ? coin.price.toFixed(2) : "N/A";
};

const getChange24h = (symbol: string): string | number => {
    const coin = coins.value.find((c) => c.symbol === symbol);
    return coin ? coin.change24h.toFixed(2) : "N/A";
};

const triggerLogin = (): void => {
    router.push({ name: "auth.login" });
};
</script>

<style scoped lang="scss">
.crypto-ticker {
    margin-top: 50px;
    padding: 20px;
    // background-color: rgba(116, 58, 143, 1);
    border-radius: 4px;
    overflow: hidden;

    .ticker-title {
        font-size: 1.2rem;
        margin-bottom: 20px;
    }

    .crypto-cards-wrapper {
        display: flex;
        overflow-x: hidden;
        width: 100%;

        .crypto-cards {
            display: flex;
            flex-wrap: nowrap;
            min-width: max-content;
            animation: scroll-left-to-right 30s linear infinite;

            .crypto-card {
                // background-color: #2a2a2a;
                padding: 12px;
                border-radius: 8px;
                text-align: center;
                color: #000000;
                margin-right: 12px;
                width: 160px;
                flex-shrink: 0;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

                .crypto-icon {
                    width: 32px;
                    height: 32px;
                    margin-bottom: 8px;
                    margin-left: 50px;
                }

                .crypto-name {
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 6px;
                }

                .crypto-price {
                    font-size: 13px;
                    color: #000000;
                }

                .crypto-change {
                    font-size: 12px;

                    &.positive {
                        color: #4caf50;
                    }

                    &.negative {
                        color: #f44336;
                    }
                }
            }
        }
    }
}

@keyframes scroll-left-to-right {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

/* Hero Section */
.hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;

    .hero-content {
        max-width: 50%;

        .hero-title {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        .hero-description {
            font-size: 1rem;
            color: #b0b0b0;
            margin-bottom: 30px;
        }

        .btn-trade {
            padding: 10px 20px;
            background-color: #22db31;
            color: #ffffff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    }

    .hero-image {
        img {
            max-width: 100%;
            height: auto;
        }
    }
}
</style>
