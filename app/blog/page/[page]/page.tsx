import { BlogArchive } from "@/components/blog/BlogArchive";

export const metadata = {
  title: "Н - StroyMarket",
};

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { page } = await params;
  return <BlogArchive page={Number(page) || 1} basePath="/blog" />;
}
