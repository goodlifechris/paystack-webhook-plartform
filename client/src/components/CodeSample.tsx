export default function CodeSample() {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900">Implementation Example</h2>
      <div className="mt-4 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold">Node.js Implementation</h3>
          <div className="mt-4 bg-gray-800 rounded-md overflow-hidden">
            <pre className="p-4 text-sm text-gray-100 font-mono code-block">
{`// Sample Paystack webhook handler in Express.js

const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Paystack webhook secret from your dashboard
const secret = process.env.PAYSTACK_SECRET_KEY;

// Webhook route
app.post('/api/webhook/paystack', (req, res) => {
  // Validate event
  const hash = crypto.createHmac('sha512', secret)
                     .update(JSON.stringify(req.body))
                     .digest('hex');
  
  if (hash !== req.headers['x-paystack-signature']) {
    // Handle invalid signature
    console.error('Invalid signature');
    return res.status(401).send('Invalid signature');
  }
  
  // Process the webhook
  const event = req.body;
  
  // Log the event (for debugging and monitoring)
  console.log('Received event:', event.event);
  
  // Handle different event types
  switch(event.event) {
    case 'charge.success':
      // Handle successful payment
      handleSuccessfulPayment(event.data);
      break;
      
    case 'transfer.success':
      // Handle successful transfer
      handleSuccessfulTransfer(event.data);
      break;
      
    case 'subscription.create':
      // Handle subscription creation
      handleSubscriptionCreated(event.data);
      break;
      
    // Add more event types as needed
    
    default:
      console.log(\`Unhandled event type: \${event.event}\`);
  }
  
  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send('Webhook received successfully');
});

// Event handler functions
function handleSuccessfulPayment(data) {
  // Implement payment fulfillment logic
  console.log(\`Processed payment for \${data.amount/100} \${data.currency}\`);
  // Update order status in database
  // Trigger email notification
  // etc.
}

function handleSuccessfulTransfer(data) {
  // Implement transfer processing logic
  console.log(\`Transfer completed: \${data.reference}\`);
}

function handleSubscriptionCreated(data) {
  // Implement subscription logic
  console.log(\`New subscription: \${data.subscription_code}\`);
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
            </pre>
          </div>
          <div className="mt-4">
            <h4 className="text-base font-medium">Key Components:</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                </div>
                <p className="ml-2">
                  <span className="font-medium">Signature Verification:</span> The webhook validates the Paystack signature using HMAC SHA-512.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                </div>
                <p className="ml-2">
                  <span className="font-medium">Event Handling:</span> Different event types are routed to appropriate handler functions.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                </div>
                <p className="ml-2">
                  <span className="font-medium">Response Handling:</span> The webhook returns a 200 status code to acknowledge receipt.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                </div>
                <p className="ml-2">
                  <span className="font-medium">Error Handling:</span> Invalid signatures are rejected with a 401 status code.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}