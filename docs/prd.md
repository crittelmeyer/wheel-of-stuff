Understood! I will now run the `pm-checklist` to validate the entire Product Requirements Document. This comprehensive check will ensure the PRD is complete, consistent, and ready for the next stages of development.

Please hold for a moment while I perform this detailed analysis and compile the report.

---

# Wheel Of Stuff Product Requirements Document (PRD)

## Goals and Background Context

### Goals

* Increase community engagement and investment in project selection.
* Streamline the process of gathering and validating project ideas.
* Provide a fun, transparent, and interactive mechanism for selecting the next creative project.

### Background Context

"Wheel Of Stuff" addresses the challenge faced by project creators in effectively involving their community in the decision-making process for future projects. Currently, collecting and moderating community-sourced ideas can be unstructured and opaque, potentially leading to disengagement. This project aims to transform this process into a gamified, real-time experience, leveraging the familiar environment of Discord for submissions and approvals, and a unique web-based spinning wheel for selection and announcement.

### Change Log

| Date       | Version | Description        | Author |
| :--------- | :------ | :----------------- | :----- |
| 2025-06-28 | 0.1     | Initial Draft      | John   |

## Requirements

### Functional

* **FR1:** The web application **displays the first frame of a provided MP4 video** as the static wheel image.
* **FR2:** The web application **displays a dynamic, vertical list of approved items** alongside the wheel.
* **FR3:** The web application includes a **clickable "Spin" button** that triggers the wheel animation.
* **FR4:** Upon clicking the "Spin" button, the web application **plays the full MP4 animation** of the wheel spinning.
* **FR5:** The backend API **randomly selects one item** from the list of currently approved items when a spin is initiated.
* **FR6:** By the time the MP4 animation finishes playing, the web application **visually highlights the selected item** on the list.
* **FR7:** The Discord bot provides a `/suggest [project idea]` command, allowing community members to **submit new project ideas** to a pending queue.
* **FR8:** The Discord bot provides a creator-only `/approve [ID]` command to **change the status of a pending suggestion to "approved"**.
* **FR9:** The Discord bot provides a creator-only `/reject [ID]` command to **change the status of a pending suggestion to "rejected"**.
* **FR10:** The Discord bot provides a creator-only `/spin` command that **initiates a wheel spin** via the backend API.
* **FR11:** After a wheel spin, the Discord bot **announces the selected item** in the Discord channel where the `/spin` command was issued.
* **FR12:** The backend API provides endpoints for the Discord bot to **create, read, and update the status of items**.
* **FR13:** The backend API provides an endpoint for the web application to **retrieve all currently approved items**.
* **FR14:** All items (pending, approved, rejected, selected) are **persisted in the PostgreSQL database**.

### Non Functional

* **NFR1:** The web application's MP4 animation playback must be **smooth and responsive** across modern web browsers.
* **NFR2:** The web application and Discord bot must have **real-time or near real-time synchronization** for the item list and spin results (latency under 2 seconds).
* **NFR3:** The backend API and Discord bot must be **scalable** to handle moderate community activity (e.g., hundreds of suggestions, dozens of spins per day).
* **NFR4:** All data stored in the PostgreSQL database must be **durable and highly available**.
* **NFR5:** Communication between the Discord bot and the backend API must be **secure**, using appropriate authentication and authorization.
* **NFR6:** The backend API should enforce **rate limiting** to prevent abuse.
* **NFR7:** The solution should optimize for **cost-effectiveness** using AWS serverless components.

## User Interface Design Goals

### Overall UX Vision

The overall user experience vision for "Wheel Of Stuff" is to create a **delightful, engaging, and transparent** interactive tool. The UI will be intuitive and focused, drawing users into the gamified decision-making process. It should feel like a natural extension of the Discord community experience, blending the nostalgic 16-bit pixel art aesthetic with modern web responsiveness.

### Key Interaction Paradigms

* **Direct Interaction:** The primary interaction is the "Spin" button, leading to an immediate visual and auditory response.
* **Visual Clarity:** The selected item will be clearly highlighted and announced after the spin.
* **Real-time Feedback:** The list of items should always reflect the current approved suggestions.

### Core Screens and Views

* **Main Wheel View:** This is the primary screen displaying the static wheel image, the dynamic list of items, and the "Spin" button. It will transform visually during the spin animation and highlight the result.

### Accessibility: None

### Branding

* **16-bit Pixel Art Aesthetic:** The core visual identity will be derived directly from the provided 16-bit pixel art MP4 animation. This includes the color palette, general art style, and any visual effects for transitions or announcements.
* **Simple, Clean Typography:** To complement the pixel art without clashing, typography will be straightforward and highly legible, likely using web-safe fonts or a pixel-friendly font that doesn't distract from the main art.

### Target Device and Platforms

* **Web Responsive:** The web application will be accessible and functional across various screen sizes, from mobile browsers to large desktop displays, ensuring a consistent experience regardless of device.

## Technical Assumptions

### Repository Structure: Monorepo

The project will be organized as a **monorepo**, containing the frontend web application, the backend API Lambda functions, the Discord bot Lambda function, and shared TypeScript types. This structure facilitates code sharing and simplifies deployment orchestration within the AWS ecosystem.

### Service Architecture: Serverless Functions (AWS Lambda via API Gateway)

The core application logic will be implemented using **AWS Lambda functions** for both the backend API and the Discord bot. The backend API will be exposed via **Amazon API Gateway** as a RESTful interface, and the Discord bot will also use API Gateway for handling Discord interaction endpoints (webhooks). This approach ensures scalability, cost-effectiveness, and managed infrastructure.

### Testing requirements: Comprehensive

The project will have a comprehensive testing strategy including:
* **Unit Tests:** For individual components and functions on both frontend and backend.
* **Integration Tests:** To verify interactions between different parts of the system (e.g., API Gateway to Lambda, Lambda to RDS).
* **End-to-End (E2E) Tests:** To validate critical user and bot flows across the entire system.
* **Manual Testing:** For final visual and functional validation.

### Additional Technical Assumptions and Requests

* **Database:** **Amazon RDS for PostgreSQL** will serve as the primary relational database for persistent storage of all item data.
* **Frontend Hosting:** The web application's static assets (HTML, CSS, JavaScript, MP4 video) will be hosted on **AWS S3** and served globally via **Amazon CloudFront**.
* **MP4 Playback:** The MP4 video will be streamed from S3/CloudFront and played directly in the browser. Its `ended` event will signal completion for triggering the selection announcement. Precise frame-stopping is not required; the animation will play fully.
* **Discord Integration:** The Discord bot will communicate with Discord's API using `discord.js` within an AWS Lambda function, triggered by Discord interaction webhooks. All communication between the bot and the backend API will be via secure HTTP calls through API Gateway.
* **Security:** All secrets and sensitive configurations will be managed using **AWS Secrets Manager** or **AWS Systems Manager Parameter Store** and accessed securely by Lambda functions. IAM roles will follow the principle of least privilege.

## Epics

-   **Epic 1: Foundation & Core Discord Integration:** Establish the basic project infrastructure, deploy the core web application on AWS S3/CloudFront, set up the backend API gateway and initial Lambda function, and establish the fundamental Discord bot interaction (suggestion command). This epic will deliver a deployable, basic system where suggestions can be submitted and viewed.
-   **Epic 2: Item Moderation & Persistence:** Implement the full item moderation workflow (approve/reject suggestions) via Discord commands, establish the PostgreSQL database on RDS, and ensure all item states are persistently stored and retrieved. This epic will allow for managing the list of items for the wheel.
-   **Epic 3: Wheel Spin Logic & Web App Interaction:** Implement the random item selection logic on the backend, connect the web application's "Spin" button to trigger this logic, and ensure the web app displays the MP4 animation and visually highlights the selected item when the spin concludes. This epic will deliver the core spinning functionality.
-   **Epic 4: Discord Announcement & Final Polish:** Integrate the final announcement of the selected item back into the Discord channel via the bot. Implement any necessary UI polish, error handling improvements, and deploy the full system with CI/CD pipelines. This epic will complete the core MVP user flow.

## Epic 1: Foundation & Core Discord Integration

This epic establishes the foundational AWS infrastructure, deploys the core web application, sets up the backend API gateway and initial Lambda function, and establishes the fundamental Discord bot interaction. By the end of this epic, we will have a deployable system where community members can successfully submit project suggestions via Discord, and these suggestions can be seen in a raw form (even if unmoderated) on the web application.

### Story 1.1 Deploy Core AWS Infrastructure & Frontend Web App

As a **project creator**,
I want to **deploy the core static web application and foundational AWS infrastructure**,
so that **the basic web interface is accessible, and the environment for backend development is ready**.

#### Acceptance Criteria

* **1.1.1:** An **AWS S3 bucket** for frontend static assets is provisioned.
* **1.1.2:** An **Amazon CloudFront distribution** is configured to serve content from the S3 bucket via HTTPS, with caching enabled.
* **1.1.3:** The **Vite-based React frontend application** is successfully deployed to S3/CloudFront and is publicly accessible via a CloudFront URL.
* **1.1.4:** The web application displays the **first frame of the provided MP4 video** as the static wheel image.
* **1.1.5:** An **AWS API Gateway** instance is provisioned, ready to receive HTTP requests.
* **1.1.6:** An **initial AWS Lambda function** (e.g., a simple "hello world" or health check endpoint) is deployed and accessible via API Gateway to confirm basic backend connectivity.
* **1.1.7:** **AWS IAM roles** with least-privilege permissions are created for Lambda execution and S3/CloudFront deployment.
* **1.1.8:** A **basic CI/CD pipeline** (e.g., GitHub Actions or AWS CodePipeline/CodeBuild) is set up to automatically deploy frontend changes to S3/CloudFront upon code commits to the main branch.

### Story 1.2 Implement Item Suggestion API & Lambda

As a **Discord community member**,
I want to **submit a new project idea via a Discord command**,
so that **my suggestion is recorded and awaiting review**.

#### Acceptance Criteria

* **1.2.1:** A **`POST /items/suggest` endpoint** is implemented in the backend API (via AWS Lambda and API Gateway).
* **1.2.2:** This endpoint successfully receives **project `name` and `suggestedBy` (Discord username)** in its request body.
* **1.2.3:** Upon successful submission, the endpoint returns a **201 Created** status code and the `id` of the newly created item.
* **1.2.4:** The submitted item is stored in the database with a **`status` of `pending`**.
* **1.2.5:** Basic **input validation** is performed on the `name` and `suggestedBy` fields (e.g., non-empty strings).
* **1.2.6:** The API Gateway endpoint is configured with **rate limiting** to prevent abuse.
* **1.2.7:** **CloudWatch Logs** capture all requests and errors for this Lambda function.

### Story 1.3 Develop & Deploy Discord Bot (Suggest Command)

As a **Discord community member**,
I want to **use a Discord bot command to submit my project idea**,
so that **my idea is sent to the "Wheel Of Stuff" system for consideration**.

#### Acceptance Criteria

* **1.3.1:** A new **AWS Lambda function** is deployed to host the Discord bot logic.
* **1.3.2:** An **API Gateway endpoint** is configured as a Discord Interactions Endpoint (Webhook) to trigger the Discord bot Lambda function for incoming commands.
* **1.3.3:** The Discord bot successfully registers a **`/suggest [project idea]` slash command** within the Discord server.
* **1.3.4:** When a user executes `/suggest`, the Discord bot Lambda receives the interaction.
* **1.3.5:** The Discord bot Lambda **verifies the incoming Discord interaction** using the Discord public key signature.
* **1.3.6:** The Discord bot Lambda makes an **HTTP `POST` request to the `POST /items/suggest` backend API endpoint** with the user's suggestion.
* **1.3.7:** Upon successful submission to the backend API, the Discord bot **responds to the user in Discord** confirming the suggestion was received (e.g., "Suggestion 'X' submitted for approval.").
* **1.3.8:** Error handling is implemented, and the bot provides a user-friendly message if the submission fails (e.g., "Failed to submit. Please try again later.").
* **1.3.9:** The Discord bot's **token and Discord public key** are securely managed using AWS Secrets Manager or Parameter Store.

## Epic 2: Item Moderation & Persistence

This epic implements the full item moderation workflow (approve/reject suggestions) via Discord commands, establishes the PostgreSQL database on Amazon RDS, and ensures all item states are persistently stored and correctly retrieved by the backend API. By the end of this epic, suggested items can be fully managed (approved/rejected) and the web app will display only the approved ones.

### Story 2.1 Provision RDS PostgreSQL & Database Schema

As a **project creator**,
I want the **PostgreSQL database to be provisioned and accessible**,
so that **item data can be persistently stored and managed**.

#### Acceptance Criteria

* **2.1.1:** An **Amazon RDS for PostgreSQL instance** is provisioned within a private VPC subnet.
* **2.1.2:** A **database schema for `items` table** is created, matching the defined `Item` data model (id, name, suggestedBy, status, createdAt, approvedAt).
* **2.1.3:** An **IAM role** is created allowing the backend API Lambda functions to securely connect to the RDS instance.
* **2.1.4:** **Security Groups** are configured to allow traffic only from the backend Lambda functions' VPC to the RDS instance.
* **2.1.5:** Database connection credentials (username, password, endpoint) are securely stored in **AWS Secrets Manager** or **Parameter Store**.
* **2.1.6:** The backend API Lambda functions are configured to **connect to the RDS instance** using the secured credentials.
* **2.1.7:** Basic **database health check endpoint** is accessible via API Gateway to verify connectivity.

### Story 2.2 Implement Item Status Update API

As a **project creator**,
I want an **API endpoint to update the status of submitted items**,
so that I **can approve or reject suggestions**.

#### Acceptance Criteria

* **2.2.1:** A **`PUT /items/status/{id}` endpoint** is implemented in the backend API (via AWS Lambda and API Gateway).
* **2.2.2:** This endpoint accepts an `item id` in the path and a `status` (e.g., "approved", "rejected") in the request body.
* **2.2.3:** Upon successful update, the endpoint returns a **200 OK** status code.
* **2.2.4:** The database record for the specified `item id` is updated with the new `status`.
* **2.2.5:** If the status is set to "approved", the `approvedAt` timestamp for the item is set to the current time.
* **2.2.6:** If the `item id` does not exist, the endpoint returns a **404 Not Found** error.
* **2.2.7:** **Input validation** is performed to ensure `id` is a valid format and `status` is one of the allowed values ("approved", "rejected").

### Story 2.3 Develop Discord Bot Moderation Commands

As a **project creator**,
I want to **use Discord commands to approve or reject project suggestions**,
so that I **can manage the list of items for the wheel**.

#### Acceptance Criteria

* **2.3.1:** The Discord bot successfully registers a **creator-only `/approve [ID]` slash command** within the Discord server.
* **2.3.2:** The Discord bot successfully registers a **creator-only `/reject [ID]` slash command** within the Discord server.
* **2.3.3:** When `/approve [ID]` is used, the Discord bot Lambda makes an **HTTP `PUT` request to the `PUT /items/status/{id}` backend API endpoint** with `status: "approved"`.
* **2.3.4:** When `/reject [ID]` is used, the Discord bot Lambda makes an **HTTP `PUT` request to the `PUT /items/status/{id}` backend API endpoint** with `status: "rejected"`.
* **2.3.5:** Upon successful status update by the backend API, the Discord bot **responds to the creator in Discord** confirming the action (e.g., "Suggestion #X has been approved.").
* **2.3.6:** If the `ID` is invalid or the backend API returns an error, the bot provides a user-friendly error message in Discord (e.g., "Could not find suggestion #X or update its status.").

### Story 2.4 Display Approved Items on Web App

As a **web app user**,
I want to **see a list of only approved project ideas on the web application**,
so that I **know what items are currently on the wheel**.

#### Acceptance Criteria

* **2.4.1:** A **`GET /items/approved` endpoint** is implemented in the backend API (via AWS Lambda and API Gateway).
* **2.4.2:** This endpoint efficiently retrieves **all items from the database with a `status` of `approved`**.
* **2.4.3:** The endpoint returns a **200 OK** status code and a JSON array of approved items.
* **2.4.4:** The frontend web application is updated to **fetch and display items from the `GET /items/approved` endpoint**.
* **2.4.5:** The displayed list of items on the web app **dynamically updates** to reflect changes in approved items (e.g., by polling the API every X seconds, or ideally via WebSocket if implemented in a later epic).
* **2.4.6:** The list of items on the web application is displayed in a **clear, vertical format** as specified in the UI design goals.

## Epic 3: Wheel Spin Logic & Web App Interaction

This epic implements the random item selection logic on the backend, connects the web application's "Spin" button to trigger this logic, and ensures the web app displays the MP4 animation and visually highlights the selected item when the spin concludes. This epic delivers the central, core spinning functionality of the "Wheel Of Stuff."

### Story 3.1 Implement Random Item Selection API

As a **backend system**,
I want to **randomly select an approved item from the database**,
so that it **can be announced as the "winner" of the spin**.

#### Acceptance Criteria

* **3.1.1:** A **`POST /spin` endpoint** is implemented in the backend API (via AWS Lambda and API Gateway).
* **3.1.2:** This endpoint, when invoked, retrieves **all items with a `status` of `approved`** from the database.
* **3.1.3:** The endpoint **randomly selects one item** from the retrieved approved list.
* **3.1.4:** The `status` of the **selected item is updated to `selected`** in the database.
* **3.1.5:** Upon successful selection, the endpoint returns a **200 OK** status code and the **details of the selected item**.
* **3.1.6:** If there are no `approved` items, the endpoint returns an appropriate error (e.g., **404 Not Found** or **400 Bad Request**) with a clear message (e.g., "No approved items available to spin.").
* **3.1.7:** **CloudWatch Logs** capture the selected item's ID for traceability.

### Story 3.2 Connect Web App Spin Button & Play MP4

As a **web app user**,
I want to **click a "Spin" button and see the wheel animate**,
so that I **can initiate the project selection process**.

#### Acceptance Criteria

* **3.2.1:** The web application displays a clearly visible and clickable **"Spin" button**.
* **3.2.2:** When the "Spin" button is clicked, it makes an **HTTP `POST` request to the `POST /spin` backend API endpoint**.
* **3.2.3:** Immediately upon clicking the button, the web application starts **playing the provided 16-bit pixel art MP4 animation** from its beginning.
* **3.2.4:** The "Spin" button becomes **disabled** while the MP4 animation is playing and re-enabled when it finishes.
* **3.2.5:** The web application visually indicates a "spinning" or "in progress" state while the animation plays.
* **3.2.6:** If the API call to `/spin` fails, the web application displays a user-friendly error message.
* **3.2.7:** The MP4 video element is configured to ensure **smooth playback** without buffering issues.

### Story 3.3 Highlight Selected Item on Web App

As a **web app user**,
I want the **selected item to be clearly highlighted on the list** once the wheel animation finishes,
so that I **know which project has been chosen**.

#### Acceptance Criteria

* **3.3.1:** The web application listens for the **`ended` event of the MP4 video playback**.
* **3.3.2:** When the MP4 animation finishes playing, the web application **retrieves the selected item's details** from the response of the `POST /spin` API call.
* **3.3.3:** The web application visually **highlights the selected item on the displayed list** (e.g., with a different background color, border, or animation).
* **3.3.4:** The highlighting persists until a new spin is initiated or the page is refreshed.
* **3.3.5:** If the selected item is not found in the currently displayed list (due to a synchronization issue), the web application handles this gracefully (e.g., by displaying a message indicating the winner cannot be highlighted).

## Epic 4: Discord Announcement & Final Polish

This epic integrates the final announcement of the selected item back into the Discord channel via the bot. It also includes necessary UI polish, fundamental error handling improvements, and a basic deployment strategy for the full system to complete the core MVP user flow.

### Story 4.1 Announce Selected Item in Discord

As a **Discord community member**,
I want the **Discord bot to announce the project that was selected by the wheel**,
so that I **know which project will be taken on next**.

#### Acceptance Criteria

* **4.1.1:** After a successful spin (i.e., the `POST /spin` API call returns a selected item), the Discord bot Lambda is invoked with the selected item's details.
* **4.1.2:** The Discord bot composes a clear and concise message (e.g., "The wheel landed on: '[Selected Item Name]'! Congratulations!") for the Discord channel.
* **4.1.3:** The Discord bot successfully **sends this announcement message to the Discord channel** where the `/spin` command was originally issued.
* **4.1.4:** The announcement message is sent promptly after the wheel spin logic concludes on the backend, allowing for frontend animation to catch up visually.
* **4.1.5:** The Discord bot handles potential failures in sending the message (e.g., Discord API errors) by logging them to CloudWatch.

### Story 4.2 Frontend Polish & MP4 Optimization

As a **web app user**,
I want the **web application to look polished and perform well**,
so that I **have a pleasant and smooth experience**.

#### Acceptance Criteria

* **4.2.1:** The web application's overall layout and styling adhere to the **16-bit pixel art aesthetic** defined in the UI/UX design goals (using Tailwind CSS).
* **4.2.2:** The MP4 video file is **optimized for web playback** (e.g., appropriate bitrate, resolution, and format for streaming from S3/CloudFront).
* **4.2.3:** The list of items is **stylistically integrated** with the wheel animation area, providing a cohesive visual.
* **4.2.4:** The "Spin" button has clear **visual feedback** (e.g., hover states, disabled states) as per UI design goals.
* **4.2.5:** Basic **favicon and page title** are configured for the web application.
* **4.2.6:** The web app displays a **loading indicator** while fetching the list of approved items on initial load.
* **4.2.7:** (Optional/Stretch) If feasible without adding significant complexity, a **subtle animation or visual effect** is applied to the list items while the MP4 plays.

### Story 4.3 Implement Basic Error Handling & Logging

As a **developer/creator**,
I want the **system to handle errors gracefully and provide sufficient logging**,
so that I **can diagnose issues and ensure reliability**.

#### Acceptance Criteria

* **4.3.1:** All backend Lambda functions implement **centralized error handling** that catches unhandled exceptions and returns a consistent error response format to API Gateway.
* **4.3.2:** The Discord bot Lambda function provides user-friendly error messages in Discord for common failures (e.g., "API unavailable," "Invalid command usage").
* **4.3.3:** All Lambda functions log **key events and errors to CloudWatch Logs**.
* **4.3.4:** For critical errors, **relevant request context (e.g., request ID)** is included in the logs for traceability.
* **4.3.5:** Frontend API calls include **`try-catch` blocks** to display user-friendly error messages if backend requests fail.
* **4.3.6:** The database operations include **transactional integrity** for critical updates (e.g., marking an item as selected).

### Story 4.4 Set Up Full CI/CD & Production Deployment

As a **developer/creator**,
I want **automated deployment of the full system to production**,
so that **new features and fixes can be released reliably and efficiently**.

#### Acceptance Criteria

* **4.4.1:** A **GitHub Actions (or AWS CodePipeline/CodeBuild) workflow** is configured to build and deploy the frontend to AWS S3/CloudFront upon push to the `main` branch.
* **4.4.2:** A separate or integrated CI/CD pipeline deploys the **backend API Lambda functions and API Gateway** via Serverless Framework/AWS CDK.
* **4.4.3:** The **Discord bot Lambda function and its API Gateway endpoint** are deployed via the CI/CD pipeline.
* **4.4.4:** All environment variables for production are securely managed in **GitHub Secrets** and injected into the AWS environment (e.g., Lambda environment variables, Parameter Store).
* **4.4.5:** The CloudFront distribution is configured for **cache invalidation** upon new frontend deployments.
* **4.4.6:** All AWS resources are properly **tagged** for cost management and organization.
* **4.4.7:** A **custom domain (e.g., `wheelofstuff.com`)** is configured for the frontend CloudFront distribution and potentially for the API Gateway.
