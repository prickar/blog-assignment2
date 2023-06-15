
import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";

import { addPost, postCacheKey } from "@/api-routes/posts";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";



export default function CreatePost() {
  const user = useUser();
  console.log(user)
  const router = useRouter();
  const { trigger: addPostTrigger } = useSWRMutation( postCacheKey, addPost );


  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);

    const newPost = {
      body: editorContent,
      title: titleInput,
      slug,
      user_id: user.id,
      image,
    }

   const { error } = await addPostTrigger (newPost);

    if(!error) {
      router.push(`/blog/${slug}`);
    }
    console.log({ editorContent, titleInput, image, slug });
  };



  return (
    
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
