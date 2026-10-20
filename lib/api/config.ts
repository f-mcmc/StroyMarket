/**
 * Адрес backend API (Django REST).
 *
 * Сервер работает по обычному HTTP, а сайт на Vercel — по HTTPS: браузер блокирует
 * такие запросы (mixed content). Поэтому:
 *  - на сервере (SSR, route handlers) ходим на backend напрямую — BACKEND_URL;
 *  - в браузере ходим на свой же домен, в прокси `app/backend-api/[...path]`,
 *    который пересылает запрос на backend.
 *
 * DRF-роутер живёт под "/api/" (корень http://16.170.163.62/api/ отдаёт список
 * эндпоинтов, а голый хост — 404), поэтому префикс "/api" входит в адрес.
 */
export const BACKEND_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://16.170.163.62/api"
).replace(/\/+$/, "");

/** Прокси на своём домене — для запросов из браузера. */
export const BROWSER_API_BASE = "/backend-api";

export const API_BASE_URL = typeof window === "undefined" ? BACKEND_URL : BROWSER_API_BASE;
