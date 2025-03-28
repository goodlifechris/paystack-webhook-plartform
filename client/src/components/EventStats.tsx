interface EventStatsProps {
  totalEvents: number;
  successfulEvents: number;
  failedEvents: number;
}

export default function EventStats({ totalEvents, successfulEvents, failedEvents }: EventStatsProps) {
  const successRate = totalEvents > 0 ? ((successfulEvents / totalEvents) * 100).toFixed(1) : '0.0';
  const failureRate = totalEvents > 0 ? ((failedEvents / totalEvents) * 100).toFixed(1) : '0.0';
  
  // Calculate average response time (mock data for now, could be replaced with real metrics)
  const avgResponseTime = "124ms";

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900">Event Statistics</h2>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Events Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <i className="fas fa-bolt text-blue-600"></i>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Events
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {totalEvents}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        {/* Successful Events Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <i className="fas fa-check text-green-600"></i>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Successful Events
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {successfulEvents}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <i className="fas fa-check"></i>
                      <span className="sr-only">Success rate</span>
                      {successRate}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        {/* Failed Events Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <i className="fas fa-exclamation-triangle text-red-600"></i>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Failed Events
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {failedEvents}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <i className="fas fa-exclamation-circle"></i>
                      <span className="sr-only">Failure rate</span>
                      {failureRate}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        {/* Response Time Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gray-100 rounded-md p-3">
                <i className="fas fa-tachometer-alt text-gray-500"></i>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg. Response Time
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {avgResponseTime}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <i className="fas fa-arrow-down"></i>
                      <span className="sr-only">Improved by</span>
                      12%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
