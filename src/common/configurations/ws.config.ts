// common/configurations/ws.config.ts
export const BaseWebsocket = (url: string) => {
  let socket: WebSocket | null = null;
  let reconnectAttempts = 0;
  let maxReconnectAttempts = 10;

  const listeners: ((data: any) => void)[] = [];

  const connect = async () => {
    const baseUrl = await import.meta.env.VITE_WS_BASE_URL;
    socket = new WebSocket(baseUrl + url);

    socket.onopen = () => {
      console.log(`✅ WebSocket connected: ${url}`);
      reconnectAttempts = 0;
    };

    socket.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        listeners.forEach((cb) => cb(data));
      } catch (err) {
        console.error("❌ WS parse error:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("🔄 WebSocket disconnected");
      if (reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        setTimeout(connect, 3000);
      }
    };
  };

  const onMessage = (callback: (data: any) => void) => {
    listeners.push(callback);
  };

  const send = (data: any) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
    }
  };

  const close = () => {
    socket?.close();
  };

  return { connect, onMessage, send, close };
};


