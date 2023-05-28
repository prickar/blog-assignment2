import styles from "./create-post.module.css";
import Editor from "../../components/editor/editor";
import { content } from "../../components/editor/constants";
import { useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";

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
    <>
      <h1>Create post</h1>
      <form onSubmit={handleOnSubmit} className={styles.container}>
        <label>Title</label>
        <Input className={styles.titleInput} />
        <Editor
          content={content}
          className={styles.editor}
          onChange={handleOnChange}
        />
        <Button className={styles.uploadButton} type="submit">
          Upload post
        </Button>
      </form>
    </>
  );
}
