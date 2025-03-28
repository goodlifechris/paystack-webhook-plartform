import { users, type User, type InsertUser, webhookEvents, type WebhookEvent, type InsertWebhookEvent } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Webhook event methods
  createWebhookEvent(event: InsertWebhookEvent): Promise<WebhookEvent>;
  getWebhookEvent(id: number): Promise<WebhookEvent | undefined>;
  getWebhookEventByReference(reference: string): Promise<WebhookEvent | undefined>;
  listWebhookEvents(limit?: number, offset?: number): Promise<WebhookEvent[]>;
  updateWebhookEvent(id: number, updates: Partial<WebhookEvent>): Promise<WebhookEvent | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private webhookEvents: Map<number, WebhookEvent>;
  userCurrentId: number;
  eventCurrentId: number;

  constructor() {
    this.users = new Map();
    this.webhookEvents = new Map();
    this.userCurrentId = 1;
    this.eventCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWebhookEvent(insertEvent: InsertWebhookEvent): Promise<WebhookEvent> {
    const id = this.eventCurrentId++;
    const timestamp = new Date().toISOString();
    const event: WebhookEvent = { 
      ...insertEvent, 
      id,
      timestamp 
    };
    this.webhookEvents.set(id, event);
    return event;
  }

  async getWebhookEvent(id: number): Promise<WebhookEvent | undefined> {
    return this.webhookEvents.get(id);
  }

  async getWebhookEventByReference(reference: string): Promise<WebhookEvent | undefined> {
    return Array.from(this.webhookEvents.values()).find(
      (event) => event.reference === reference,
    );
  }

  async listWebhookEvents(limit = 100, offset = 0): Promise<WebhookEvent[]> {
    return Array.from(this.webhookEvents.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(offset, offset + limit);
  }

  async updateWebhookEvent(id: number, updates: Partial<WebhookEvent>): Promise<WebhookEvent | undefined> {
    const event = this.webhookEvents.get(id);
    if (!event) return undefined;
    
    const updatedEvent = { ...event, ...updates };
    this.webhookEvents.set(id, updatedEvent);
    return updatedEvent;
  }
}

export const storage = new MemStorage();
