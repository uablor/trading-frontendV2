<template>
  <div class="chart-container">
    <div ref="chartContainer" class="chart"></div>
    <div ref="volumeContainer" class="volume"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { createChart } from 'lightweight-charts';

// 🟢 Refs
const chartContainer = ref(null);
const chart = ref(null);
const volume = ref(null);
const volumeContainer = ref(null)
const candleSeries = ref(null);
const volumeSeries = ref(null);
const seriesData = ref([]);

// 🟢 WebSocket Management
let socket = null;
const reconnectAttempts = ref(0);
const maxReconnectAttempts = 10;

// 🟢 Initialize Chart
const initChart = async () => {
  await nextTick();

  chart.value = createChart(chartContainer.value, {
    width: 950,
    height: 450,
    layout: { background: { color: '#1f1f1f' }, textColor: '#fff' },
    grid: { vertLines: { color: 'rgba(102, 102, 102, 0.2)' }, horzLines: { color: 'rgba(102, 102, 102, 0.2)' } },
    timeScale: { timeVisible: true,secondsVisible: false, rightOffset: 10, fixLeftEdge: true },
    priceScale: {
            position: 'right',
            alignLabels: 'center',
            borderColor: '#333333', // Color of the price scale border
        },
        crosshair: {
      mode: 1,
      vertLine: { color: '#6A5ACD', width: 1, visible: true, labelVisible: true },
      horzLine: { color: '#6A5ACD', width: 1, visible: true, labelVisible: true },
    },
  });

  // ✅ Candlestick Series
  candleSeries.value = chart.value.addCandlestickSeries({
    upColor: '#07C95B', downColor: '#EE0B30',
    borderUpColor: '#07C95B', borderDownColor: '#EE0B30',
    wickUpColor: '#07C95B', wickDownColor: '#EE0B30',
    
  });


  // ✅ Volume Series (แก้ไข)
  volumeSeries.value = chart.value.addHistogramSeries({
    color: 'rgba(38, 166, 154, 0.3)',
    priceFormat: { type: 'volume' },
    priceScaleId: 'vol', // 🟢 สร้าง Price Scale แยกให้ Volume
  });

  // ✅ กำหนด Price Scale ของ Volume
  volumeSeries.value.priceScale().applyOptions({
    scaleMargins: { top: 0.8, bottom: 0 }, // 🟢 ให้ Volume อยู่ด้านล่าง
  });
    const logicalRange = { from: 10, to: 80 };
    chart.value.timeScale().setVisibleLogicalRange(logicalRange);
  // chart.value.timeScale().fitContent();
  chart.value.timeScale().scrollToRealTime();
};


const fetchInitialData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/klines/');
    const data = await response.json();

    const klineData = data.map(d => ({
      time: d.time, open: d.open, high: d.high, low: d.low, close: d.close,
    }));

    const volumeData = data.map(d => ({
      time: d.time, value: d.volume,
      color: d.open < d.close ? 'rgba(7, 201, 91, 0.5)' : 'rgba(238, 11, 48, 0.5)',
    }));

    candleSeries.value.setData(klineData);
    volumeSeries.value.setData(volumeData);
  } catch (error) {
    console.error("Error fetching initial data:", error);
  }
};

import { debounce } from 'lodash';

const handleWebSocketData = debounce((data) => {
  try {
    const klines = data.klines;
    if (!klines || !candleSeries.value || !volumeSeries.value) return;

    const klineData = {
      time: klines.time,
      open: parseFloat(klines.open),
      high: parseFloat(klines.high),
      low: parseFloat(klines.low),
      close: parseFloat(klines.close),
    };

    const volume = parseFloat(klines.volume) || 0;
    const volumeData = {
      time: klines.time,
      value: volume,
      color: klineData.open < klineData.close ? '#07C95B' : '#EE0B30',
    };

    requestAnimationFrame(() => {
      candleSeries.value.update(klineData);
      volumeSeries.value.update(volumeData);
    });
  } catch (err) {
    console.error('❌ Error processing WebSocket data:', err);
  }
}, 300); // อัปเดตทุก 300ms


// 🟢 WebSocket Connection
const connectWebSocket = () => {
  if (socket) socket.close(); // Close existing connection

  socket = new WebSocket('ws://127.0.0.1:9000/ws/klines/');

  socket.onopen = () => {
    console.log('✅ WebSocket connected');
    reconnectAttempts.value = 0; // Reset reconnect attempts
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      handleWebSocketData(data);
    } catch (err) {
      console.error('Error parsing WebSocket message:', err);
    }
  };

  socket.onerror = (error) => console.error('WebSocket error:', error);

  socket.onclose = () => {
    console.log('🔄 WebSocket disconnected');
    if (reconnectAttempts.value < maxReconnectAttempts) {
      reconnectAttempts.value++;
      setTimeout(connectWebSocket, 5000);
    }
  };
};

// 🟢 Initialize Component
onMounted(async () => {
  await initChart();
  fetchInitialData();
  connectWebSocket();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  background-color: #1f1f1f;
}
.chart {
  cursor: crosshair;
}
</style>
