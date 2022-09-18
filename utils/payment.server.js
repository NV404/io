import Razorpay from "razorpay";

export async function createOrder(amount) {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const orderOptions = {
    amount: amount*100,
    currency: "INR",
  };

  const order = await instance.orders.create(orderOptions);

  return order;
}
