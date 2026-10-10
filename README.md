# FixFlow Client — Field Service Management Platform

FixFlow Client is the frontend application for **FixFlow**, a field service management platform that helps customers request home services, technicians manage assigned work, and administrators manage the platform.

This repository contains the Next.js frontend. The backend is maintained in a **separate repository** and provides the REST API, authentication, database operations, service-request workflows, and payment processing.

## 🚀 Live Demo

🔗 Live URL:

## Features

- Responsive UI for desktop, tablet, and mobile.
- Public service-category browsing.
- Login and registration pages.
- Role-based dashboards for customers, technicians, and administrators.
- Customer service-request management.
- Technician profile and work-management interfaces.
- Admin service-category management, including create, update, and delete flows.
- TanStack Query for API state, caching, and mutations.
- Form validation using the project's configured form library and validation schemas.
- Loading, empty, and error states for data-driven screens.
- Light/dark theme support where configured.
- Stripe Checkout redirect flow and payment result pages.
- Reusable UI built with Tailwind CSS, shadcn/ui, and Lucide icons.

> Feature availability depends on the current frontend and backend implementation. The backend API is the source of truth for data and permissions.

## User Roles

| Role | Frontend responsibilities |
|---|---|
| `CUSTOMER` | Create and track service requests, view eligible payment options, and access customer pages |
| `TECHNICIAN` | Maintain technician profile information and manage assigned work |
| `ADMIN` | Manage service categories, review technicians, and oversee service requests |

The frontend may hide or disable controls based on role, but the backend must enforce authorization for every protected operation.

## Tech Stack

- **Framework:** Next.js App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI components:** shadcn/ui
- **Server state:** TanStack Query
- **Icons:** Lucide React
- **Forms and validation:** Use the form library and schema validation configured in this repository
- **Notifications:** Use the toast library configured in this repository (for example, Sonner)
- **Payments:** Stripe Checkout redirect flow, connected to the backend API
- **Deployment:** Vercel or another supported Next.js hosting provider

## Backend Integration

The frontend communicates with the separate FixFlow backend through its REST API. The API handles authentication, authorization, database operations, service-request state changes, and payment verification.

- **Deployed backend:** `https://fixflow-server.vercel.app`
- **Local API documentation:** `http://localhost:5000/api-docs` when the backend is running locally on port `5000`
- **API base path:** The backend uses `/api/v1` for versioned endpoints, subject to the configured API client and deployed routes.

The backend is maintained separately. For backend setup, database migrations, API implementation, and server environment variables, refer to the backend repository's README.

### API Response Shape

The backend commonly uses a response structure similar to:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error responses may look like:

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": []
}
```

Check the API documentation for each endpoint's exact request and response schema.

## Getting Started

### Prerequisites

- Node.js version supported by this project
- npm
- Access to a running FixFlow backend API

### 1. Clone the frontend repository

```bash
git clone <https://github.com/omarFarukGit/FixFlowClient>
cd FixFlowClient
```

Replace the repository URL with the actual frontend repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` in the frontend project root.

Use the exact environment-variable name expected by the API client. For example, if the API client reads `NEXT_PUBLIC_API_URL`:

```dotenv
NEXT_PUBLIC_API_URL="https://fixflow-server.vercel.app/api/v1"
```

For local backend development, use:

```dotenv
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
```

If the project uses a different variable name, update the value using the name expected by the existing code. Do not add backend-only secrets to frontend environment variables. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

### 4. Run the development server

```bash
npm run dev
```

Open the local URL printed by Next.js, typically `http://localhost:3000`.

### 5. Create a production build

```bash
npm run build
```

Run the production build before deploying to catch TypeScript and build-time errors.

### 6. Run the production server locally

```bash
npm run start
```

Run this after a successful production build.

## Available Scripts

Check `package.json` for the exact scripts configured in this repository. Common scripts include:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run lint checks, if configured |
| `npm run format` | Format code, if configured |

## Project Structure

The current frontend is organized around the Next.js App Router and reusable components. The exact folders may differ slightly by branch.

```text
fix-flow-client/
├── public/                  # Static assets
├── src/
│   ├── app/                 # Routes, layouts, loading and error pages
│   ├── components/          # Shared UI and feature components
│   ├── hooks/               # TanStack Query and custom hooks
│   ├── lib/                 # API client and utilities
│   └── types/               # TypeScript types
├── .env.local               # Local environment variables (not committed)
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Frontend Conventions

- Prefer Server Components unless client-side state, effects, or browser interactions are needed.
- Use `"use client"` only for interactive components that require it.
- Use `next/image` for application images when appropriate.
- Keep API requests in the API-client/service layer and reuse TanStack Query hooks for server state.
- Use TypeScript types for API responses, component props, and form data; avoid `any`.
- Show loading skeletons while data is being fetched.
- Provide meaningful empty states for lists and tables.
- Handle API failures with useful messages and toast notifications.
- Use `error.tsx` boundaries to prevent page-level failures from becoming blank screens.
- Keep role-based UI consistent with backend authorization rules.
- Keep filtering, sorting, searching, and pagination in sync with URL search parameters where the page requires shareable state.
- Ensure forms display clear validation errors and support keyboard navigation.

## Payments

The frontend initiates payment by calling the backend API and redirects the customer to the Stripe Checkout URL returned by the server.

- A success page should display a clear payment-success confirmation.
- A cancellation page should explain that checkout was cancelled and provide a way to return.
- Payment history and payment details should be displayed on the appropriate payments page.
- Do not mark a payment as successful based only on the browser redirect. The backend must verify the payment through Stripe and its webhook/API.

Use Stripe test mode for development. Keep Stripe secret keys and webhook signing secrets in the backend environment, never in frontend code.

## Authentication and Route Protection

The frontend uses the authentication mechanism configured by the project and communicates with the backend for protected operations.

- Store and transmit authentication credentials according to the project's established secure cookie/token strategy.
- Redirect unauthenticated users from protected areas to login.
- Redirect authenticated users away from login and registration when required.
- Apply role-specific route checks for customer, technician, and admin pages.
- Treat frontend route guards as a user-experience layer, not a replacement for backend authorization.

## Deployment

Deploy the frontend as a separate application from the backend.

1. Import the frontend repository into Vercel or another Next.js-compatible hosting provider.
2. Configure the frontend API base URL to point to the deployed backend.
3. Add any required public environment variables in the hosting dashboard.
4. Build and deploy the application.
5. Verify authentication, role-based navigation, service requests, category management, and Stripe redirects against the production API.

### Production checklist

- [ ] Production API URL is configured correctly.
- [ ] No secret keys are included in frontend variables or source code.
- [ ] Production build completes successfully.
- [ ] Public routes and protected routes behave correctly.
- [ ] Customer, technician, and admin UI flows are tested.
- [ ] Loading, empty, and error states are checked.
- [ ] Stripe Checkout success and cancellation flows are tested.
- [ ] Mobile, tablet, and desktop layouts are verified.

## Related Repository

**FixFlow Server:** `https://fixflow-server.vercel.app/`

For backend installation, database configuration, API endpoints, migrations, Stripe webhook setup, and server deployment, use the backend repository's separate README.

# 👨‍💻 Developer

**MD Omar Faruk**

Full Stack Developer

Skills:

- Next.js
- React
- TypeScript
- Node.js
- Express.js
- Prisma
- PostgreSQL

---

# 📄 License

This project is created for educational purposes.

---

⭐ If you like this project, give it a star on GitHub.