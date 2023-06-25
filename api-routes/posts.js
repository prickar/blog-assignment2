import { supabase } from "@/lib/supabaseClient.js";
import { uploadImage } from "../utils/uploadImage";

const BASE_URL = "NEXT_PUBLIC_SUPABASE_URL";
const API_KEY_QUERY = "NEXT_PUBLIC_SUPABASE_ANON_KEY";

export const postCacheKey = "/api/blogs";


export const getPosts = async (_, { arg: searchText }) => {
//   if(!searchText.length) {
//   const { data, error, status } = await supabase
//   .from("posts")
//   .select()

//   return { error, status, data  }
//   //Handle get all posts
// };

const { data, error, status } = await supabase
.from('posts')
.select()
.ilike('title', `%${searchText}%`);

console.log({searchText})
console.log(error)
console.log(data)

return { data, error, status }
};

export const getPost = async ({ slug }) => {
  const { data, error, status } = await supabase
  .from("posts")
  .select('*')
  .single()
  .eq("slug", slug );

  return { error, status, data }; 
}

export const addPost = async (_, { arg: newPost }) => {
  let image = ""

  if (newPost?.image) {
    const { publicUrl, error } = await uploadImage(newPost?.image)

    if(!error) {
      image = publicUrl;
    }
  }

  console.log(image);
  const { data, error, status } = await supabase
  .from('posts')
  .insert({ ...newPost, image })
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
  let image = updatedPost?.image ?? "";

  const isNewImage = typeof image === "object" && image !== null; 

  if(isNewImage) {
    const { publicUrl, error } = await uploadImage(updatedPost?.image)

    if(!error) {
      image = publicUrl;
    }
  }

  const { data, error, status }  = await supabase
  .from('posts')
  .update({...updatedPost, image})
  .eq('id', updatedPost.id)
  .select()
  .single(); 

  return { data, error, status }; 
}
