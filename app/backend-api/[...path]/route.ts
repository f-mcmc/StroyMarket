import { type NextRequest } from "next/server";
import { BACKEND_URL } from "@/lib/api/config";

/**
 * Прокси к backend API для запросов из браузера (backend работает по HTTP,
 * сайт — по HTTPS). Пересылает метод, тело, query и нужные заголовки.
 * Все эндпоинты DRF заканчиваются на "/", поэтому слэш в конце добавляется всегда.
 */
const FORWARD_REQUEST_HEADERS = ["accept", "authorization", "content-type", "accept-language"];
const FORWARD_RESPONSE_HEADERS = ["content-type", "cache-control"];

async function proxy(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }): Promise<Response> {
  const { path } = await ctx.params;
  if (path.some((segment) => segment === ".." || segment.includes("\\"))) {
    return Response.json({ detail: "Bad path" }, { status: 400 });
  }
  const target = `${BACKEND_URL}/${path.map(encodeURIComponent).join("/")}/${req.nextUrl.search}`;

  const headers = new Headers();
  for (const name of FORWARD_REQUEST_HEADERS) {
    const value = req.headers.get(name);
    if (value) headers.set(name, value);
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: req.method,
      headers,
      body: hasBody ? await req.arrayBuffer() : undefined,
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    return Response.json({ detail: "Сервер временно недоступен" }, { status: 502 });
  }

  const responseHeaders = new Headers();
  for (const name of FORWARD_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  return new Response(upstream.status === 204 ? null : upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
