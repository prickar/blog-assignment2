import styles from "./create-post.module.css";
import Editor from "../../components/editor/editor";
import { content } from "../../components/editor/constants";
import { useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import Label from "../../components/label";

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
      <h1 className={styles.heading}>Create post</h1>
      <form onSubmit={handleOnSubmit} className={styles.container}>
        <Label>Title</Label>
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
