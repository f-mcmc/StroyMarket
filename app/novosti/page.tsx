import { BlogArchive } from "@/components/blog/BlogArchive";

export const metadata = {
  title: "Новости - StroyMarket",
};

export default function NovostiCategoryPage() {
  return <BlogArchive category="novosti" page={1} basePath="/novosti" />;
}
