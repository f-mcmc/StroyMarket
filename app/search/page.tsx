import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SearchResults } from "@/components/search/SearchResults";
import { styles } from "@/styles/index.styles";

export const metadata: Metadata = {
  title: "Поиск товаров — StroyMarket",
  description: "Поиск по каталогу «StroyMarket»: инструмент, стройматериалы, сантехника, электрика и садовая техника.",
};

interface SearchPageProps {
  /** `q` — поисковый запрос. Лежит в URL, поэтому ссылкой можно поделиться. */
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  return (
    // Общий контейнер проекта (styles/index.styles.ts) — тот же, что у навбара и футера.
    <div className={`${styles.container} py-8`}>
      <Breadcrumbs
        items={[
          { label: "StroyMarket", href: "/" },
          { label: query ? `Поиск: «${query}»` : "Поиск" },
        ]}
      />

      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {query ? <>Результаты поиска: «{query}»</> : "Поиск товаров"}
        </h1>
      </div>

      {/*
        Сами результаты — клиентский компонент: он берёт данные через
        useProductSearch (React Query → lib/api/products.ts → backend) и показывает
        loading / error / empty состояния. Запрос приходит из URL, поэтому страница
        открывается по прямой ссылке и переживает перезагрузку.
      */}
      <SearchResults query={query} />
    </div>
  );
}
