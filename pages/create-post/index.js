import styles from "./create-post.module.css";
import Editor from "../../components/editor/editor";
import { content } from "../../components/editor/constants";
import { useState } from "react";

export default function CreatePost() {
  const [editorContent, setEditorJsonContent] = useState(content);

  const handleOnChange = (content) => {
    setEditorJsonContent(content);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    console.log({ editorContent });
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.container}>
      <Editor
        content={content}
        className={styles.editor}
        onChange={handleOnChange}
      />
      <button type="submit">Upload post</button>
    </form>
  );
}
