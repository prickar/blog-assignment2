import { supabase } from "@/lib/supabaseClient.js";

const BASE_URL = "NEXT_PUBLIC_SUPABASE_URL";
const API_KEY_QUERY = "NEXT_PUBLIC_SUPABASE_ANON_KEY";

export const postCacheKey = "/api/blogs";


export const getPosts = async () => {
  const { data, error, status } = await supabase
  .from("posts")
  .select()

  return { error, status, data  }
  //Handle get all posts
};

export const getPost = async ({ slug }) => {
  const { data, error, status } = await supabase
  .from("posts")
  .select('*')
  .single()
  .eq("slug", slug );

  return { error, status, data }; 
}

export const addPost = async (_, { arg: {title, slug, body, user_id } }) => {
  const { data, error, status } = await supabase
  .from('posts')
  .insert({ title, slug, body,user_id })
  .select()
  .single()

  console.log( data )

  return { error, status, data };
  // Handle add post here
};

export const removePost = async (_, { arg: id  }) => {
  const { data, error, status  } = await supabase
  .from('posts')
  .delete()
  .select()
  .eq( 'id', id )

  console.log(data, error, status )

  return { error, status, data }
  //Handle remove post here
};

export const editPost = async (_, { arg: updatedPost }) => {
  const { data, error, status }  = await supabase
  .from('posts')
  .update(updatedPost)
  .eq('id', updatedPost.id)
  .select()
  .single(); 

  return { data, error, status }; 
}

// export const editPost = async (_, { arg: {title, slug, body, id }}) => {
//   const { data, error, status } = await supabase
//   .from('posts')
//   .update({ title, slug, body })
//   .single()
//   .eq('id', id)

//   console.log(data, error, status )


//   return { error, data, status }
// };
