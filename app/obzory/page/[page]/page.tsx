import { BlogArchive } from "@/components/blog/BlogArchive";

export const metadata = {
  title: "Обзоры - StroyMarket",
};

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function ObzoryCategoryPaginatedPage({ params }: PageProps) {
  const { page } = await params;
  return <BlogArchive category="obzory" page={Number(page) || 1} basePath="/obzory" />;
}
