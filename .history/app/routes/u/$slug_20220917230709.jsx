import { redirect } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  Form,
  useActionData,
  useNavigate,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { createOrder } from "utils/payment.server";

import { getBlogsBySlug } from "utils/user.server";

export async function loader({ params }) {
  const slug = params.slug;
  const user = await getBlogsBySlug(slug);

  if (user) {
    return { user };
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
  const { user } = useLoaderData();

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
    <div>
      <p>Name: {user.name}</p>
      <Form method="post">
        <input type="text" name="amount" />
        <input type="hidden" name="author" value={user.id} />
        <input type="submit" value="tip" name="action" />
      </Form>
      <hr />
      <h3>Blogs</h3>
      {user.blogs.map((blog) => (
        <div className="border border-black" key={blog.slug}>
          <Link to={`/p/${blog.slug}`}>
            <p>title: {blog.title}</p>
            <p>content: {blog.content}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
