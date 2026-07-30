# Wiki

A full-stack wiki application built with modern web technologies, focusing on simplicity, scalability, and practical architecture.

## Requirements

- **Node.js** v24 or later
- **Vercel** (deployment and Blob Storage for image uploads)
- **Postgres** (local) or **Neon Postgres** (production)
- **Clerk** account for authentication
- **Upstash Redis** (optional, for server-side caching)

> **Note:** Redis is included primarily as a learning exercise. You don't need it until your application actually benefits from server-side caching.

---

## Tech Stack

- Next.js 16
- Clerk Authentication
- Postgres / Neon Postgres
- Drizzle ORM
- Upstash Redis
- Vercel Blob Storage
- shadcn/ui

---

## Project Status

🚧 **In Progress**

---

## Notes

### Server-side vs Client-side Caching

Although both approaches reduce API requests, they solve different problems.

#### Server-side caching (Redis)

The primary goal is to reduce server and database load by avoiding repeated expensive operations.

Common use cases include:

- Caching expensive database queries
- Storing results of computationally expensive operations
- Caching responses from third-party APIs
- Tracking non-critical metrics such as page views or analytics

#### Client-side caching (TanStack Query)

The primary goal is to improve the user experience by reducing latency.

Instead of repeatedly fetching data from the server, previously fetched data is served immediately while background updates keep it fresh.

Benefits include:

- Faster page navigation
- Reduced loading states
- Fewer unnecessary network requests
- Better perceived application performance

### When to Use Redis

Redis is a good fit when you need to:

- Cache frequently accessed database queries
- Store expensive computation results
- Cache third-party API responses
- Store temporary application state
- Track counters, page views, or rate limits

Because Redis is an in-memory data store, it's best suited for data that can be regenerated if lost rather than data requiring permanent durability.
