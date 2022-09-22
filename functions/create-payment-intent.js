// require("dotenv").config();

// const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
// console.log(stripe);

// exports.handler = async function (event, context) {
//   const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

//   const calculateOrderAmount = () => {
//     return shipping_fee + total_amount;
//   };
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: calculateOrderAmount(),
//       currency: "usd",
//     });
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ msg: error.message }),
//     };
//   }
// };

const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(
  "sk_test_51LkQ3PDuKEKY02qxF11srqCFbxZQXWj1M5ABlaCv1gqLdm7Ece6nIzz71P0rT4BIHwB29W5i1Rh7W2d0dNaePmBB00I480XlWO"
);

exports.handler = async function (event, context) {
  const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

  const calculateOrderAmount = () => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return shipping_fee + total_amount;
  };
  try {
    // Create a PaymentIntent with the order amount and currency
    console.log(stripe);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: "usd",
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};