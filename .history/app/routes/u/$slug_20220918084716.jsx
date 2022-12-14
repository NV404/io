import { redirect } from "@remix-run/node";
import {
  useLoaderData,
  Form,
  useActionData,
  useNavigate,
  useTransition,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { createOrder } from "utils/payment.server";
import { getUserId } from "utils/session.server";

import { getBlogsBySlug } from "utils/user.server";
import Dollar from "~/components/icons/Dollar";
import Sparkles from "~/components/icons/Sparkles";
import Header from "~/components/layout/Header";
import Main from "~/components/layout/Main";
import Page from "~/components/layout/Page";
import Button from "~/components/ui/Button";
import Field from "~/components/ui/Field";
import { Post, PostCardWrapper } from "~/components/ui/Post";

export async function loader({ params, request }) {
  const slug = params.slug;
  const user = await getBlogsBySlug(slug);

  const userID = await getUserId(request);

  if (user) {
    return { user, userID };
  }

  return redirect("/");
}

export async function action({ request }) {
  const formData = await request.formData();

  const action = formData.get("action");
  const amount = parseFloat(formData.get("amount") || 0);
  const paidTo = formData.get("author");

  if (action === "tip" && amount > 0) {
    const orderId = await createOrder(amount);
    return {
      paidTo,
      orderId,
      key: process.env.RAZORPAY_KEY_ID,
    };
  }

  return { error: "something went wrong" };
}

export default function Portfolio() {
  const { user, userID } = useLoaderData();

  const actionData = useActionData();
  const transition = useTransition();
  const isBusy =
    transition.state === "loading" || transition.state === "submitting";
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
      <Header isLoggedIn={!!userID} />
      <Main className="flex flex-col items-stretch justify-start gap-6">
        <div className="flex flex-row items-start justify-start gap-6">
          {user?.logoURL ? (
            <img width={64} height={64} src={user.logoURL} />
          ) : (
            <Sparkles size={64} />
          )}
          <div className="flex flex-col items-stretch justify-start gap-2">
            <h1 className="font-bold text-4xl">{user.name}</h1>
            <Form
              method="post"
              className="flex flex-row items-stretch justify-start gap-1"
            >
              <fieldset className="contents" disabled={isBusy}>
                <Field
                  name="amount"
                  type="number"
                  placeholder="???"
                  className="max-w-[6ch]"
                />
                <input type="hidden" name="author" value={user.id} />
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
        <div className="flex flex-col items-stretch justify-start gap-4">
          <h2 className="font-bold text-3xl">
            Blogs posted ({user.blogs.length})
          </h2>
          <PostCardWrapper>
            {user.blogs.map((blog) => (
              <Post post={blog} key={blog.id} />
            ))}
          </PostCardWrapper>
        </div>
      </Main>
    </Page>
  );
}
