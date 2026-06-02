"use client";

import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
interface SnippetEditFormProps {
  snippet: Snippet;
}
import { useState } from "react";
import { editSnippet } from "@/actions";

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="typescript"
        defaultValue={snippet.code}
        onChange={handleEditorChange}
        options={{ minimap: { enabled: false } }}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="border p-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
