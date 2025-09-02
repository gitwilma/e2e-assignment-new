# Studio Pilates Co — Next.js + Prisma + Cypress

A minimal full-stack app where users can book a Pilates class. The UI lets you pick a class, enter your name, and book. The backend enforces **one booking per class** (capacity = 1). End-to-end (E2E) tests verify the main user flows with Cypress.

---

## Tech Stack

- **Frontend:** Next.js (App Router), Server Actions, Tailwind CSS
- **Backend:** Prisma ORM
- **Database:** MongoDB (Atlas for dev), **in-memory Mongo** for E2E tests
- **Testing:** Cypress E2E

---

## Getting Started

### 1. Environment

Create a `.env` in the project root and set your MongoDB Atlas URL:

```bash
DATABASE_URL="mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"
```

For local development, make sure your Atlas Network Access allows your current IP.

### 2. Install

npm install

### 3. Push Prisma schema to DB

npm run push

### 4. Seed the database

npm run seed

Seeds three classes (capacity 1) and clears existing bookings.

### 5. Run the dev server

npm run dev

App is available at http://localhost:3000.

### 6. Run E2E tests

npm test

#### Cypress will:

Start Next.js on port 3100 with a fresh in-memory MongoDB (replica set) just for tests

Reseed data between tests

Execute the flows end-to-end via the browser

E2E tests do not use your Atlas database; they run against an isolated in-memory DB for determinism.

### Tested User Flows (Cypress)

#### Book available class

Select “Reformer Basic 18:00”, enter name, submit → see success message and class becomes fully booked.

#### Prevent double booking

If a class is already booked, attempting to book it again shows an error (or the class is disabled) and no new booking is created.

#### Form validation

Submit is disabled until a class is selected and the name has at least 2 characters; after fixing input, booking succeeds.

Run them with npm test.
