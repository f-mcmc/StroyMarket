import { ReviewsArchive } from "@/components/reviews/ReviewsArchive";
import { parseSort } from "@/data/reviews-data";

export const metadata = {
  title: "Отзывы - StroyMarket",
  description: "Отзывы покупателей интернет-магазина товаров для строительства и ремонта",
};

export default async function ReviewsPaginatedPage({
  params,
  searchParams,
}: PageProps<"/reviews/page/[page]">) {
  const [{ page }, { sort }] = await Promise.all([params, searchParams]);
  return <ReviewsArchive page={Number(page) || 1} sort={parseSort(sort)} basePath="/reviews" />;
}
