import { BlogPostDetail } from "@/components/blog/BlogPostDetail";
import { findPost } from "@/data/blog-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = findPost("sovety", slug);
  return { title: post ? `${post.title} - StroyMarket` : "StroyMarket" };
}

export default async function SovetyPostPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogPostDetail category="sovety" slug={slug} />;
}
