import { useRouter } from "next/router";
import styles from "./comments.module.css";
import Comment from "../comment";
import { commentCacheKey, getComments } from '@/api-routes/comments'

import useSWRMutation from "swr/mutation"; 
import useSWR  from "swr"


// const mockData = [
//   {
//     id: "1",
//     comment: "Love this post!",
//     createdAt: "2022-02-15",
//     author: "John Doe",
//   },
//   {
//     id: "2",
//     comment: "This is indeed a good community fit!",
//     createdAt: "2022-02-12",
//     author: "Jane Doe",
//   },
// ];

export default function Comments({ postId }) {
  const router = useRouter();
console.log({ postId})
  const { slug } = router.query;
  const { data : { data: post = []} = {},
  error,
 isLoading } = useSWR(postId ? `${commentCacheKey}${postId}` : null, () =>
 getComments({postId}) 
 );
 console.log(post)
  
  /* 
  Here is a good place to fetch the comments from the database that has a 
  foreign key relation to the post.
  */

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {post.map((comment) => (
        <Comment key={comment.id} {...comment} postId={postId} />
      ))}
    </div>
  );
}
