// import { supabase } from "@supabase/auth-ui-shared";

// export const commentCacheKey = "/api/blogs";

// export const addReply = async (_,{arg: newReply}) => {
//     const { data, error, status } = await supabase
//     .from("replies")
//     .insert(newReply)
//     .single()
//     .eq('comment_id', newReply.comment_id)

//     console.log(newReply)
//     console.log(error)

//     return { error, status, data}
// }