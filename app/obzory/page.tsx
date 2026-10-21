import { BlogArchive } from "@/components/blog/BlogArchive";

export const metadata = {
  title: "Обзоры - StroyMarket",
};

export default function ObzoryCategoryPage() {
  return <BlogArchive category="obzory" page={1} basePath="/obzory" />;
}
