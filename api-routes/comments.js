import { supabase } from "@/lib/supabaseClient.js";

export const commentCacheKey = "/api/blogs";


export const getComments = async ({ postId }) => {
  console.log(postId)
  const { data, error, status } = await supabase
  .from('comments')
  .select()
  .eq('post_id', postId)
  return { data, error, status }

  //Handle get all comment
};

export const addComment = async (_,{arg: newComment }) => {
  const { data, error, status } = await supabase
  .from('comments')
  .insert(newComment)
  .single()
  .eq('post_id', newComment.postId)

  console.log(newComment)
  console.log(error)
  
  return { error, status, data }; 
  //Handle add comment here
};

export const removeComment = async (_, { arg: id }) => {
  const { data, error, status } = await supabase 
  .from('comments')
  .delete()
  .select()
  .eq('id', id);

  console.log( data, error, status )

  return { error, status, data }

  //Handle remove comment here
};
