import { useLoaderData } from "@remix-run/react";
import { getBlogs } from "utils/blog.server";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";
import Button from "~/components/ui/Button";
import { Post, PostCardWrapper } from "~/components/ui/Post";
import Tabs from "~/components/ui/Tabs";

export async function loader({ request }) {
  const blogs = await getBlogs(request);

  return { blogs };
}

export default function Blogs() {
  const { blogs } = useLoaderData();
  return (
    <Main>
      <Tabs
        data={[
          { label: "Top", content: "Blah blah" },
          { label: "Latest", content: "Blah blah blah" },
        ]}
      />
      {blogs.length > 0 ? (
        <PostCardWrapper>
          {blogs.map((blog) => (
            <Post post={blog} key={blog.id} />
          ))}
        </PostCardWrapper>
      ) : (
        <p>No blogs</p>
      )}
    </Main>
  );
}
