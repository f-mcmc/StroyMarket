import { API_BASE_URL } from "./config";
import { ApiError } from "./errors";
import { clearAuthTokens, getAccessToken } from "./token";

export interface ApiRequestOptions extends Omit<RequestInit, "body" | "headers"> {
  /** Тело запроса — сериализуется в JSON автоматически. */
  body?: unknown;
  /** Прикреплять ли `Authorization: Bearer <token>`, если токен есть. По умолчанию true. */
  auth?: boolean;
  headers?: Record<string, string>;
}

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (typeof window === "undefined") return `${API_BASE_URL}${normalized}`;
  // В браузере запрос идёт через прокси на своём домене. Next.js убирает слэш в конце
  // адреса редиректом, поэтому отправляем без него — прокси добавит его сам.
  const [pathname = "", query] = normalized.split("?", 2);
  const trimmed = pathname.replace(/\/+$/, "");
  return `${API_BASE_URL}${trimmed}${query !== undefined ? `?${query}` : ""}`;
}

function extractErrorMessage(data: unknown, status: number): string {
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    if (typeof record.error === "string") return record.error;
    if (typeof record.message === "string") return record.message;
    if (typeof record.detail === "string") return record.detail;
    // DRF validation errors: { field: ["сообщение"] }
    const firstArray = Object.values(record).find(
      (value): value is string[] => Array.isArray(value) && typeof value[0] === "string"
    );
    if (firstArray) return firstArray[0];
  }
  // Не-JSON ответ (например, HTML-страница 404 от nginx/Django) не показываем
  // пользователю как есть — иначе в интерфейс попадает разметка страницы ошибки.
  const text = typeof data === "string" ? data.trim() : "";
  if (text && !text.startsWith("<")) return text;
  return status === 404
    ? `Запрос не выполнен: адрес недоступен на сервере (404)`
    : `Запрос не выполнен (${status})`;
}

/**
 * Универсальный клиент для реального backend API. Кидает ApiError на любой не-2xx
 * ответ и на сетевые сбои, чтобы вызывающий код мог показать пользователю понятную
 * ошибку вместо падения страницы (см. STEP 8 в задаче миграции — обработка ошибок).
 */
export async function apiFetch<T = unknown>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, auth = true, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = { Accept: "application/json", ...headers };
  let payload: string | undefined;
  if (body !== undefined) {
    finalHeaders["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }
  const token = auth ? getAccessToken() : null;
  if (token) finalHeaders.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(buildUrl(path), { ...rest, headers: finalHeaders, body: payload });
  } catch (cause) {
    throw new ApiError("Не удалось подключиться к серверу. Проверьте интернет-соединение.", 0, cause);
  }

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  let data: unknown = null;
  if (response.status !== 204) {
    data = isJson ? await response.json().catch(() => null) : await response.text().catch(() => null);
  }

  // SimpleJWT отвечает 401 на просроченный/битый токен даже для публичных
  // эндпоинтов, а refresh-эндпоинта у бэкенда нет — сбрасываем токен, чтобы
  // пользователь заново вошёл, а не получал 401 на каждом запросе.
  if (response.status === 401 && token) {
    clearAuthTokens();
  }

  if (!response.ok) {
    throw new ApiError(extractErrorMessage(data, response.status), response.status, data);
  }

  return data as T;
}

export const api = {
  get: <T = unknown>(path: string, options?: Omit<ApiRequestOptions, "body" | "method">) =>
    apiFetch<T>(path, { ...options, method: "GET" }),
  post: <T = unknown>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "body" | "method">) =>
    apiFetch<T>(path, { ...options, method: "POST", body }),
  patch: <T = unknown>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "body" | "method">) =>
    apiFetch<T>(path, { ...options, method: "PATCH", body }),
  delete: <T = void>(path: string, options?: Omit<ApiRequestOptions, "body" | "method">) =>
    apiFetch<T>(path, { ...options, method: "DELETE" }),
};
