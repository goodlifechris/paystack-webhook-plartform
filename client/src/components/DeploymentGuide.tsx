export default function DeploymentGuide() {
  return (
    <div className="mt-8 mb-6">
      <h2 className="text-lg font-medium text-gray-900">Deployment Guide</h2>
      <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold">1. Environment Setup</h3>
            <div className="mt-2">
              <div className="bg-gray-50 p-4 rounded-md">
                <code className="text-sm font-mono">
npm install express body-parser dotenv crypto winston
                </code>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Create a <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">.env</code> file with your Paystack secret key:
              </p>
              <div className="mt-2 bg-gray-50 p-4 rounded-md">
                <code className="text-sm font-mono">
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PORT=5000
                </code>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-base font-semibold">2. Testing Locally</h3>
            <p className="mt-2 text-sm text-gray-600">
              For local testing, use a tool like ngrok to create a public URL:
            </p>
            <div className="mt-2 bg-gray-50 p-4 rounded-md">
              <code className="text-sm font-mono">
ngrok http 5000
              </code>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Add the generated URL to your Paystack dashboard webhook settings.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-base font-semibold">3. Production Deployment</h3>
            <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium flex items-center">
                  <span className="text-white bg-[#2eb67d] rounded-md p-1 mr-2 h-6 w-6 flex items-center justify-center text-xl">H</span>
                  Heroku
                </h4>
                <ol className="mt-2 space-y-1 text-sm text-gray-600 list-decimal list-inside">
                  <li>Create a Procfile: <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">web: node index.js</code></li>
                  <li>Push your code to Heroku</li>
                  <li>Set environment variables in dashboard</li>
                </ol>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium flex items-center">
                  <i className="fab fa-aws text-[#ff9900] mr-2"></i>
                  AWS Lambda
                </h4>
                <ol className="mt-2 space-y-1 text-sm text-gray-600 list-decimal list-inside">
                  <li>Configure serverless.yml</li>
                  <li>Set up API Gateway triggers</li>
                  <li>Deploy using the Serverless framework</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-semibold">4. Security Recommendations</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <i className="fas fa-shield-alt text-blue-600 mt-0.5"></i>
                </div>
                <p className="ml-2">
                  Always validate the webhook signature before processing events.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <i className="fas fa-shield-alt text-blue-600 mt-0.5"></i>
                </div>
                <p className="ml-2">
                  Store the Paystack secret key securely using environment variables.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <i className="fas fa-shield-alt text-blue-600 mt-0.5"></i>
                </div>
                <p className="ml-2">
                  Implement proper error handling and logging for troubleshooting.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <i className="fas fa-shield-alt text-blue-600 mt-0.5"></i>
                </div>
                <p className="ml-2">
                  Consider rate limiting to prevent potential DoS attacks.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
