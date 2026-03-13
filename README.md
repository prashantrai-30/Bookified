# Bookified

Bookified is a voice-first reading companion that turns static PDFs into interactive AI conversations.

It allows users to upload a book, process it into searchable segments, and discuss the content through a live Vapi-powered voice session.

## What Recruiters Should Know

This project demonstrates end-to-end product engineering across frontend UX, backend APIs, auth, storage, retrieval, and real-time voice interaction.

- Built with Next.js App Router and TypeScript.
- Uses Clerk for authentication and route protection.
- Upload pipeline uses Vercel Blob with secure token generation.
- PDF parsing and segmentation are done before retrieval.
- Voice sessions are tracked and persisted in MongoDB.
- Assistant responses are grounded with relevant book segments.

## Product Screenshots

### 1) Library Dashboard

Shows uploaded books and onboarding flow for new uploads.

![Bookified Library](public/assets/Screenshot%202026-03-13%20111219.png)

### 2) Add New Book Flow

Upload PDF, optional cover, metadata, and assistant voice selection.

![Bookified Upload Form](public/assets/Screenshot%202026-03-13%20111247.png)

### 3) Live Voice Interview Session

Real-time status, transcript stream, and ongoing conversation with the selected book.

![Bookified Voice Session](public/assets/Screenshot%202026-03-13%20111357.png)

## Core Features

- PDF upload with validation (file type and size).
- Optional manual cover upload, with auto cover generated from the first PDF page.
- Duplicate detection using slug-based book existence checks.
- Book text segmentation for retrieval-based responses.
- Voice persona selection for interview style.
- Real-time conversation states: `idle`, `connecting`, `starting`, `listening`, `thinking`, `speaking`.
- Transcript experience with partial and final user/assistant messages.
- Session start/end logging with duration tracking.
- Search API for Vapi tool/function calls (`searchBook`).

## How It Works

1. User signs in with Clerk.
2. User uploads a PDF from `/books/new`.
3. Client parses the PDF, creates text segments, and generates/fetches cover image.
4. Files are uploaded to Vercel Blob via `/api/upload`.
5. Book metadata and segments are stored in MongoDB.
6. User opens `/books/[slug]` and starts a voice session.
7. Vapi calls `/api/vapi/search-book` to fetch relevant segments.
8. Assistant responds using retrieved context from the uploaded book.

## System Flow Diagram

![System Flow Diagram](public/assets/system-flow-diagram.png)


## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: React 19, Tailwind CSS, shadcn/ui, Sonner
- Auth: Clerk
- Database: MongoDB + Mongoose
- File Storage: Vercel Blob
- Voice: Vapi Web SDK + ElevenLabs voices
- Validation: Zod + React Hook Form

## Key Project Structure

```text
app/
  (root)/
    page.tsx                 # Library page
    books/new/page.tsx       # Upload flow
    books/[slug]/page.tsx    # Voice interview page
  api/
    upload/route.ts          # Blob upload token generation
    vapi/search-book/route.ts

components/
  UploadForm.tsx
  VapiControls.tsx
  Transcript.tsx

hooks/
  useVapi.ts

lib/actions/
  book.actions.ts
  session.actions.ts

database/models/
  book.model.ts
  book-segment.model.ts
  voice-session.model.ts
```

## Environment Variables

Create a `.env` file in the root with:

```env
MONGODB_URI=
bookified_READ_WRITE_TOKEN=
NEXT_PUBLIC_VAPI_API_KEY=
NEXT_PUBLIC_ASSISTANT_ID=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build and Lint

```bash
npm run build
npm run lint
```

## API Endpoints

- `POST /api/upload`: Authenticated upload token flow for Vercel Blob.
- `GET /api/vapi/search-book`: Health check endpoint.
- `POST /api/vapi/search-book`: Handles Vapi tool/function calls and returns relevant book context.

## Engineering Highlights

- Clean separation of concerns between UI, hooks, server actions, and API routes.
- Defensive request parsing and validation in tool-call endpoint.
- Fallback retrieval strategy (text search first, regex fallback).
- Error-aware call lifecycle management for robust real-time UX.

## Next Improvements

- Add usage quotas and subscription limits.
- Add automated tests (unit + integration).
- Add semantic embedding search for better long-context retrieval.
- Add analytics dashboard for user reading/interview behavior.
