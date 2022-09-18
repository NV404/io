import crypto from "crypto";
import { sendTip } from "utils/transactions.server";
import { updateUser } from "utils/user.server";

export async function action({ request }) {
  try {
    const data = await request.json();
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpaySignature,
      paidTo,
      amount,
    } = data;

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature) {
      return new Response(JSON.stringify({ error: "Transaction not legit!" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
    }

    await sendTip(paidTo, amount / 100, request);
    await updateUser({
      data: { balance: { increment: amount / 100 } },
      request,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }
}
