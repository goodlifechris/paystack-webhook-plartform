# Paystack Webhook Service

A robust Node.js webhook service for receiving and processing Paystack payment events.

## Features

- **Secure Webhook Endpoint**: Validates Paystack signatures to ensure authenticity
- **Event Processing**: Handles different types of Paystack events (payments, transfers, subscriptions)
- **Dashboard UI**: Monitor webhook events through a clean dashboard interface
- **Implementation Guide**: Includes deployment guides and code samples

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn UI
- **Backend**: Node.js, Express
- **Storage**: In-memory storage (can be extended to database)
- **Logging**: Winston for comprehensive logging

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/paystack-webhook-service.git
cd paystack-webhook-service
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your Paystack secret key:
```
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

4. Start the development server
```bash
npm run dev
```

The application will be available at http://localhost:5000.

## Usage

### Configuring Paystack

1. Log in to your Paystack dashboard
2. Navigate to Settings > API Keys & Webhooks
3. Add your webhook URL: `https://your-domain.com/api/webhook/paystack`
4. Save the changes

### Supported Webhook Events

This service handles the following Paystack event types:

| Event Type | Description | Processing Action |
|------------|-------------|-------------------|
| `charge.success` | Successful payment | Records transaction, triggers success flow |
| `transfer.success` | Successful transfer | Updates transfer records, triggers notifications |
| `subscription.create` | New subscription | Creates subscription record, triggers onboarding |
| `charge.failed` | Failed payment | Records failure, triggers recovery processes |
| `invoice.update` | Invoice update | Updates invoice records, triggers notifications |

Custom event handlers can be added in `server/webhookHandlers.ts`.

### Dashboard Features

The admin dashboard provides:

- **Event Logs**: View all incoming webhook events with timestamps
- **Event Details**: Examine payload details and processing results
- **Statistics**: See success/failure rates and event distribution
- **Setup Guide**: Instructions for configuring your Paystack account

### Testing Locally

For local testing, you can use a tool like ngrok to create a public URL:

```bash
ngrok http 5000
```

Or for HTTPS testing:

```bash
# After running setup-https.sh
ngrok http https://localhost:5000
```

Add the generated URL to your Paystack dashboard webhook settings.

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/webhook/paystack` | POST | Main webhook endpoint for Paystack events |
| `/api/webhook/events` | GET | List all webhook events (paginated) |
| `/api/webhook/events/:id` | GET | Get details for a specific event |

## Deployment

The application includes deployment scripts and configurations for various platforms:

### Using the Deployment Script

Run the included deployment script for an interactive deployment process:

```bash
./deploy.sh
```

This script will guide you through deploying to:
- **Heroku**
- **Vercel**
- **Netlify**
- **GitHub Pages** (static frontend only)
- **Custom server via SSH**

### Manual Deployment Options

#### Heroku

1. Create a new Heroku app
2. Set environment variables in the Heroku dashboard
3. Deploy using Git:
   ```bash
   git push heroku main
   ```

#### GitHub Actions CI/CD

The repository includes a GitHub Actions workflow file (`.github/workflows/main.yml`) that:
1. Builds and tests the application on push to main
2. Creates deployment artifacts
3. Can deploy to various platforms (requires configuration)

To enable CI/CD:
1. Add necessary secrets to your GitHub repository
2. Uncomment the appropriate deployment section in the workflow file

#### HTTPS Setup

For local HTTPS testing (required for some Paystack features), run:

```bash
./setup-https.sh
```

This script:
1. Generates self-signed certificates
2. Configures the server to use HTTPS
3. Provides instructions for testing with external services

## Security

- Always validate the webhook signature before processing events
- Store the Paystack secret key securely using environment variables
- Implement proper error handling and logging
- Consider rate limiting to prevent potential DoS attacks

## Extending the Project

### Adding New Event Handlers

1. Open `server/webhookHandlers.ts`
2. Add a new handler function for your event type
3. Update the `processWebhook` function to call your handler

Example:

```typescript
async function handleCustomEvent(event: WebhookEvent): Promise<WebhookProcessResult> {
  try {
    // Your custom logic here
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// In the processWebhook function:
if (event.eventType === 'your.custom.event') {
  return await handleCustomEvent(event);
}
```

### Using a Database Instead of Memory Storage

The application uses in-memory storage by default. To use a database:

1. Update the storage implementation in `server/storage.ts`
2. Implement the `IStorage` interface with your database of choice
3. Install necessary dependencies

Example for PostgreSQL:

```typescript
import { Pool } from 'pg';

export class PostgresStorage implements IStorage {
  private pool: Pool;
  
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
  }
  
  // Implement interface methods...
}
```

### Adding Authentication

To add user authentication to the dashboard:

1. Configure Passport.js (already included in dependencies)
2. Create login/register routes
3. Add authentication middleware to protected routes

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.