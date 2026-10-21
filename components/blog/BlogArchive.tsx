import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CategorySidebar } from "@/components/blog/CategorySidebar";
import { CategorySelectMobile } from "@/components/blog/CategorySelectMobile";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { blogCategories, BLOG_PAGE_SIZE, getPostsByCategory } from "@/data/blog-data";
import { BlogCategorySlug } from "@/types/blog";

interface BlogArchiveProps {
  /** undefined = all categories ("Все публикации") */
  category?: BlogCategorySlug;
  page: number;
  basePath: string;
}

export function BlogArchive({ category, page, basePath }: BlogArchiveProps) {
  const posts = getPostsByCategory(category);
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE));

  if (page < 1 || page > totalPages) notFound();

  const pagePosts = posts.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);
  const categoryLabel = category ? blogCategories.find((c) => c.slug === category)?.label : undefined;

  return (
    <div className="mx-auto max-w-[1680px] px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "StroyMarket", href: "/" },
          category
            ? { label: "Блог", href: "/blog" }
            : { label: "Блог" },
          ...(category ? [{ label: categoryLabel ?? "" }] : []),
        ]}
      />

      <h1 className="mb-6 text-3xl font-bold text-neutral-900 sm:text-4xl">
        {categoryLabel ?? "Блог"}
      </h1>

      <CategorySelectMobile activeSlug={category} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {pagePosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {pagePosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">В этой рубрике пока нет публикаций.</p>
          )}

          <div className="mt-10">
            <Pagination currentPage={page} totalPages={totalPages} basePath={basePath} />
          </div>
        </div>

        <aside className="space-y-6">
          <CategorySidebar activeSlug={category} />
          <NewsletterForm />
        </aside>
      </div>
    </div>
  );
}
