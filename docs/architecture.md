Understood\! You want a complete rewrite of the Fullstack Architecture Document, exclusively using **AWS products**. This is a great strategic shift, leveraging the power and scalability of a single cloud provider.

I, **Winston, the Architect**, will now meticulously redesign the entire architecture document to be AWS-centric. This will involve re-evaluating the infrastructure, technology stack, deployment, and operational aspects to align with AWS services, while retaining the core functionality of your "Wheel Of Stuff" project with its Discord integration.

I will focus on a **serverless-first approach** for the backend and Discord bot where appropriate, as this generally offers good scalability and cost efficiency for event-driven applications.

Please bear with me as I compile this comprehensive AWS-focused architecture. This will take a moment.

-----

# Wheel Of Stuff Fullstack Architecture Document (AWS-Centric)

## Introduction

This document outlines the complete fullstack architecture for **Wheel Of Stuff**, leveraging exclusively **Amazon Web Services (AWS)** for all infrastructure and services. It provides a detailed blueprint for backend systems, frontend implementation, and their integration within the AWS ecosystem. Its primary goal is to serve as the guiding architectural blueprint for AI-driven development, ensuring consistency and adherence to chosen AWS patterns and technologies.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined within a single cloud provider's offerings.

### Starter Template or Existing Project

**N/A** - Greenfield project. We will establish the project structure and foundational setup from scratch, adhering to modern AWS best practices.

### Change Log

| Date       | Version | Description        | Author  |
| :--------- | :------ | :---------- | :----- |
| 2025-06-28 | 0.1     | Initial Draft (AWS) | Winston |

-----

## High Level Architecture

### Technical Summary

The "Wheel Of Stuff" system will employ a **modern AWS serverless fullstack architecture**. The frontend will be a React application hosted on AWS S3 and served via CloudFront. The backend API and Discord bot will be implemented using AWS Lambda functions triggered by API Gateway and Discord events, respectively. Persistent storage will be provided by Amazon RDS (PostgreSQL). This architecture emphasizes high scalability, low operational overhead, and cost-effectiveness inherent to serverless paradigms on AWS.

### High Level Overview

The system will operate as a **Client-Serverless architecture** with a **monorepo** structure to house frontend, backend Lambda functions, Discord bot Lambda function, and shared types. The core will consist of:

1.  A static **Web Application Frontend** deployed on AWS S3/CloudFront, providing the interactive wheel UI.
2.  A **Backend API Service** implemented as AWS Lambda functions exposed via API Gateway, responsible for item management and spin logic.
3.  A **Discord Bot** also implemented as an AWS Lambda function, interacting with the Discord API and communicating with the Backend API.
4.  An **Amazon RDS PostgreSQL** instance for persistent data storage.

The Discord bot will handle community input and commands, relaying interactions to the backend, while the web app provides the visual experience.

### High Level Project Diagram

```mermaid
graph TD
    A[User (Web)] -- HTTP(S) --> B(AWS CloudFront)
    B -- Serve Static Assets --> C(AWS S3 (Frontend Hosting))
    D[User (Discord)] -- Discord Events/Commands --> E(Discord API)

    WA(Web Application Frontend) -- HTTP(S) --> F(AWS API Gateway)
    E -- Webhooks/HTTP(S) --> F

    F -- Invokes --> G(AWS Lambda (Backend API Functions))
    F -- Invokes --> H(AWS Lambda (Discord Bot Function))

    G -- Data Access --> I[Amazon RDS (PostgreSQL)]
    H -- Data Access (optional) --> I
    H -- HTTP(S) (if needed) --> G

    H -- Sends Messages/Embeds --> E

    style A fill:#ECEC,stroke:#333,stroke-width:2px
    style D fill:#ECEC,stroke:#333,stroke-width:2px
    style C fill:#9F9,stroke:#333,stroke-width:2px
    style F fill:#ADD8E6,stroke:#333,stroke-width:2px
    style G fill:#FFD700,stroke:#333,stroke-width:2px
    style H fill:#FFD700,stroke:#333,stroke-width:2px
    style I fill:#ADD8E6,stroke:#333,stroke-width:2px
    style B fill:#F9F,stroke:#333,stroke-width:2px
    style E fill:#ADD8E6,stroke:#333,stroke-width:2px
    style WA fill:#F9F,stroke:#333,stroke-width:2px
```

### Architectural and Design Patterns

  - **Serverless Architecture (AWS Lambda, API Gateway, S3/CloudFront):** Core compute and serving are handled by managed AWS services.
      * *Rationale:* High scalability, pay-per-execution cost model, minimal operational overhead, built-in high availability.
  - **Monorepo:** Both frontend web app and backend Lambda function code, along with Discord bot Lambda function code, reside in a single repository.
      * *Rationale:* Simplifies shared code management (e.g., TypeScript types), easier dependency management, and streamlined CI/CD. Leverages tools like Serverless Framework or AWS CDK within the monorepo.
  - **RESTful API (API Gateway):** Standardized interface for communication between frontend/Discord bot Lambda and backend Lambda functions.
      * *Rationale:* Provides a single entry point, handles request routing, authorization, and rate limiting; widely understood and flexible.
  - **Repository Pattern (within Lambda functions):** Abstract data access logic within individual Lambda functions.
      * *Rationale:* Decouples business logic from data storage details, enabling easier testing and potential future database changes.
  - **Component-Based UI (React):** Modular, reusable UI components for the frontend.
      * *Rationale:* Promotes maintainability, reusability, and easier collaboration on UI development.
  - **Event-Driven (Discord Bot):** The Discord bot will primarily respond to events and commands from Discord, triggering Lambda functions.
      * *Rationale:* Natural fit for Discord's webhook/gateway model, scales well with user activity.

-----

## Tech Stack

### Cloud Infrastructure

  - **Provider:** **Amazon Web Services (AWS)**
  - **Key Services:**
      * **Frontend Hosting:** AWS S3 (for static website hosting) and Amazon CloudFront (Content Delivery Network for performance and HTTPS).
      * **Backend API:** AWS Lambda (for serverless compute) and Amazon API Gateway (for RESTful API endpoint).
      * **Database:** Amazon RDS for PostgreSQL (managed relational database).
      * **Discord Bot:** AWS Lambda (for serverless bot compute) triggered by API Gateway (for Discord Interactions Endpoint) or direct Discord Webhooks/Gateway.
      * **Identity & Access Management:** AWS IAM (for secure access and permissions).
      * **Monitoring & Logging:** Amazon CloudWatch (for logs and metrics) and AWS X-Ray (for distributed tracing).
      * **Deployment & CI/CD:** AWS CodeBuild (for builds), AWS CodePipeline (for automated pipelines), AWS CloudFormation / Serverless Framework / AWS CDK (for Infrastructure as Code).
  - **Deployment Regions:** `us-east-1` (N. Virginia) recommended for general purpose, or a region closer to your primary user base.

### Technology Stack Table

| Category           | Technology       | Version    | Purpose                                 | Rationale                                          |
| :----------------- | :--------------- | :--------- | :-------------------------------------- | :------------------------------------------------- |
| **Frontend Language** | TypeScript       | 5.x        | Type-safe frontend development          | Strong typing, excellent tooling, better maintainability |
| **Frontend Framework** | React            | 18.x       | UI Library                              | Component-based, vast ecosystem, widely adopted      |
| **UI Component Library** | Tailwind CSS     | 3.x        | Utility-first CSS framework             | Rapid UI development, highly customizable          |
| **State Management** | React Context API / Zustand | Latest   | Frontend state management               | Lightweight, scalable, and simple for this project's needs |
| **Backend Language** | TypeScript       | 5.x        | Type-safe backend Lambda functions      | Code sharing, robust, performs well in Lambda        |
| **Backend Framework** | Node.js / Express (Serverless HTTP Adapter) | Latest LTS | API Gateway compatible serverless backend | Minimal boilerplate, efficient for Lambda environment |
| **API Style** | REST             | 1.0        | Standardized API communication (via API Gateway) | Simplicity, broad tool support, managed by AWS       |
| **Database** | PostgreSQL       | 16.x       | Relational database for persistence     | Robust, open-source, good for structured data      |
| **Cache** | N/A              | N/A        | Not required for MVP                    | Keep it simple for now                             |
| **Message Queue** | N/A              | N/A        | Not required for MVP                    | Direct API calls and Lambda invocations sufficient |
| **Authentication** | N/A              | N/A        | No user auth for web app MVP            | Focus on core functionality, managed by Discord bot |
| **Frontend Testing** | Jest / React Testing Library | Latest | Frontend unit/component testing         | Standard for React, good developer experience      |
| **Backend Testing** | Jest / Supertest (for local Express server) | Latest | Backend unit/integration testing        | Standard for Node.js, adaptable for Lambda testing  |
| **E2E Testing** | Playwright       | Latest   | End-to-end testing                      | Cross-browser, robust for user flows               |
| **Build Tool** | Vite             | 5.x        | Fast build tool for React               | Fast development server, optimized builds for static sites |
| **Bundler** | Rollup (via Vite) | Latest   | JavaScript module bundler                 | Integrated into Vite, efficient                    |
| **IaC Tool** | Serverless Framework / AWS CDK | Latest | Define and deploy AWS resources         | Automates infrastructure provisioning, version control |
| **CI/CD** | GitHub Actions / AWS CodePipeline | N/A    | Automated build and deployment          | Integrates well with AWS, flexible                 |
| **Monitoring** | Amazon CloudWatch / AWS X-Ray | N/A    | Comprehensive application monitoring    | Native AWS services for logs, metrics, tracing     |
| **Logging** | CloudWatch Logs (via Lambda/EC2) | N/A    | Centralized logging                     | Managed, scalable, integrated with CloudWatch      |
| **CSS Framework** | Tailwind CSS     | 3.x        | Utility-first CSS framework             | Rapid UI development, highly customizable          |
| **Discord Bot SDK** | Discord.js       | 14.x       | Interact with Discord API               | Popular, well-maintained, feature-rich             |

-----

## Data Models

### Item

**Purpose:** Represents an individual suggestion or entry that can be selected by the wheel.

**Key Attributes:**

  - `id`: UUID - Unique identifier for the item.
  - `name`: string - The name or description of the project idea (e.g., "Build a retro platformer game").
  - `suggestedBy`: string (nullable) - Discord username of the suggester.
  - `status`: enum (`pending`, `approved`, `rejected`, `selected`) - Current moderation status and if it was selected.
  - `createdAt`: timestamp - When the item was suggested.
  - `approvedAt`: timestamp (nullable) - When the item was approved.

**TypeScript Interface:**

```typescript
interface Item {
  id: string;
  name: string;
  suggestedBy: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'selected';
  createdAt: Date;
  approvedAt: Date | null;
}
```

**Relationships:**

  - No direct relationships with other complex models within this system MVP.

-----

## Components

### Web Application Frontend (Static Assets)

**Responsibility:** Renders the interactive wheel UI, displays the list of approved items, plays the MP4 animation, and announces the selected item.

**Key Interfaces:**

  - Consumes Backend API via API Gateway for fetching approved items and initiating spins.
  - Exposes a simple UI for user interaction (Spin button).

**Dependencies:** Backend API Service.

**Technology Stack:** React, TypeScript, Vite, Tailwind CSS, deployed on AWS S3/CloudFront.

### Backend API Service (AWS Lambda Functions via API Gateway)

**Responsibility:** Manages the lifecycle of `Item` data (create, read, update status), handles the random selection logic, and exposes RESTful API endpoints. Each distinct operation (e.g., suggest, approve, spin) might be its own Lambda function.

**Key Interfaces:**

  - `POST /items/suggest`: Lambda function for Discord bot to submit new item suggestions.
  - `PUT /items/status/{id}`: Lambda function for Creator (via Discord bot command) to approve/reject items.
  - `GET /items/approved`: Lambda function for Web App to fetch approved items.
  - `POST /spin`: Lambda function for Discord bot/Web App to trigger a wheel spin and get a selected item.

**Dependencies:** Amazon RDS PostgreSQL Database.

**Technology Stack:** Node.js, Express (adapter for Lambda), TypeScript, PostgreSQL (via ORM like Prisma or Knex.js).

### Discord Bot (AWS Lambda Function)

**Responsibility:** Acts as the interface between the Discord community and the Backend API Service. Handles commands for suggesting, approving/rejecting, and spinning the wheel, then communicates results back to Discord. This will be triggered by Discord's Interaction Endpoints or Webhooks, invoking an AWS Lambda function.

**Key Interfaces:**

  - Sends HTTP requests to Backend API Gateway endpoints.
  - Receives HTTP POST requests from Discord (Interaction Endpoints/Webhooks).
  - Sends messages/embeds back to Discord API.

**Dependencies:** Backend API Service.

**Technology Stack:** Node.js, Discord.js, TypeScript.

### Amazon RDS (PostgreSQL Database)

**Responsibility:** Persistent storage for all `Item` data.

**Key Interfaces:** Accessed by the Backend API Lambda functions.

**Technology Stack:** PostgreSQL.

### Component Diagrams

```mermaid
C4Container
    title System Context Diagram for Wheel Of Stuff (AWS)

    Person(creator, "Creator", "Manages project decisions and moderates suggestions.")
    Person(community_member, "Community Member", "Suggests project ideas and observes wheel spins.")

    System_Boundary(c1, "Wheel Of Stuff System (AWS)") {
        Container(s3_cf, "AWS S3 / CloudFront", "Static Web Hosting", "Serves the Web Application Frontend assets.")
        Container(api_gw, "AWS API Gateway", "Managed REST API", "Routes API requests to Lambda functions.")
        Container(lambda_be, "AWS Lambda (Backend API)", "Node.js, TypeScript", "Serverless functions for item management & spin logic.")
        Container(lambda_bot, "AWS Lambda (Discord Bot)", "Node.js, Discord.js, TypeScript", "Serverless function for Discord command handling.")
    }

    System(discord, "Discord Platform", "Community communication platform")
    System(rds_pg, "Amazon RDS (PostgreSQL)", "Managed relational database for item data.")

    community_member -- "Submits /suggest command" --> discord
    discord -- "Routes commands / interactions" --> api_gw : HTTPS Webhook/Interactions Endpoint
    api_gw -- "Invokes Backend/Bot Logic" --> lambda_bot
    lambda_bot -- "Submits suggestions, requests approvals, triggers spins" --> api_gw : Internal HTTP
    api_gw -- "Invokes Backend API" --> lambda_be

    creator -- "Views Web App, Clicks Spin Button" --> s3_cf
    s3_cf -- "Serve HTML/JS" --> webapp_browser[Web Application (in Browser)]
    webapp_browser -- "Fetches items, triggers spin" --> api_gw : HTTPS

    lambda_be -- "Reads/Writes Item Data" --> rds_pg
    lambda_bot -- "Announces result" --> discord
    discord -- "Displays result" --> community_member
    discord -- "Displays result" --> creator
```

-----

## External APIs

### Discord API

  - **Purpose:** Enables the Discord Bot Lambda function to interact with Discord (receive commands, send messages, manage server roles/permissions if needed).
  - **Documentation:** `https://discord.com/developers/docs/intro`
  - **Base URL(s):** `https://discord.com/api/v10`
  - **Authentication:** Bot Token (Bearer Token).
  - **Rate Limits:** Standard Discord API rate limits apply (managed by `discord.js`).

**Key Endpoints Used:**

  - `POST /channels/:channel_id/messages` - Send messages (for announcements).
  - `PUT /applications/:application_id/commands` - Register slash commands.
  - `POST /interactions` - Receive and respond to Discord interactions (handled by Lambda).

**Integration Notes:** The Discord bot Lambda function will be configured as an AWS Lambda proxy integration with API Gateway to receive Discord webhook/interaction events. It will communicate with the Backend API Lambda functions via their respective API Gateway endpoints.

-----

## Core Workflows

### 1\. Suggesting and Approving an Item

```mermaid
sequenceDiagram
    participant CM as Community Member
    participant Discord as Discord Platform
    participant API_GW as AWS API Gateway
    participant Lambda_Bot as Lambda (Discord Bot)
    participant Lambda_BE as Lambda (Backend API)
    participant RDS as RDS (PostgreSQL)
    participant CR as Creator

    CM->>Discord: types /suggest "New Project Idea"
    Discord->>API_GW: POST /discord/interactions (Webhook/Interaction Endpoint)
    API_GW->>Lambda_Bot: Invokes Lambda (Discord Bot)
    Lambda_Bot->>Lambda_BE: POST /items/suggest {name: "New Project Idea", suggestedBy: "CM_User"}
    Lambda_BE->>RDS: Saves Item {status: "pending"}
    RDS-->>Lambda_BE: Item Saved
    Lambda_BE-->>Lambda_Bot: Returns {id: "item_id", status: "pending"}
    Lambda_Bot->>Discord: Responds with "Suggestion #item_id: 'New Project Idea' submitted for approval."
    Discord->>CR: Displays suggestion
    CR->>Discord: types /approve item_id
    Discord->>API_GW: POST /discord/interactions (Webhook/Interaction Endpoint)
    API_GW->>Lambda_Bot: Invokes Lambda (Discord Bot)
    Lambda_Bot->>Lambda_BE: PUT /items/status/item_id {status: "approved"}
    Lambda_BE->>RDS: Updates Item {status: "approved", approvedAt: now()}
    RDS-->>Lambda_BE: Item Updated
    Lambda_BE-->>Lambda_Bot: Returns success
    Lambda_Bot->>Discord: Responds with "Suggestion #item_id approved! Added to the wheel."
    Lambda_Bot->>Lambda_BE: (Optional) Notifies Web App to refresh list (via WebSocket or polling trigger if implemented)
```

### 2\. Spinning the Wheel and Announcing Winner

```mermaid
sequenceDiagram
    participant CR as Creator
    participant Discord as Discord Platform
    participant API_GW as AWS API Gateway
    participant Lambda_Bot as Lambda (Discord Bot)
    participant Lambda_BE as Lambda (Backend API)
    participant RDS as RDS (PostgreSQL)
    participant CF_S3 as CloudFront/S3 (Frontend)
    participant WA as Web App (in Browser)
    participant CM as Community Member

    CR->>Discord: types /spin
    Discord->>API_GW: POST /discord/interactions
    API_GW->>Lambda_Bot: Invokes Lambda (Discord Bot)
    Lambda_Bot->>Lambda_BE: POST /spin (Invokes Backend API through API Gateway)
    Lambda_BE->>RDS: Fetches all approved Items
    RDS-->>Lambda_BE: Item List
    Lambda_BE->>Lambda_BE: Randomly selects one Item
    Lambda_BE->>RDS: Updates selected Item {status: "selected"}
    RDS-->>Lambda_BE: Item Status Updated
    Lambda_BE-->>Lambda_Bot: Returns selected Item
    Lambda_Bot->>Discord: Sends "Spin initiated! Check the wheel: [WebApp URL]"
    Lambda_Bot->>Discord: Sends final announcement "The wheel landed on: [Selected Item Name]!"
    Discord->>CR: Displays announcement
    Discord->>CM: Displays announcement

    Note right of WA: User navigates to Web App URL
    WA->>CF_S3: Request index.html, JS, CSS, MP4
    CF_S3->>WA: Serves static assets
    WA->>API_GW: GET /items/approved
    API_GW->>Lambda_BE: Invokes Lambda (Backend API)
    Lambda_BE->>RDS: Fetches approved items
    RDS-->>Lambda_BE: Approved Items
    Lambda_BE-->>API_GW: Returns approved items
    API_GW-->>WA: Returns approved items
    WA->>WA: Plays MP4 animation
    WA->>WA: Displays selected Item on completion (logic based on API response from /spin)
```

-----

## Database Schema

```sql
-- Table for storing Wheel Items
CREATE TABLE IF NOT EXISTS items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    suggested_by VARCHAR(100), -- Discord username of the suggester
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'selected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP WITH TIME ZONE -- When the item was approved
);

-- Index for efficient lookup of approved items
CREATE INDEX idx_items_status ON items (status);
```

-----

## Unified Project Structure

```plaintext
wheel-of-stuff/
├── .github/                         # GitHub Actions CI/CD workflows
│   └── workflows/
│       ├── ci.yml                   # Continuous Integration (tests, linting, build)
│       └── deploy-aws.yml           # Continuous Deployment to AWS (S3, CloudFront, Lambda, API GW, RDS)
├── apps/                            # Main applications / Lambda services
│   ├── web/                         # Frontend React application
│   │   ├── public/                  # Static assets (e.g., MP4 video)
│   │   ├── src/
│   │   │   ├── assets/              # Images, fonts, other static media
│   │   │   ├── components/          # Reusable React UI components
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   ├── pages/               # React components that map to routes
│   │   │   ├── services/            # API client for backend communication
│   │   │   ├── stores/              # Frontend state management (Zustand/Context)
│   │   │   ├── styles/              # Tailwind CSS configuration and global styles
│   │   │   └── utils/               # Frontend-specific utility functions
│   │   ├── tests/                   # Frontend unit/component tests
│   │   ├── vite.config.ts           # Vite configuration
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── api-backend/                 # Backend AWS Lambda functions for API
│   │   ├── src/
│   │   │   ├── handlers/            # Individual Lambda function handlers (e.g., getItem, spinWheel)
│   │   │   ├── services/            # Business logic for item management, spin logic
│   │   │   ├── repositories/        # Data access layer (interacting with PostgreSQL)
│   │   │   ├── models/              # TypeScript types and interfaces for data models
│   │   │   ├── utils/               # Backend utility functions
│   │   │   └── app.ts               # Shared Express app for Lambda proxy integration
│   │   ├── tests/                   # Backend unit/integration tests
│   │   ├── serverless.yml           # Serverless Framework configuration for API Lambdas
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── discord-bot-lambda/          # AWS Lambda function for Discord Bot
│       ├── src/
│       │   ├── handlers/            # Lambda function handler for Discord interactions
│       │   ├── services/            # Logic for interacting with Backend API and Discord API
│       │   ├── utils/               # Bot-specific utilities
│       │   └── app.ts               # Main bot logic
│       ├── tests/                   # Bot unit tests
│       ├── serverless.yml           # Serverless Framework configuration for Discord Bot Lambda
│       ├── tsconfig.json
│       └── package.json
├── packages/                        # Shared code between apps/lambdas
│   ├── shared-types/                # TypeScript interfaces for API requests/responses, data models
│   │   ├── src/
│   │   │   └── index.ts             # Exports all shared types
│   │   └── package.json
│   ├── config/                      # Shared configuration (e.g., ESLint, Prettier)
│   │   ├── eslint-preset/
│   │   ├── prettier-config/
│   │   └── tsconfig-base/
│   └── deployment/                  # Infrastructure as Code for shared resources (e.g., RDS)
│       └── serverless-base.yml      # Base Serverless config for shared services or AWS CDK app
├── scripts/                         # Monorepo management scripts
├── docs/                            # Project documentation (PRD, Architecture, etc.)
│   ├── prd.md
│   └── fullstack-architecture.md
├── .env.example                     # Environment variables template
├── package.json                     # Root package.json with workspace definitions
├── pnpm-workspace.yaml              # pnpm workspace configuration
└── README.md                        # Project overview and setup instructions
```

-----

## Development Workflow

### Local Development Setup

**Prerequisites:**

```bash
# Node.js (LTS version, e.g., 20.x)
# pnpm (for monorepo management)
# PostgreSQL (local instance or via Docker for development)
# AWS CLI (configured with credentials)
# Serverless Framework CLI (if using Serverless Framework)
```

**Initial Setup:**

```bash
# Clone the repository
git clone [your-repo-url]
cd wheel-of-stuff

# Install root dependencies and link workspaces
pnpm install

# Setup environment variables (copy .env.example)
cp .env.example .env

# Start local PostgreSQL and run migrations
# (Specific commands depend on your database setup/ORM, e.g., `docker-compose up -d postgres`)
# (Run database migrations: e.g., `npx prisma migrate dev` if using Prisma)
```

**Development Commands:**

```bash
# Start frontend development server
pnpm run dev:web

# Start local backend API (using serverless-offline or a local Express server)
pnpm run dev:api

# Start local Discord bot (using serverless-offline or direct invocation)
pnpm run dev:bot

# Run all tests
pnpm test

# Run frontend tests
pnpm test:web

# Run backend tests
pnpm test:api

# Run E2E tests
pnpm test:e2e

# Deploy specific Lambda function locally for testing (with Serverless Framework)
# sls invoke local -f [functionName] -p event.json
```

### Environment Configuration

**Required Environment Variables:**

```bash
# Root (.env - common to all services or for local setup)
DATABASE_URL="postgresql://user:password@localhost:5432/wheel_of_stuff" # Local DB
DISCORD_BOT_TOKEN="your_discord_bot_token"
DISCORD_CLIENT_ID="your_discord_client_id"
DISCORD_PUBLIC_KEY="your_discord_public_key" # For verifying Discord interactions
API_GATEWAY_URL="https://[your-api-gateway-id].execute-api.[region].amazonaws.com/prod" # For local Lambda to Lambda calls

# Frontend (apps/web/.env.local, handled by Vite)
VITE_API_BASE_URL="https://[your-api-gateway-id].execute-api.[region].amazonaws.com/prod" # Deployed API Gateway URL

# Backend Lambda (apps/api-backend/.env or injected via Serverless/CDK)
DATABASE_URL="postgresql://user:password@rds-endpoint:5432/wheel_of_stuff" # RDS DB
DISCORD_BOT_SECRET="your_discord_bot_internal_secret" # For bot-to-backend authentication
DISCORD_PUBLIC_KEY="your_discord_public_key" # For Discord interaction verification

# Discord Bot Lambda (apps/discord-bot-lambda/.env or injected via Serverless/CDK)
DISCORD_BOT_TOKEN="your_discord_bot_token"
DISCORD_CLIENT_ID="your_discord_client_id"
DISCORD_PUBLIC_KEY="your_discord_public_key"
BACKEND_API_URL="https://[your-api-gateway-id].execute-api.[region].amazonaws.com/prod" # Backend API Gateway URL
```

-----

## Deployment Architecture

### Deployment Strategy

  - **Frontend Deployment:** The `apps/web` project will be built by **AWS CodeBuild** and deployed to an **AWS S3 bucket configured for static website hosting**. **Amazon CloudFront** will sit in front of S3 to provide a global CDN, custom domain, and HTTPS.
  - **Backend Deployment:** The `apps/api-backend` Lambda functions will be deployed via **Serverless Framework** or **AWS CDK** to **AWS Lambda** and exposed through **Amazon API Gateway**.
  - **Discord Bot Deployment:** The `apps/discord-bot-lambda` will also be deployed as an **AWS Lambda function** triggered by an **API Gateway endpoint** specifically configured to receive Discord interactions (webhooks).
  - **Database Deployment:** **Amazon RDS for PostgreSQL** will be provisioned via Serverless Framework or AWS CDK, managed by AWS.

### CI/CD Pipeline

```yaml
# Simplified example for GitHub Actions deploying to AWS
# deploy-aws.yml
name: CD to AWS

on:
  push:
    branches:
      - main

jobs:
  deploy_frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'pnpm'
    - run: pnpm install --frozen-lockfile
    - run: pnpm build:web # Build frontend
      working-directory: ./apps/web
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    - name: Deploy frontend to S3
      run: aws s3 sync ./apps/web/dist s3://your-frontend-bucket-name --delete
    - name: Invalidate CloudFront cache
      run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"

  deploy_backend:
    runs-on: ubuntu-latest
    needs: deploy_frontend # Deploy backend after frontend is built
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'pnpm'
    - run: pnpm install --frozen-lockfile
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    - name: Deploy backend Lambda functions via Serverless Framework
      run: pnpm deploy --scope=apps/api-backend # Assuming Serverless command in package.json
      env:
        # Pass environment variables needed by Serverless for deployment
        DATABASE_URL: ${{ secrets.DATABASE_URL }}
        DISCORD_BOT_SECRET: ${{ secrets.DISCORD_BOT_SECRET }}
        DISCORD_PUBLIC_KEY: ${{ secrets.DISCORD_PUBLIC_KEY }}

  deploy_bot:
    runs-on: ubuntu-latest
    needs: deploy_backend # Deploy bot after backend is ready
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'pnpm'
    - run: pnpm install --frozen-lockfile
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    - name: Deploy Discord bot Lambda function via Serverless Framework
      run: pnpm deploy --scope=apps/discord-bot-lambda # Assuming Serverless command in package.json
      env:
        DISCORD_BOT_TOKEN: ${{ secrets.DISCORD_BOT_TOKEN }}
        DISCORD_CLIENT_ID: ${{ secrets.DISCORD_CLIENT_ID }}
        DISCORD_PUBLIC_KEY: ${{ secrets.DISCORD_PUBLIC_KEY }}
        BACKEND_API_URL: ${{ steps.backend_deploy.outputs.api_gateway_url }} # Output from backend deploy job
```

### Environments

| Environment | Frontend URL                  | Backend URL                                 | Purpose                  |
| :---------- | :---------------------------- | :------------------------------------------ | :----------------------- |
| Development | `localhost:5173`              | `localhost:3000` (via `serverless-offline`) | Local development        |
| Staging     | `[cloudfront-staging-url]`    | `[api-gateway-staging-url]`                 | Pre-production testing   |
| Production  | `https://wheelofstuff.com`    | `https://api.wheelofstuff.com`              | Live environment         |

-----

## Security and Performance

### Security Requirements

**Frontend Security (AWS S3/CloudFront):**

  - **CloudFront HTTPS:** All traffic served over HTTPS.
  - **S3 Bucket Policy:** Restrict S3 bucket access to CloudFront only (Origin Access Control - OAC).
  - **CSP Headers:** Implement Content Security Policy via CloudFront response headers or web app HTML to prevent XSS.
  - **XSS Prevention:** Sanitize all user-generated content rendered on the frontend.
  - **Secure Storage:** Avoid storing sensitive user data in local storage.

**Backend Security (AWS Lambda/API Gateway/RDS):**

  - **Input Validation:** Strict validation of all incoming data in Lambda functions.
  - **API Gateway Throttling & Usage Plans:** Implement rate limiting and burst limits for API endpoints.
  - **AWS IAM Roles:** Lambda functions will execute with least-privilege IAM roles.
  - **VPC for RDS:** RDS instance will be in a private VPC subnet, accessed by Lambdas within the same VPC.
  - **Security Groups:** Configure strict security groups for RDS and Lambda VPCs.
  - **Parameter Store/Secrets Manager:** Store sensitive configuration (e.g., Discord bot token, database credentials) in AWS Systems Manager Parameter Store or AWS Secrets Manager and retrieve them at runtime.

**Authentication Security:**

  - **Discord Interactions Verification:** Lambda for Discord bot must verify requests using Discord's public key signature (X-Signature-Ed25519 and X-Signature-Timestamp headers).
  - **Bot-to-API Auth:** Use an API key/secret stored in AWS Secrets Manager for the Discord bot Lambda to authenticate with the Backend API Gateway. This can be done via API Gateway custom authorizers or Lambda function URL authorizers.
  - **No User Auth (MVP):** The web app itself won't have direct user authentication in the MVP; Discord will handle user identity for suggestions.

### Performance Optimization

**Frontend Performance (AWS S3/CloudFront):**

  - **CloudFront Caching:** Leverage CloudFront's global edge network and caching for static assets.
  - **Bundle Size Target:** Keep JavaScript bundle size optimized via Vite.
  - **Image Optimization:** Serve optimized images (e.g., WebP) via S3 and CloudFront.
  - **Lazy Loading:** Implement lazy loading for non-critical components and routes.

**Backend Performance (AWS Lambda/API Gateway/RDS):**

  - **Lambda Cold Starts:** Mitigate cold starts using provisioned concurrency for frequently accessed Lambdas if necessary.
  - **API Gateway Caching:** Enable API Gateway caching for read-heavy, less frequently changing data (e.g., list of approved items if cached for a short period).
  - **Database Optimization:** Optimize PostgreSQL queries, ensure proper indexing, consider connection pooling (e.g., Amazon RDS Proxy for Lambda).
  - **Concurrency:** Lambda automatically scales concurrency to handle load.

-----

## Testing Strategy

### Testing Pyramid

```text
               E2E Tests (Playwright)
              /         \
    Integration Tests (Backend API)   Integration Tests (Frontend UI)
   /             \     /             \
Unit Tests (Backend Lambda)   Unit Tests (Frontend React)
```

### Test Organization

**Frontend Tests:**

```text
apps/web/
├── src/
│   ├── components/
│   │   └── Button/
│   │       └── Button.test.tsx      # Unit test for Button component
│   ├── pages/
│   │   └── WheelPage/
│   │       └── WheelPage.test.tsx   # Integration test for Wheel page
└── tests/
    └── e2e/
        └── spin.spec.ts             # E2E test for the spin flow
```

**Backend Tests:**

```text
apps/api-backend/
├── src/
│   ├── handlers/
│   │   └── createItem.test.ts       # Unit test for a specific Lambda handler
│   ├── services/
│   │   └── ItemService.test.ts      # Unit test for business logic
│   ├── repositories/
│   │   └── ItemRepository.test.ts   # Unit test for data access logic
├── tests/
│   └── integration/
│       └── api.integration.test.ts # Integration test for API Gateway endpoints (using local serverless-offline)
```

**E2E Tests:**

```text
e2e/
└── tests/
    ├── web_app_flows.spec.ts        # Playwright tests for web UI interactions
    └── discord_bot_flows.spec.ts    # Playwright/custom tests for bot interactions (simulating Discord)
```

### Test Examples

**Frontend Component Test (React Testing Library/Jest):**

```typescript
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders a primary button', () => {
  render(<Button variant="primary">Click Me</Button>);
  expect(screen.getByText(/click me/i)).toHaveClass('bg-blue-500');
});
```

**Backend Lambda Handler Test (Jest):**

```typescript
// apps/api-backend/src/handlers/createItem.test.ts
import { handler } from './createItem'; // The Lambda handler
import { APIGatewayProxyEventV2 } from 'aws-lambda';

describe('createItem Lambda handler', () => {
  it('should create a new pending item', async () => {
    const event: APIGatewayProxyEventV2 = {
      // ... minimal event structure for a POST request with body
      body: JSON.stringify({ name: 'New AWS Project', suggestedBy: 'testuser' }),
      requestContext: { http: { method: 'POST', path: '/items/suggest' } } as any, // Mock relevant parts
      // ... other required event properties
    };

    const response = await handler(event);
    expect(response.statusCode).toEqual(201);
    const body = JSON.parse(response.body || '{}');
    expect(body).toHaveProperty('id');
    expect(body.name).toEqual('New AWS Project');
    expect(body.status).toEqual('pending');
  });
});
```

**E2E Test (Playwright - Conceptual for Discord bot interaction):**

```typescript
import { test, expect } from '@playwright/test';

test('discord user can suggest and creator can spin the wheel', async ({ page, request }) => {
  // Simulate Discord bot sending suggestion (via direct API Gateway call or backend API)
  const suggestResponse = await request.post('https://[your-api-gateway-id].execute-api.[region].amazonaws.com/prod/items/suggest', {
    data: { name: 'E2E AWS Test Project', suggestedBy: 'e2e_aws_user' }
  });
  const suggestedItem = await suggestResponse.json();
  expect(suggestResponse.status()).toBe(201);

  // Simulate Discord bot approving suggestion (via direct API Gateway call)
  const approveResponse = await request.put(`https://[your-api-gateway-id].execute-api.[region].amazonaws.com/prod/items/status/${suggestedItem.id}`, {
    data: { status: 'approved' }
  });
  expect(approveResponse.status()).toBe(200);

  // Navigate to web app (deployed on CloudFront URL)
  await page.goto('https://your-cloudfront-url.com');

  // Click spin button
  await page.click('button:has-text("Spin the Wheel")');

  // Wait for MP4 to finish (assuming it takes a few seconds)
  await page.waitForTimeout(5000); // Adjust based on MP4 duration

  // Assert that a selected item is displayed
  await expect(page.locator('.selected-item')).toBeVisible();
  await expect(page.locator('.selected-item')).toHaveText(suggestedItem.name);
});
```

-----

## Coding Standards

### Critical Fullstack Rules

  - **Type Sharing:** Always define shared types (e.g., `Item` interface, API request/response types) in `packages/shared-types` and import from there to ensure end-to-end type safety across frontend and Lambda functions.
  - **AWS Lambda Best Practices:** Ensure Lambda functions are stateless, idempotent, and follow the single responsibility principle. Optimize for cold starts.
  - **Environment Variables:** Access sensitive credentials and configurations from AWS Systems Manager Parameter Store or Secrets Manager in Lambda functions, not directly from environment variables in code (though values are *injected* as environment variables by the deployment tool).
  - **API Interaction:** Frontend should interact only with API Gateway endpoints. Backend Lambda functions should interact with other AWS services (RDS, S3) using AWS SDK.
  - **Error Handling:** Implement a standardized error handling mechanism within Lambda functions that returns consistent API Gateway responses, and ensure CloudWatch Logs capture full error details.
  - **Resource Tagging:** All AWS resources should be consistently tagged (e.g., `Project: WheelOfStuff`, `Environment: dev/prod`).
  - **IAM Least Privilege:** All IAM roles assigned to Lambda functions should follow the principle of least privilege, granting only the necessary permissions.

### Naming Conventions

| Element         | Frontend                  | Backend (Lambda/API)      | Example                     |
| :-------------- | :------------------------ | :------------------------ | :-------------------------- |
| Components      | `PascalCase`              | -                         | `UserProfile.tsx`           |
| Hooks           | `camelCase` with `'use'`  | -                         | `useAuth.ts`                |
| Lambda Functions | -                         | `kebab-case`              | `get-items-approved`, `spin-wheel` |
| API Gateway Paths | -                         | `kebab-case`              | `/items/suggest`, `/spin`   |
| Database Tables | -                         | `snake_case`              | `items`                     |
| Variables       | `camelCase`               | `camelCase`               | `itemName`                  |
| Functions       | `camelCase`               | `camelCase`               | `processItem()`             |
| Files           | `kebab-case`              | `kebab-case`              | `item-service.ts`           |
| Interfaces      | `PascalCase` with `I` prefix (optional) | `PascalCase`      | `IItem` or `Item`           |
| S3 Buckets      | -                         | `kebab-case` with env     | `wheel-of-stuff-frontend-prod` |
| CloudFormation Stacks | -                         | `PascalCase` with Env     | `WheelOfStuffBackendProd`   |

-----

## Error Handling Strategy

### Error Flow

```mermaid
graph TD
    A[Client Request (Web/Discord)] --> B(AWS API Gateway)
    B --> C{API Gateway Validation / Auth}
    C -->|Invalid| D[API GW Returns 4xx]
    C -->|Valid| E[Invokes Lambda Function]
    E --> F{Lambda Function Logic}
    F --> G{External AWS Service Call (e.g., RDS)}
    G -->|Service Error| H[Lambda Catches Error, Logs to CloudWatch, Formats Response]
    G -->|Success| I[Lambda Returns Success Response]
    F -->|Business Logic Error| J[Lambda Catches Error, Logs to CloudWatch, Formats Response]
    I --> K[API GW Returns Success 2xx]
    H --> K
    J --> K
    D --> K
    K --> L[Client Receives Response]
```

### Error Response Format

```typescript
interface ApiError {
  error: {
    code: string; // e.g., "VALIDATION_ERROR", "NOT_FOUND", "INTERNAL_SERVER_ERROR"
    message: string; // User-friendly message
    details?: Record<string, any>; // Optional, for validation errors or more context
    timestamp: string;
    requestId: string; // Unique ID for tracing the request, often from API Gateway
  };
}
```

### Frontend Error Handling

```typescript
// Example: Centralized error handling in a React context or hook
import React, { useState, useCallback, useContext } from 'react';

// Assume ApiError type is shared
interface ApiError { /* ... */ }

interface ErrorContextType {
  error: ApiError | null;
  setError: (err: ApiError | null) => void;
  clearError: () => void;
}

const ErrorContext = React.createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<ApiError | null>(null);
  const clearError = useCallback(() => setError(null), []);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

// Usage in a component
import { useError } from '../context/ErrorContext';
import { fetchApprovedItems } from '../services/itemService';

function WheelPage() {
  const { setError } = useError();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchApprovedItems();
        setItems(data);
      } catch (err: any) {
        // Assume API service wraps errors into ApiError format
        setError(err.response?.data || { error: { message: 'An unknown API error occurred.' } });
      }
    };
    loadItems();
  }, [setError]);

  return (
    // ... UI to display items and handle spin
    // Error can be displayed globally or where useError is used
  );
}
```

### Backend Error Handling (AWS Lambda)

```typescript
// apps/api-backend/src/utils/response.ts (for consistent API Gateway responses)
import { APIGatewayProxyResultV2 } from 'aws-lambda';

export const successResponse = (body: object, statusCode: number = 200): APIGatewayProxyResultV2 => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const errorResponse = (error: { code: string; message: string; details?: object }, statusCode: number): APIGatewayProxyResultV2 => {
  console.error('API Error:', JSON.stringify(error, null, 2)); // Log error for CloudWatch

  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      error: {
        ...error,
        timestamp: new Date().toISOString(),
        requestId: 'TODO: Implement request ID from Lambda context',
      },
    }),
  };
};

// apps/api-backend/src/handlers/getItem.ts (example handler with error handling)
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { successResponse, errorResponse } from '../utils/response';
import { ItemService } from '../services/ItemService'; // Assuming a service layer

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const items = await ItemService.getApprovedItems();
    return successResponse(items);
  } catch (error: any) {
    // Log unexpected errors for debugging
    console.error('Unhandled error in getItem handler:', error);
    if (error.name === 'NotFoundError') { // Example custom error
      return errorResponse({ code: 'NOT_FOUND', message: error.message }, 404);
    }
    return errorResponse({ code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred.' }, 500);
  }
};
```

-----

## Monitoring and Observability

### Monitoring Stack (AWS Native)

  - **Frontend Monitoring:** **Amazon CloudWatch** (for custom metrics from frontend if pushed), **CloudFront Logs** (for access patterns), and native browser developer tools. Can integrate with **Amazon Pinpoint** or **AWS Amplify Analytics** for advanced user analytics.
  - **Backend Monitoring:** **Amazon CloudWatch Metrics** (for Lambda invocations, errors, duration, API Gateway metrics), **CloudWatch Logs** (for Lambda logs), and **AWS X-Ray** (for distributed tracing across Lambda, API Gateway, and RDS).
  - **Error Tracking:** CloudWatch Logs for all Lambda functions. Can create CloudWatch Alarms on error rates or specific log patterns. Integrate with **AWS SNS** for notifications.
  - **Performance Monitoring:** CloudWatch Metrics for Lambda performance, API Gateway latency. RDS Performance Insights for database performance. X-Ray for bottleneck identification.

### Key Metrics

**Frontend Metrics:**

  - **CloudFront Access Logs:** Page views, geographic distribution, cache hit ratio.
  - **Core Web Vitals (if pushed as custom metrics):** Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), First Input Delay (FID).
  - **JavaScript errors:** (Logged via CloudWatch if integrated, or client-side monitoring).
  - **API response times:** Observed from the frontend client's perspective.

**Backend Metrics:**

  - **Lambda Invocations:** Count of times Lambda functions are triggered.
  - **Lambda Errors:** Count of errors/failures in Lambda functions.
  - **Lambda Durations:** Execution time of Lambda functions.
  - **API Gateway Latency:** End-to-end response time for API requests.
  - **RDS CPU/Memory/Connections:** Database resource utilization.
  - **RDS Read/Write IOPS:** Database I/O performance.
