import { WebhookEvent } from "../types";

interface EventDetailModalProps {
  event: WebhookEvent;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto z-50" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Event Details: {event.eventType}
                </h3>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'Processed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {event.status}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Reference: {event.reference}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-md p-4 overflow-auto max-h-96">
                    <pre className="text-xs text-gray-800 font-mono whitespace-pre">
                      {JSON.stringify(event.payload, null, 2)}
                    </pre>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-md font-medium">Processing Results</h4>
                    <div className="mt-2 bg-green-50 p-3 rounded-md">
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <i className="fas fa-check-circle text-green-500 mr-2"></i>
                          <span>Webhook signature verified</span>
                        </li>
                        {event.status === 'Processed' && (
                          <>
                            <li className="flex items-center">
                              <i className="fas fa-check-circle text-green-500 mr-2"></i>
                              <span>Payment recorded in database</span>
                            </li>
                            <li className="flex items-center">
                              <i className="fas fa-check-circle text-green-500 mr-2"></i>
                              <span>Order status updated to "Paid"</span>
                            </li>
                          </>
                        )}
                        {event.status === 'Failed' && (
                          <li className="flex items-center">
                            <i className="fas fa-times-circle text-red-500 mr-2"></i>
                            <span>Processing failed: {event.error || 'Unknown error'}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
            {event.status === 'Failed' && (
              <button 
                type="button" 
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                <i className="fas fa-redo mr-2"></i> Retry Processing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
