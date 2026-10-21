import { BlogPostDetail } from "@/components/blog/BlogPostDetail";
import { findPost } from "@/data/blog-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = findPost("stati", slug);
  return { title: post ? `${post.title} - StroyMarket` : "StroyMarket" };
}

export default async function StatiPostPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogPostDetail category="stati" slug={slug} />;
}
