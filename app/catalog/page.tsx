import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import CategoryCard from "@/components/catalog/CategoryCard";
import { buildCategoryTree } from "@/lib/api/categoryTree";
import { listCategories } from "@/lib/api/categories";
import { ApiError } from "@/lib/api/errors";
import styles from "./catalog.module.css";

export const metadata: Metadata = {
  title: "Каталог товаров — интернет-магазин «StroyMarket»",
  description: "Каталог строительных материалов, инструмента и товаров для дома, сада и огорода.",
};

export default async function CatalogPage() {
  let topLevel: ReturnType<typeof buildCategoryTree> = [];
  let errorMessage: string | null = null;

  try {
    const categories = await listCategories();
    topLevel = buildCategoryTree(categories);
  } catch (error) {
    errorMessage = error instanceof ApiError ? error.message : "Не удалось загрузить каталог. Попробуйте позже.";
  }

  return (
    <div className={styles.fluidRoot}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: "Каталог" }]} />

        <h1 className={styles.pageTitle}>Каталог</h1>

        {errorMessage ? (
          <p className="mt-10 text-sm text-red-600">{errorMessage}</p>
        ) : topLevel.length === 0 ? (
          <p className="mt-10 text-sm text-neutral-500">В каталоге пока нет категорий.</p>
        ) : (
          <div className={styles.grid}>
            {topLevel.map((category) => (
              <CategoryCard key={category.slug} node={category} basePath="/catalog" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
