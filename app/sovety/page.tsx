import { BlogArchive } from "@/components/blog/BlogArchive";

export const metadata = {
  title: "Советы - StroyMarket",
};

export default function SovetyCategoryPage() {
  return <BlogArchive category="sovety" page={1} basePath="/sovety" />;
}
