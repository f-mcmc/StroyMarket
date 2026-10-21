"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { useShop } from "@/context/ShopContext";
import { useFavoriteProducts } from "@/hooks/useFavoriteProducts";

/** Скелет карточки на время загрузки — повторяет пропорции ProductCard. */
function CardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="aspect-square w-full animate-pulse bg-gray-100" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="mt-2 h-6 w-1/2 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

/**
 * Пустое избранное. Текст, картинка и кнопка повторяют оригинал
 * (https://www.stroiopttorg.ru/izbrannoe/, блок `.favourite-empty__inner`),
 * но свёрстаны в стиле проекта — как и остальная эта страница.
 */
function EmptyState() {
  return (
    <div className="mx-auto mt-14 flex max-w-lg flex-col items-center gap-5 text-center sm:mt-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/demo/favourite-empty.svg"
        alt=""
        aria-hidden="true"
        className="mx-auto block w-24"
      />
      <p className="text-xl font-medium text-neutral-800">Ваш список желаний пуст</p>
      <p className="text-[15px] leading-relaxed text-neutral-600">
        У вас пока нет товаров в списке желаний.
        <br />
        На странице <b className="font-bold">«Каталог»</b> вы найдете много интересных товаров.
      </p>
      <Link
        href="/catalog"
        className="mt-1 inline-flex h-[52px] items-center justify-center rounded-lg bg-blue-600 px-8 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-blue-700"
      >
        Перейти в каталог
      </Link>
    </div>
  );
}

/**
 * Список избранного.
 *
 * Состояние берётся из существующего ShopContext (favoriteIds), товары — из хука
 * useFavoriteProducts (React Query → API layer). Карточки — тот же ProductCard,
 * что в каталоге и поиске, поэтому «Купить», «в избранное» и «сравнить» работают
 * одинаково везде, а снятие сердечка тут же убирает товар из этого списка.
 */
export function FavoritesList() {
  const { favoriteIds, favoritesCount } = useShop();
  const { products, isLoading, isError, errorMessage, refetch } = useFavoriteProducts(favoriteIds);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: Math.min(favoritesCount, 8) }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/60 px-6 py-16 text-center">
        <AlertCircle className="h-10 w-10 text-red-400" aria-hidden="true" />
        <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
        <button
          type="button"
          onClick={refetch}
          className="mt-6 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          Повторить
        </button>
      </div>
    );
  }

  if (products.length === 0) return <EmptyState />;

  return (
    <>
      <p className="mb-6 text-sm text-neutral-500">
        Товаров в избранном: <span className="font-semibold text-neutral-900">{products.length}</span>
      </p>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
