import Button from "@components/button";
import styles from "./comment.module.css";
import useSWRMutation from "swr/mutation"; 

import { removeComment, commentCacheKey } from "../../../../../api-routes/comments";
// import { addReply } from "../../../../../api-routes/replies";


export default function Comment({ comment, createdAt, author, id, postId }) {
  const { trigger: deleteCommentTrigger } = useSWRMutation(postId ? `${commentCacheKey}${postId}` : null, removeComment);
  // const { trigger: addReplyTrigger } = useSWRMutation(commentCacheKey, addReply);

  const handleDelete = async () => {
    const postId = id 
    const { status, error } = await deleteCommentTrigger(postId)
    console.log({ id });
  };

  // const handleReply = async () => {
  //   const newReply = {
  //     author,
  //     reply, 
  //     comment_id: commentId,
  //   }

  //   console.log({newReply});

  //   const { error, status } = await addReplyTrigger(newReply)
  //   console.log(error)

  // }
  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>

      {/* The Delete part should only be showed if you are authenticated and you are the author */}
      <div className={styles.buttonContainer}>
        <Button onClick={handleDelete}>Delete</Button>
        {/* <Button onClick={handleReply}>Reply</Button> */}

      </div>
    </div>
  );
}
