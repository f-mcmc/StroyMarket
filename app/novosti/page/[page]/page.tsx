import { BlogArchive } from "@/components/blog/BlogArchive";

export const metadata = {
  title: "Новости - StroyMarket",
};

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function NovostiCategoryPaginatedPage({ params }: PageProps) {
  const { page } = await params;
  return <BlogArchive category="novosti" page={Number(page) || 1} basePath="/novosti" />;
}
