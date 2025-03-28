import WebhookSetup from "./WebhookSetup";
import EventStats from "./EventStats";
import EventLogs from "./EventLogs";
import CodeSample from "./CodeSample";
import DeploymentGuide from "./DeploymentGuide";
import { WebhookEvent } from "../types";

interface DashboardProps {
  events: WebhookEvent[];
  onViewDetails: (event: WebhookEvent) => void;
}

export default function Dashboard({ events, onViewDetails }: DashboardProps) {
  return (
    <>
      <WebhookSetup />
      <EventStats 
        totalEvents={events.length}
        successfulEvents={events.filter(e => e.status === "Processed").length}
        failedEvents={events.filter(e => e.status === "Failed").length}
      />
      <EventLogs events={events} onViewDetails={onViewDetails} />
      <CodeSample />
      <DeploymentGuide />
    </>
  );
}
