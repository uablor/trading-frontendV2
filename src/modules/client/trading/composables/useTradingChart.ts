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
import { BaseWebsocket } from "@/common/configurations/ws.config";

export function useTradingChart(symbol: string) {
  const chartContainer = ref<HTMLDivElement | null>(null);
  const chart = ref<IChartApi | null>(null);
  const candleSeries = ref<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeries = ref<ISeriesApi<"Histogram"> | null>(null);
  const loading = ref<boolean>(true);
  let resizeObserver: ResizeObserver | null = null;
  let ws: ReturnType<typeof BaseWebsocket>; // ⚡ keep reference

  const resizeChart = () => {
    if (chart.value && chartContainer.value) {
      chart.value.applyOptions({
        width: chartContainer.value.clientWidth,
        height: chartContainer.value.clientHeight,
      });
    }
  };

  const initChart = async () => {
    await nextTick();
    if (!chartContainer.value) return;
    chart.value = createChart(chartContainer.value, {
      width: chartContainer.value.clientWidth,
      height: chartContainer.value.clientHeight - 50,
      layout: { background: { color: "#fff" }, textColor: "#000" },
      grid: {
        vertLines: { color: "rgba(102, 102, 102, 0.2)" },
        horzLines: { color: "rgba(102, 102, 102, 0.2)" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 8,
        fixRightEdge: false,
        barSpacing: 10,
        minBarSpacing: 0.5,
        fixLeftEdge: false,
      },
      // ... options เดิม
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
      crosshair: {
        mode: 1,
        vertLine: {
          width: 1,
          color: "#758696",
          style: 2,
        },
        horzLine: {
          width: 1,
          color: "#758696",
          style: 2,
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
    candleSeries.value.priceScale().applyOptions({
      scaleMargins: {
        top: 0,
        bottom: 0.3,
      },
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
      const response = await clientApi.get(`klines`);
      loading.value = false;
      const data: KlineData[] = response.data;

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
      throw err; // ส่งต่อ error เพื่อให้ onMounted จัดการ
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

  onMounted(async () => {
    try {
      loading.value = true;

      // รอให้ DOM พร้อม
      await nextTick();

      // รอสักครู่เพื่อให้ container พร้อม
      await new Promise((resolve) => setTimeout(resolve, 100));

      await initChart();
      await fetchInitialData();

      // เชื่อมต่อ WebSocket
      ws = BaseWebsocket(`klines/`);
      ws.onMessage(handleWebSocketData);
      ws.connect();

      // รอสักครู่ก่อนปิด loading เพื่อให้ chart render เสร็จ
      await new Promise((resolve) => setTimeout(resolve, 200));

      loading.value = false;
    } catch (error) {
      console.error("Error initializing chart:", error);
      loading.value = false;
    } finally {
      loading.value = false;
    }
  });

  onBeforeUnmount(() => {
    ws?.close();
    resizeObserver?.disconnect();
  });

  return { chartContainer, loading };
}
