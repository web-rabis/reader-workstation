
import axios from "axios";
import { toast } from "sonner";

// В будущем это будет взято из переменных окружения
const API_URL = import.meta.env.VITE_API_URL || "/api";
const SSO_URL = import.meta.env.VITE_SSO_API_URL || "/sso/api";
const BASENAME = import.meta.env.VITE_APP_BASENAME || "/";

const tokenInterceptor = (config) => {
  const token = localStorage.getItem("librarian-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const rejectInterceptor = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("librarian-token");
    window.location.href = `${BASENAME}login`;
    toast.error("Сессия истекла. Пожалуйста, войдите снова.");
  }
  return Promise.reject(error);
};

const fulfilledInterceptor = (response) => response;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавляем JWT токен к запросам
apiClient.interceptors.request.use(tokenInterceptor);

// Обрабатываем ошибки
apiClient.interceptors.response.use(fulfilledInterceptor, rejectInterceptor);

const ssoClient = axios.create({
  baseURL: SSO_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавляем JWT токен к запросам
ssoClient.interceptors.request.use(tokenInterceptor);

// Обрабатываем ошибки
ssoClient.interceptors.response.use(fulfilledInterceptor, rejectInterceptor);

export { ssoClient };
export default apiClient;
