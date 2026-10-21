import { BlogArchive } from "@/components/blog/BlogArchive";

export const metadata = {
  title: "Советы - StroyMarket",
};

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function SovetyCategoryPaginatedPage({ params }: PageProps) {
  const { page } = await params;
  return <BlogArchive category="sovety" page={Number(page) || 1} basePath="/sovety" />;
}
