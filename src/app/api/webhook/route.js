import {Order} from "@/models/Order";

const stripe = require('stripe')("sk_test_51Q3yLOChbYJiu2UxloOJzI8Em26RYR7Rr5KZsrRdsdlgLROinkq6MZWafPMOuJK5E425XDyxRoJFXN8L3GYE4WwW004MDKdlys");

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = "47:00";
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('stripe error');
    console.log(e);
    return Response.json(e, {status: 400});
  }

  if (event.type === 'checkout.session.completed') {
    console.log(event);
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({_id:orderId}, {paid:true});
    }
  }

  return Response.json('ok', {status: 200});
}