import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FavoritesList } from "@/components/favorites/FavoritesList";
import { styles } from "@/styles/index.styles";

export const metadata: Metadata = {
  title: "Избранные товары — StroyMarket",
  description: "Список избранных товаров: сохраняйте понравившиеся позиции и добавляйте их в корзину.",
};

export default function FavoritesPage() {
  return (
    // Общий контейнер проекта (styles/index.styles.ts) — тот же, что у навбара и футера.
    <div className={`${styles.container} py-8`}>
      <Breadcrumbs items={[{ label: "StroyMarket", href: "/" }, { label: "Избранные товары" }]} />

      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">Избранные товары</h1>

      {/*
        Сам список — клиентский компонент: избранное живёт в ShopContext, а товары
        подтягиваются хуком useFavoriteProducts (React Query → lib/api/products.ts).
      */}
      <FavoritesList />
    </div>
  );
}
