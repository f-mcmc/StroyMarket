import { ReviewsArchive } from "@/components/reviews/ReviewsArchive";
import { parseSort } from "@/data/reviews-data";

export const metadata = {
  title: "Отзывы - StroyMarket",
  description: "Отзывы покупателей интернет-магазина товаров для строительства и ремонта",
};

export default async function ReviewsPage({ searchParams }: PageProps<"/reviews">) {
  const { sort } = await searchParams;
  return <ReviewsArchive page={1} sort={parseSort(sort)} basePath="/reviews" />;
}
