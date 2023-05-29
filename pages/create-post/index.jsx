import BlogEditor from "../../components/blog-editor";

export default function CreatePost() {
  const handleOnSubmit = ({ editorContent, titleInput, image }) => {
    console.log({ editorContent, titleInput, image });
  };

  return (
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
