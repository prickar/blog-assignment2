import { supabase } from "@/lib/supabaseClient.js";

const BASE_URL = "NEXT_PUBLIC_SUPABASE_URL";
const API_KEY_QUERY = "NEXT_PUBLIC_SUPABASE_ANON_KEY";

export const postCacheKey = "/api/blogs";


export const getPosts = async () => {
  const { data, error, status } = await supabase
  .from("posts")
  .select()

  return { error, status, data  }
  console.log({data})
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

export const addPost = async (_, { arg: {title, slug, body } }) => {
  const { data, error, status } = await supabase
  .from('posts')
  .insert({ title, slug, body })
  .select()
  .single()

  console.log( data )

  return { error, status, data };
  // Handle add post here
};

export const removePost = async (_, { arg: id }) => {
  const { data, error, status  } = await supabase
  .from('posts')
  .delete()
  .select()
  .eq( 'id', id )

  console.log(data)

  return { error, status, data }
  //Handle remove post here
};

export const editPost = () => {
  //Handle edit post here
};
