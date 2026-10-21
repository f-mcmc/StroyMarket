import { BlogArchive } from "@/components/blog/BlogArchive";

export const metadata = {
  title: "Блог - StroyMarket",
  description: "Блог - Интернет-магазин товаров для строительства и ремонта",
};

export default function BlogPage() {
  return <BlogArchive page={1} basePath="/blog" />;
}
