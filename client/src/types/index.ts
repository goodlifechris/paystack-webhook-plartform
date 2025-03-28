export interface WebhookEvent {
  id: number;
  eventType: string;
  reference: string;
  status: "Processed" | "Failed";
  timestamp: string;
  payload: any;
  error?: string;
}
