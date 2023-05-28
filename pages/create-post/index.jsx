import styles from "./create-post.module.css";
import Editor from "@components/editor/editor";
import { content } from "@components/editor/constants";
import { useState } from "react";
import Button from "@components/button";
import Input from "@components/input";
import Label from "@components/label";
import Heading from "@components/heading/heading";

export default function CreatePost() {
  const [editorContent, setEditorJsonContent] = useState(content);

  const handleOnChange = (content) => {
    setEditorJsonContent(content);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { title } = Object.fromEntries(formData);

    console.log({ editorContent, title });
  };

  return (
    <>
      <Heading>Create post</Heading>
      <form onSubmit={handleOnSubmit} className={styles.container}>
        <Label>Title</Label>
        <Input name="title" className={styles.titleInput} />
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
