import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { addComment, getblog, likeBlog, removeLike } from "utils/blog.server";
import { getUserId } from "utils/session.server";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";

export async function loader({ params, request }) {
  const slug = params.slug;
  const blog = await getblog(slug);
  const user = await getUserId(request);

  if (blog) {
    return { blog, user };
  }

  return redirect("/");
}

export async function action({ request }) {
  const formData = await request.formData();

  const id = formData.get("blogId");
  const comment = formData.get("comment");
  const action = formData.get("action");

  if (action) {
    if (action === "Like") {
      const like = await likeBlog({ id, request });
      if (!like) {
        return { error: "something went wrong liking post" };
      }
      return { data: "success" };
    }

    if (action === "remove") {
      const disLike = await removeLike({ id, request });
      if (!disLike) {
        return { error: "something went wrong unLiking post" };
      }
      return { data: "success" };
    }

    if (action === "comment") {
      const portComment = await addComment({ id, comment, request });
      if (!portComment) {
        return { error: "something went wrong unLiking post" };
      }
      return { data: "success" };
    }
  }

  return { error: "Action not found" };
}

export default function Blog() {
  const data = useLoaderData();
  const blog = data.blog;

  function isLiked(id) {
    const obj = blog.likes.find((x) => x.userID === id);
    if (obj) {
      return true;
    }
    return false;
  }

  return (
    <Page>
      <Header />
      <Main>
        <h1 className="text-4xl font-bold">{blog.title}</h1>
      </Main>
      <div>
        <p>title: {blog.title}</p>
        {/* <img src={blog.thumbnailUrl} alt="mn" width={300} /> */}
        <p>content: {blog.content}</p>
      </div>
      <br />
      <p>Votes: {blog.likes.length}</p>
      <Form method="post">
        <input defaultValue={blog.id} name="blogId" hidden />
        <input
          className="cursor-pointer"
          type="submit"
          name="action"
          value={isLiked(data.user) ? "remove" : "Like"}
        />
      </Form>
      <Form method="post">
        <input defaultValue={blog.id} name="blogId" hidden />
        Comment: <input type="text" name="comment" />
        <input
          className="cursor-pointer"
          type="submit"
          name="action"
          value="comment"
        />
      </Form>
      {blog.comments.map((comment) => (
        <div className="border" key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
      <br />
      <h3>Author</h3>
      <Link to={`/u/${blog.user.name}`}>
        <p>Name: {blog.user.name}</p>
      </Link>
    </Page>
  );
}
