import { redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useTransition,
  useActionData,
  useNavigate,
} from "@remix-run/react";
import { useEffect, useState } from "react";

import { addComment, getblog, likeBlog, removeLike } from "utils/blog.server";
import { getMerchs, getMerchsByAuthor } from "utils/merch.server";
import { createOrder } from "utils/payment.server";
import { getUserId } from "utils/session.server";
import { getSponsers, getSponsersByAuthor } from "utils/sponser.server";
import Dollar from "~/components/icons/Dollar";
import Like from "~/components/icons/Like";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";
import Anchor from "~/components/ui/Anchor";
import Button from "~/components/ui/Button";
import Field from "~/components/ui/Field";
import { PostCard, PostCardWrapper } from "~/components/ui/Post";

export async function loader({ params, request }) {
  const slug = params.slug;
  const blog = await getblog(slug);
  const user = await getUserId(request);
  const sponsers = await getSponsers(request);
  const merchs = await getMerchs(request);

  if (blog) {
    return { blog, user, sponsers, merchs };
  }

  return redirect("/");
}

export async function action({ request }) {
  const formData = await request.formData();

  const id = formData.get("blogId");
  const comment = formData.get("comment");
  const amount = parseFloat(formData.get("amount") || 0);
  const action = formData.get("action");
  const paidTo = formData.get("author");

  if (action) {
    if (action === "tip" && amount > 0) {
      const orderId = await createOrder(amount);
      console.log(orderId, amount, paidTo);
      return {
        paidTo,
        orderId,
        key: process.env.RAZORPAY_KEY_ID,
      };
    }

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
  const user = data.user;

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

  const actionData = useActionData();

  const [paymentFailed, setPaymentFailed] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (actionData && !actionData?.errors) {
        const { amount, id: order_id, currency } = actionData.orderId;

        const options = {
          key: actionData.key,
          amount: amount,
          currency: currency,
          name: "IO blogs",
          order_id: order_id,
          handler: async function (response) {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paidTo: actionData.paidTo,
              amount,
            };

            await fetch("/api/checkPayment", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            }).then(async (res) => {
              setLoading(true);
              const data = await res.json();
              if (data?.success) {
                navigate("/?success=true");
              }
              if (data?.error) {
                setPaymentFailed(true);
                setLoading(false);
              }
            });
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    },
    [actionData, navigate]
  );

  return (
    <Page>
      <Header isLoggedIn={!!user} />
      <Main className="flex flex-col items-stretch justify-start gap-8">
        <div className="flex flex-col items-stretch justify-start gap-4">
          <h1 className="text-5xl font-bold">{blog.title}</h1>
          <p className="text-2xl text-neutral-400">
            Posted by{" "}
            <Anchor as={Link} to={`/u/${blog.user.slug}`}>
              {blog.user.name}
            </Anchor>{" "}
            at {blog.createdAt}1
          </p>
          <div className="flex flex-row items-stretch justify-start gap-6">
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
            <Form
              method="post"
              className="flex flex-row items-stretch justify-start gap-1"
            >
              <fieldset className="contents" disabled={isBusy}>
                <Field
                  name="amount"
                  type="number"
                  placeholder="₹"
                  className="max-w-[6ch]"
                />
                <input type="hidden" name="author" value={user} />
                <Button
                  type="submit"
                  value="tip"
                  name="action"
                  className="flex flex-row items-center justify-center gap-1"
                  ghost
                >
                  <Dollar className="text-green-400" />
                  <span>Tip author</span>
                </Button>
              </fieldset>
            </Form>
          </div>
        </div>
        <p className="text-lg text-neutral-200 leading-8">{blog.content}</p>
        <div className="flex flex-col items-stretch justify-start gap-4">
          <p className="text-3xl font-bold">Comments</p>
          <Form
            method="post"
            className="flex flex-row items-end justify-between gap-2"
          >
            <fieldset className="contents" disabled={isBusy}>
              <input defaultValue={blog.id} name="blogId" hidden />
              <Field label="Your comment" type="text" name="comment" />
              <Button type="submit" name="action" value="comment">
                Post
              </Button>
            </fieldset>
          </Form>

          <PostCardWrapper>
            {blog.comments.map((comment) => (
              <PostCard
                key={comment.id}
                className={[
                  "flex flex-col items-stretch justify-start rounded-xl gap-2 bg-white/5",
                ].join(" ")}
              >
                <p>{comment.content}</p>
                <p className="text-sm text-neutral-400">
                  <Anchor as={Link} to={`/u/${comment.user.slug}`}>
                    {comment.user.name}
                  </Anchor>{" "}
                  on {comment.createdAt}
                </p>
              </PostCard>
            ))}
          </PostCardWrapper>
        </div>
        <div className="flex flex-col items-stretch justify-start gap-4">
          <p className="text-3xl font-bold">Merch</p>

          <PostCardWrapper>
            {data.merch.map((comment) => (
              <PostCard
                key={comment.id}
                className={[
                  "flex flex-col items-stretch justify-start rounded-xl gap-2 bg-white/5",
                ].join(" ")}
              >
                <p>{comment.content}</p>
                <p className="text-sm text-neutral-400">{comment.createdAt}</p>
              </PostCard>
            ))}
          </PostCardWrapper>
        </div>
        <div className="flex flex-col items-stretch justify-start gap-4">
          <p className="text-3xl font-bold">Sponsers</p>

          <PostCardWrapper>
            {data.sponsers.map((comment) => (
              <PostCard
                key={comment.id}
                className={[
                  "flex flex-col items-stretch justify-start rounded-xl gap-2 bg-white/5",
                ].join(" ")}
              >
                <p>{comment.content}</p>
                <p className="text-sm text-neutral-400">{comment.createdAt}</p>
              </PostCard>
            ))}
          </PostCardWrapper>
        </div>
      </Main>
    </Page>
  );
}
