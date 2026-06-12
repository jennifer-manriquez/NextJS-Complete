"use client";

import * as actions from "@/actions";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useActionState, startTransition } from "react";
import FormButton from "@/components/common/form-button";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    },
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create a Post</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg">Create a post</h3>
              <Input
                name="title"
                label="Title"
                labelPlacement="outside"
                placeholder="Title"
                isInvalid={!!formState.errors.title}
                errorMessage={formState.errors.title?.join(", ")}
              />
              <Textarea
                name="content"
                label="Content"
                labelPlacement="outside"
                placeholder="Content"
                isInvalid={!!formState.errors.content}
                errorMessage={formState.errors.content?.join(", ")}
              />

              {formState.errors._form ? (
                <div className="rounded bg-red-200 p-2 border border-red-400">
                  {formState.errors._form?.join(", ")}
                </div>
              ) : null}

              <FormButton>Create Post</FormButton>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
