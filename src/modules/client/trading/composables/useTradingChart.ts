// composables/useTradingChart.ts
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type HistogramData,
  type CandlestickData,
} from "lightweight-charts";
import { debounce } from "lodash";
import { clientApi } from "@/common/configurations/axios.config";
import type { KlineData } from "../entities/klinedata.entities";
import type { WebSocketKline } from "../entities/websocketkline.entities";

export function useTradingChart(symbol: string) {
  const chartContainer = ref<HTMLDivElement | null>(null);
  const chart = ref<IChartApi | null>(null);
  const candleSeries = ref<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeries = ref<ISeriesApi<"Histogram"> | null>(null);
  const loading = ref<boolean>(true);

  let socket: WebSocket | null = null;
  const reconnectAttempts = ref(0);
  const maxReconnectAttempts = 10;

  let resizeObserver: ResizeObserver | null = null;

  const resizeChart = () => {
    if (chart.value && chartContainer.value) {
      chart.value.applyOptions({
        width: chartContainer.value.clientWidth,
        height: chartContainer.value.clientHeight,
      });
    }
  };

  // 🟢 Init Chart
  const initChart = async () => {
    await nextTick();
    if (!chartContainer.value) return;

    chart.value = createChart(chartContainer.value, {
      width: chartContainer.value.clientWidth,
      height: 450,
      layout: { background: { color: "#fff" }, textColor: "#000" },
      grid: {
        vertLines: { color: "rgba(102, 102, 102, 0.2)" },
        horzLines: { color: "rgba(102, 102, 102, 0.2)" },
      },
      timeScale: { timeVisible: true, secondsVisible: false },
      crosshair: {
        mode: 1,
        vertLine: {
          color: "#6A5ACD",
          width: 1,
          visible: true,
          labelVisible: true,
        },
        horzLine: {
          color: "#6A5ACD",
          width: 1,
          visible: true,
          labelVisible: true,
        },
      },
    });

    candleSeries.value = chart.value.addCandlestickSeries({
      upColor: "#07C95B",
      downColor: "#EE0B30",
      borderUpColor: "#07C95B",
      borderDownColor: "#EE0B30",
      wickUpColor: "#07C95B",
      wickDownColor: "#EE0B30",
    });

    volumeSeries.value = chart.value.addHistogramSeries({
      color: "rgba(38, 166, 154, 0.3)",
      priceFormat: { type: "volume" },
      priceScaleId: "vol",
    });

    volumeSeries.value.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    chart.value.timeScale().scrollToRealTime();

    resizeObserver = new ResizeObserver(resizeChart);
    resizeObserver.observe(chartContainer.value);
  };

  const fetchInitialData = async () => {
    try {
      //   const response = await fetch(
      //     `http://127.0.0.1:8000/api/klines/${symbol}/`
      //   );
      const response = await clientApi.get(`http://127.0.0.1:8000/api/klines/`);
      loading.value = false;
      const data: KlineData[] = await response.data;

      const klineData: CandlestickData[] = data.map((d) => ({
        time: d.time,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }));

      const volumeData: HistogramData[] = data.map((d) => ({
        time: d.time,
        value: d.volume,
        color: d.open < d.close ? "#07C95B" : "#EE0B30",
      }));

      candleSeries.value?.setData(klineData);
      volumeSeries.value?.setData(volumeData);
    } catch (err) {
      console.error(`Error fetching ${symbol} data:`, err);
    }
  };

  const handleWebSocketData = debounce((data: { klines: WebSocketKline }) => {
    const k = data.klines;
    if (!k || !candleSeries.value || !volumeSeries.value) return;

    const klineData: CandlestickData = {
      time: k.time,
      open: Number(k.open),
      high: Number(k.high),
      low: Number(k.low),
      close: Number(k.close),
    };

    const volumeData: HistogramData = {
      time: k.time,
      value: Number(k.volume) || 0,
      color: klineData.open < klineData.close ? "#07C95B" : "#EE0B30",
    };

    requestAnimationFrame(() => {
      candleSeries.value?.update(klineData);
      volumeSeries.value?.update(volumeData);
      if (loading.value) loading.value = false; 
    });
  }, 300);

  const connectWebSocket = () => {
    socket?.close();
    // socket = new WebSocket(`ws://127.0.0.1:9000/ws/klines/${symbol}/`);
    socket = new WebSocket(`ws://127.0.0.1:9000/ws/klines/`);
    socket.onopen = () => {
      console.log(`✅ WebSocket connected: ${symbol}`);
      reconnectAttempts.value = 0;
    };
    socket.onmessage = (event: MessageEvent) => {
      try {
        handleWebSocketData(JSON.parse(event.data));
      } catch (e) {
        console.error(e);
      }
    };
    socket.onerror = (err) =>
      console.error(`WebSocket error (${symbol}):`, err);
    socket.onclose = () => {
      console.log(`🔄 WebSocket disconnected: ${symbol}`);
      if (reconnectAttempts.value < maxReconnectAttempts) {
        reconnectAttempts.value++;
        setTimeout(connectWebSocket, 5000);
      }
    };
  };

  onMounted(async () => {
    loading.value = true;
    await initChart();
    await fetchInitialData();
    loading.value = false; 
    connectWebSocket();
    
  });

  onBeforeUnmount(() => {
    socket?.close();
    resizeObserver?.disconnect();
  });

  return { chartContainer ,loading};
}
