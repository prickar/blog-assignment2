import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";


import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getPosts, postCacheKey } from "../../api-routes/posts"




export default function Blog() {
  const {
    data: { data = []} = {},
    error
  } = useSWR(postCacheKey, getPosts)
  console.log({error, data})

  return (
    <section>
      <Heading>Blog</Heading>
      {data?.map((post) => (
        <Link
          key={post.slug}
          className={styles.link}
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p>{post.title}</p>
            <time className={styles.date}>{post.created_at}</time>
          </div>
        </Link>
      ))}
    </section>
  );
}
