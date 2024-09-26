import paypal from '@paypal/checkout-server-sdk';
import asyncHandler from '../middlewares/asyncHandler.js';


// Set up PayPal environment
const environment = new paypal.core.SandboxEnvironment('AdZmRL-RlHqYjnCKStRJQ3Lws69tvq-x-X9CvlcODoeVUZZWTJLUruPgtPop7-_siSu2-poAcij8L4JU','EEaGmpc12RyNnCdMSUCzy561nt03NDBsQoDXSwc_yC5s1gJ_NSYJ3hwGLNZjq_h6vrQQ80-xaiCRfPn-');
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
