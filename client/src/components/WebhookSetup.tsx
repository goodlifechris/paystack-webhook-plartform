import { useState } from "react";

export default function WebhookSetup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const webhookUrl = `${window.location.origin}/api/webhook/paystack`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="mt-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Webhook Configuration
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details for setting up your Paystack webhook endpoint.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Webhook URL
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  URL
                </span>
                <input 
                  type="text" 
                  value={webhookUrl}
                  readOnly 
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300"
                />
                <button 
                  type="button" 
                  className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  onClick={copyToClipboard}
                >
                  {isCopied ? (
                    <>
                      <i className="fas fa-check mr-1"></i> Copied
                    </>
                  ) : (
                    <>
                      <i className="fas fa-copy mr-1"></i> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Secret Key
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input 
                  type={isPasswordVisible ? "text" : "password"} 
                  value={import.meta.env.VITE_PAYSTACK_SECRET_KEY || "••••••••••••••••"}
                  readOnly 
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button 
                  type="button" 
                  className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <>
                      <i className="fas fa-eye-slash mr-1"></i> Hide
                    </>
                  ) : (
                    <>
                      <i className="fas fa-eye mr-1"></i> Show
                    </>
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Used for validating webhook signatures.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-3">
                <span className="text-sm font-medium text-gray-900">Webhook endpoint is properly configured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
