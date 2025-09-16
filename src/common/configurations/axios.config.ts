import router from "@/router";
import axios from "axios";
import { message } from 'ant-design-vue';

export const clientApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

clientApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


// clientApi.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status; // 👈 กัน undefined

//     if (status === 401 || status === 403) {
//       localStorage.removeItem("token");
//       router.push({ name: "authorized" });
//     }

//     // ถ้าเป็น network error / ไม่เจอเซิร์ฟเวอร์
//     if (!error.response) {
//       console.error("Network/Server error:", error.message);
//     }

//     return Promise.reject(error);
//   }
// );
