import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { validatePaystackSignature } from "./paystack";
import { processWebhook } from "./webhookHandlers";
import { logger } from "./logger";
import { insertWebhookEventSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Webhook Endpoint
  app.post('/api/webhook/paystack', async (req: Request, res: Response) => {
    const startTime = Date.now();
    
    try {
      // Verify the Paystack signature
      const signatureValid = validatePaystackSignature(
        req.headers['x-paystack-signature'] as string, 
        req.body
      );
      
      const reference = req.body.data?.reference || `unknown-${Date.now()}`;
      const eventType = req.body.event || 'unknown';
      
      logger.info(`Received ${eventType} webhook with reference ${reference}`);
      
      // Store the webhook event
      const webhookEvent = await storage.createWebhookEvent({
        eventType,
        reference,
        status: signatureValid ? 'Pending' : 'Failed',
        payload: req.body,
        signatureValid,
        error: signatureValid ? undefined : 'Invalid signature',
        responseTime: 0
      });
      
      // If signature is invalid, return error
      if (!signatureValid) {
        logger.warn(`Invalid signature for webhook ${reference}`);
        res.status(401).json({ error: 'Invalid signature' });
        return;
      }
      
      // Process the webhook
      const result = await processWebhook(webhookEvent);
      
      // Calculate response time
      const responseTime = Date.now() - startTime;
      
      // Update webhook event with result
      await storage.updateWebhookEvent(webhookEvent.id, {
        status: result.success ? 'Processed' : 'Failed',
        error: result.error,
        responseTime
      });
      
      if (result.success) {
        logger.info(`Successfully processed webhook ${reference} in ${responseTime}ms`);
        res.status(200).json({ message: 'Webhook processed successfully' });
      } else {
        logger.error(`Failed to process webhook ${reference}: ${result.error}`);
        res.status(500).json({ error: result.error });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Error processing webhook: ${errorMessage}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get webhook events endpoint
  app.get('/api/webhook/events', async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string || '100', 10);
      const offset = parseInt(req.query.offset as string || '0', 10);
      
      const events = await storage.listWebhookEvents(limit, offset);
      res.json(events);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Error fetching webhook events: ${errorMessage}`);
      res.status(500).json({ error: 'Failed to fetch webhook events' });
    }
  });
  
  // Get webhook event by ID
  app.get('/api/webhook/events/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const event = await storage.getWebhookEvent(id);
      
      if (!event) {
        res.status(404).json({ error: 'Webhook event not found' });
        return;
      }
      
      res.json(event);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Error fetching webhook event: ${errorMessage}`);
      res.status(500).json({ error: 'Failed to fetch webhook event' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
