import { notFound } from "next/navigation";
import { styles } from "@/styles/index.styles";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Pagination } from "@/components/blog/Pagination";
import { ReviewItem } from "@/components/reviews/ReviewItem";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewsSidebar } from "@/components/reviews/ReviewsSidebar";
import { ReviewsSortTabs } from "@/components/reviews/ReviewsSortTabs";
import { UserReviews } from "@/components/reviews/UserReviews";
import { getReviewsPage, REVIEWS_PAGE_SIZE, ReviewSort, reviews } from "@/data/reviews-data";

interface ReviewsArchiveProps {
  page: number;
  sort: ReviewSort;
  basePath: string;
}

export function ReviewsArchive({ page, sort, basePath }: ReviewsArchiveProps) {
  const totalPages = Math.max(1, Math.ceil(reviews.length / REVIEWS_PAGE_SIZE));

  if (page < 1 || page > totalPages) notFound();

  const pageReviews = getReviewsPage(page, sort);

  return (
    <div className={`${styles.container} py-8`}>
      <Breadcrumbs items={[{ label: "StroyMarket", href: "/" }, { label: "Отзывы" }]} />

      <h1 className="mb-6 text-3xl font-bold text-neutral-900 sm:text-4xl">Отзывы</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <ReviewsSortTabs active={sort} basePath="/reviews" />

          <div className="space-y-4">
            {page === 1 && <UserReviews />}

            {pageReviews.length > 0 ? (
              pageReviews.map((review) => <ReviewItem key={review.id} review={review} />)
            ) : (
              <p className="text-neutral-500">Отзывов пока нет — станьте первым.</p>
            )}
          </div>

          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath={basePath}
              query={sort === "old" ? "sort=old" : undefined}
            />
          </div>

          <ReviewForm />
        </div>

        <ReviewsSidebar />
      </div>
    </div>
  );
}
