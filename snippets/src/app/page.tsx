import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();
  const renderedSnippets = snippets.map((snippet) => (
    <Link
      href={`/snippets/${snippet.id}`}
      className="flex justify-between items-center p-2 border and rounded"
      key={snippet.id}
    >
      <h3>{snippet.title}</h3>
      <div>View</div>
    </Link>
  ));

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">My Snippets</h1>
        <Link href="/snippets/new" className="border rounded p-2">
          Create New Snippet
        </Link>
      </div>
      <div className="flex gap-2 flex-col">{renderedSnippets}</div>
    </div>
  );
}
