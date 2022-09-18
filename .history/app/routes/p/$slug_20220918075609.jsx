import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useTransition } from "@remix-run/react";

import { addComment, getblog, likeBlog, removeLike } from "utils/blog.server";
import { getUserId } from "utils/session.server";
import Dollar from "~/components/icons/Dollar";
import Like from "~/components/icons/Like";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";
import Anchor from "~/components/ui/Anchor";
import Button from "~/components/ui/Button";

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

  const transition = useTransition();
  const isBusy =
    transition.state === "loading" || transition.state === "submitting";

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
      <Main className="flex flex-col items-stretch justify-start gap-8">
        <div className="flex flex-col items-stretch justify-start gap-4">
          <h1 className="text-5xl font-bold">{blog.title}</h1>
          <p className="text-2xl text-neutral-400">
            Posted by{" "}
            <Anchor as={Link} to={`/u/${blog.user.slug}`}>
              {blog.user.name}
            </Anchor>{" "}
            at {blog.createdAt}
          </p>
          <div className="flex flex-row items-stretch justify-start gap-2">
            <Form method="post">
              <fieldset className="contents" disabled={isBusy}>
                <input defaultValue={blog.id} name="blogId" hidden />
                <Button
                  className="flex flex-row items-center justify-center gap-1"
                  ghost={!isLiked(data.user)}
                  name="action"
                  value={isLiked(data.user) ? "remove" : "Like"}
                >
                  <Like className="text-pink-400" />
                  <span>{blog.likes.length}</span>
                </Button>
              </fieldset>
            </Form>
            <Button
              className="flex flex-row items-center justify-center gap-1"
              ghost
            >
              <Dollar className="text-green-400" />
              <span>Tip author</span>
            </Button>
          </div>
        </div>
        <p className="text-lg text-neutral-200 leading-8">{blog.content}</p>
        <div className=""></div>
      </Main>
      <div>
        <p>content: {blog.content}</p>
      </div>
      <br />
      <p>Votes: {blog.likes.length}</p>
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
