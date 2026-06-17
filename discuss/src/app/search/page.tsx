import { redirect } from "next/navigation";
import PostList from "@/components/posts/post-list";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";

interface SearchPageProps {
  searchParams: Promise<{
    term: string;
  }>;
}

export default async function SearchPAge({ searchParams }: SearchPageProps) {
  const { term } = await searchParams;

  if (!term) {
    redirect("/");
  }
  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  );
}
