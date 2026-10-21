import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CategorySidebar } from "@/components/blog/CategorySidebar";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { blogCategories, findPost, getRelatedPosts } from "@/data/blog-data";
import { BlogCategorySlug } from "@/types/blog";

function renderParagraph(paragraph: string, key: number) {
  const isBold = paragraph.startsWith("**") && paragraph.endsWith("**");
  const text = isBold ? paragraph.slice(2, -2) : paragraph;
  const lines = text.split("\n");

  const body = lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));

  return (
    <p key={key} className={isBold ? "font-semibold text-neutral-900" : "text-neutral-700"}>
      {body}
    </p>
  );
}

interface BlogPostDetailProps {
  category: BlogCategorySlug;
  slug: string;
}

export function BlogPostDetail({ category, slug }: BlogPostDetailProps) {
  const post = findPost(category, slug);
  if (!post) notFound();

  const categoryLabel = blogCategories.find((c) => c.slug === category)?.label ?? category;
  const related = getRelatedPosts(post, 4);

  return (
    <div className="mx-auto max-w-[1680px] px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "StroyMarket", href: "/" },
          { label: "Блог", href: "/blog" },
          { label: categoryLabel, href: `/${category}` },
          { label: post.title },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <article>
          <p className="mb-2 text-sm font-medium text-blue-600">{categoryLabel}</p>
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 sm:text-4xl">{post.title}</h1>
          <time className="mb-6 block text-sm text-neutral-400">{post.date}</time>

          <div className="relative mb-8 aspect-[1200/524] w-full overflow-hidden rounded-2xl bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </div>

          <div className="space-y-4 text-base leading-relaxed">
            {post.content.map((paragraph, i) => renderParagraph(paragraph, i))}
          </div>

          <RelatedPosts posts={related} />
        </article>

        <aside className="space-y-6">
          <CategorySidebar activeSlug={category} />
          <NewsletterForm />
        </aside>
      </div>
    </div>
  );
}
