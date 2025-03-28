import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import DashboardPage from "./pages/DashboardPage";
import { useState } from "react";
import EventDetailModal from "./components/EventDetailModal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const openModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
      {isModalOpen && selectedEvent && (
        <EventDetailModal 
          event={selectedEvent} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </QueryClientProvider>
  );
}

export default App;
