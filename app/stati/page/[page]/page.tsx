import { BlogArchive } from "@/components/blog/BlogArchive";

export const metadata = {
  title: "Статьи - StroyMarket",
};

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function StatiCategoryPaginatedPage({ params }: PageProps) {
  const { page } = await params;
  return <BlogArchive category="stati" page={Number(page) || 1} basePath="/stati" />;
}
