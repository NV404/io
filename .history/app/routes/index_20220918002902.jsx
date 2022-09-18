import { useLoaderData } from "@remix-run/react";
import { getBlogs } from "utils/blog.server";
import { getUserId } from "utils/session.server";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";
import { Post, PostCardWrapper } from "~/components/ui/Post";
import Tabs from "~/components/ui/Tabs";

export async function loader({ request }) {
  const userId = await getUserId(request);
  const blogs = await getBlogs(request);

  return { blogs, userId };
}

export default function Index() {
  const { blogs, userId } = useLoaderData();
  return (
    <Page>
      <Header isLoggedIn={!!userId} showPitch />
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
    </Page>
  );
}
