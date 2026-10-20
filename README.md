# StroyMarket — qurilish mollari internet-do'koni

Qurilish mollari uchun to'liq internet-do'kon: katalog daraxti, mahsulot sahifalari, qidiruv, savat, rasmiylashtirish, ro'yxatdan o'tish va shaxsiy kabinet, blog bo'limlari. Ma'lumotlar haqiqiy backend'dan (Django REST API) olinadi.

Next.js 16 (App Router) · TypeScript · TanStack Query · Tailwind CSS · shadcn/ui

**Demo:** https://stroymarket.vercel.app

## Imkoniyatlar

- **Katalog:** ko'p darajali kategoriyalar, mega-menyu va mobil menyu, kategoriya bo'yicha filtr, brendlar
- **Mahsulot:** galereya, tavsif, xususiyatlar, o'xshash mahsulotlar
- **Qidiruv:** nom, artikul, brend va kategoriya bo'yicha
- **Savat va buyurtma:** savat, rasmiylashtirish, buyurtma tasdig'i
- **Akkaunt:** ro'yxatdan o'tish, kirish (JWT), profil, parolni o'zgartirish
- **Kontent:** yangiliklar, maqolalar, maslahatlar, sharhlar, savol-javob, to'lov va yetkazib berish sahifalari
- Yuklanish va xato holatlari, SEO uchun server-side rendering

## Backend

API — Django REST Framework (`/api/categories/`, `/api/products/`, `/api/brands/`, `/api/orders/`, `/api/carts/`, auth va boshqalar).

Backend HTTP'da, sayt esa HTTPS'da ishlaydi, shuning uchun brauzerdan keladigan so'rovlar `app/backend-api/[...path]` proksi orqali o'tadi; serverdagi render esa API'ga to'g'ridan-to'g'ri murojaat qiladi (`lib/api/config.ts`).

Katalogni backend'ga yuklash skripti: `node scripts/seed-backend.ts`.

## Ishga tushirish

```bash
npm install
npm run dev
```

`.env.example` — backend manzili (`API_URL`). Bo'sh qolsa, test server ishlatiladi.

## Jamoa

Loyiha Fintech Hub kursida jamoa bilan yaratilgan (asl repozitoriy: `fintech-frontend/mini-19`):

- **Murodulloh** — backend API integratsiyasi (`lib/api`), katalog va mega-menyu, blog bo'limlari, akkaunt va avtorizatsiya, yetkazib berish sahifasi
- **Sayyidulloh** — bosh sahifa, mahsulotlar, aksiyalar, sharhlar
- **Izzat Abdurasulov** — loyiha asosi
- **UMID** — navbar, footer, savat

Muallif (ushbu nusxa): Murodulloh — Telegram [@kadirjanovvm](https://t.me/kadirjanovvm)
