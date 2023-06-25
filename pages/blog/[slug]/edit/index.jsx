import { useRouter } from "next/router";
import BlogEditor from "../../../../components/blog-editor";
import useSWRMutation from "swr/mutation"; 
import useSWR  from "swr"
import { createSlug } from "../../../../utils/createSlug"

import { postCacheKey, editPost, getPost } from "@/api-routes/posts";
import { sortAndDeduplicateDiagnostics } from "typescript";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export default function EditBlogPost() {
  const router = useRouter();

  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;

  const { data : { data: post = {}} = {},
   error,
  isLoading } = useSWR(
    slug ? 
    `${postCacheKey}${slug}` 
    : null, () =>
  getPost({slug}) 
  );

  const { trigger: editPostTrigger } = useSWRMutation(
    `${postCacheKey}${slug}`, 
    editPost, {
      onError: (error) => {
        console.log(error)
      }
  });
 

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput)

    const updatedPost = {
      id: post.id,
      body: editorContent,
      title: titleInput,
      slug: slug,
      image,

    }
    const { status, error, data } = await editPostTrigger(updatedPost);
    if(!error) {
      router.push(`/blog/${slug}`)
    }
  }

  if (isLoading) {
    return null; 
  }

  return (
    <BlogEditor
      heading="Edit blog post"
      title={post?.title}
      src={post?.image}
      alt={post?.title}
      content={post?.body}
      buttonText="Save changes"
      onSubmit={handleOnSubmit}
    />
  );
}

export const getServerSideProps = async (ctx) => {

  const supabase = createPagesServerClient(ctx);

  const { slug } = ctx.params;




  const {

    data: { session },

  } = await supabase.auth.getSession();




  const { data } = await supabase

    .from("posts")

    .select("user_id")

    .single()

    .eq("slug", slug);




  const isAuthor = data.user_id === session.user.id;




  if (!isAuthor) {

    return {

      redirect: {

        destination: `/blog/${slug}`,

        permanent: true,

      },

    };

  }

  return {

    props: {},

  };

};

// export const getServerSideProps = async ( ctx ) => {
//   const supabase = createPagesServerClient(ctx)
//   const { slug } = ctx.params; 

//   const { data: { session }, } = await supabase.auth.getSession()

//   const { data } = await supabase
//   .from("posts")
//   .select("user_id")
//   .single()
//   .eq("slug", slug)

//   console.log(data)

//   const isAuthor = data.user_id === session.user.id
//   console.log(isAuthor)

//   if(!isAuthor){
//     return {
//       redirect: {
//         destination: `/blog/${slug}`,
//         permanent: true, 
//       }
//     }
//   }
//   return {
//     props: {},
//   };
// };