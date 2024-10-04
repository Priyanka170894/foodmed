import paypal from '@paypal/checkout-server-sdk';
import asyncHandler from '../middlewares/asyncHandler.js';


// Set up PayPal environment
const environment = new paypal.core.SandboxEnvironment('AbUWzXFCIMFDisRZsgQygOHIImLtz0SQ76s835BuTZLpGdvIM79XXPsPbW9RkP6D5naE86Bmq1rnUkDk','EC13uYUASaF6CLMUYmK2wvw4fIo7V5q1B4MmlIODxgS2Az5HARBAy8vjW0jLfm7RNr1zNw3U-vTWslRU');
// const environment = new paypal.core.SandboxEnvironment(
//   process.env.PAYPAL_SANDBOX_CLIENT_ID, // Use the PayPal sandbox client ID from environment variables
//   process.env.PAYPAL_SANDBOX_CLIENT_SECRET // Use the PayPal sandbox client secret from environment variables
// );

// console.log(process.env.PAYPAL_SANDBOX_CLIENT_ID,process.env.PAYPAL_SANDBOX_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

// Create a payment order (test mode)
export const createPayPalOrder = asyncHandler(async (req, res) => {
  const { amount, currency = 'USD' } = req.body; // Get amount and currency from request body

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount,
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.status(200).json({ id: order.result.id });
  } catch (error) {
    res.status(500).json({ message: 'PayPal order creation failed', error: error.message });
  }
});

// Capture a PayPal payment
export const capturePayPalPayment = asyncHandler(async (req, res) => {
  const { orderID } = req.body; // Get the PayPal order ID from the request body

  // Create a capture request for the PayPal order
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({}); // No additional request body is needed for capture

  try {
    // Execute the capture request
    const capture = await client.execute(request);

    // Send back the capture result
    res.status(200).json({
      status: capture.result.status,
      details: capture.result,
    });
  } catch (error) {
    res.status(500).json({ message: 'PayPal payment capture failed', error: error.message });
  }
});
