import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import { WebhookEvent } from "../types";

export default function DashboardPage() {
  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent | null>(null);
  
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['/api/webhook/events'],
  });
  
  const handleViewDetails = (event: WebhookEvent) => {
    setSelectedEvent(event);
  };

  return (
    <Layout>
      {isLoading ? (
        <div className="py-6 flex justify-center">
          <div className="animate-pulse flex space-x-4 w-full max-w-md">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="py-6 text-center text-red-500">
          <p>Error loading webhook events. Please try again later.</p>
        </div>
      ) : (
        <Dashboard 
          events={events} 
          onViewDetails={handleViewDetails}
        />
      )}
    </Layout>
  );
}
