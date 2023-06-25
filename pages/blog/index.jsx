import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";
import { useEffect, useRef, useState } from "react";
import Input from "@components/input";
import Label from "@components/label";
import Button from "@components/button";


import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getPosts, postCacheKey } from "../../api-routes/posts"

export default function Blog() {
    const [searchText, setSearchText] = useState("");
  const formRef = useRef(null);

    const {data: {data = [] } = {},  trigger: searchTrigger } = useSWRMutation(
    `${postCacheKey}${searchText}`,
    getPosts, {
      onError: (error) => {
        console.log(error)
        
      }
    })
    console.log(data)

    useEffect(() => {
      const fetchData = async () => {
        await searchTrigger(searchText);
      }
      fetchData();
    }, [])

    const handleOnchange = async (event) => {
      setSearchText(event.target.value);
      await searchTrigger(event.target.value);
    }

  return (
    <section>
      <Heading>Blog</Heading>

                  <form ref={formRef}>
        <div className={styles.buttonContainer}>
          <Label htmlFor="replyText" />
          <Input 
          onChange={handleOnchange}
          value={searchText}
          id="searchText" 
          name="searchText" />
          <Button type="submit">Search</Button>
        </div>
      </form>

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
