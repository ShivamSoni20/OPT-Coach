# OPT Coach

OPT Coach helps service businesses turn scattered tribal knowledge into a structured, AI-ready Company Brain. It guides a founder or operator through a short coaching flow, then generates clean markdown files, a shareable read-only page, and a public JSON endpoint that teams or AI agents can reuse.

Built for the OpenAI x Outskill Hackathon.

## What It Does

- Captures business context through a guided 5-question coaching flow.
- Generates `KNOWLEDGE.md`, `PROCESSES.md`, and `JUDGMENT.md`.
- Stores sessions and generated brains in Supabase Postgres.
- Provides a read-only share page for teammates.
- Exposes a JSON API endpoint for each generated Company Brain.
- Tracks page visits with Vercel Analytics.

## Core Flow

1. User opens the landing page.
2. User enters business name and selects business type.
3. OPT Coach starts a structured AI coaching session.
4. User answers 5 focused questions about operations, workflows, approvals, and hidden judgment.
5. The app generates a Company Brain.
6. The user can view markdown files, share the read-only page, or open the raw JSON API.

## Tech Stack

- Next.js 14 App Router
- React 18
- Tailwind CSS
- AIML API through an OpenAI-compatible client
- Supabase Postgres
- Vercel Analytics
- Vercel-ready deployment

## Project Structure

```txt
app/
  api/
    chat/              AI coach endpoint
    generate/          Company Brain generation endpoint
  brain/[id]/          Brain dashboard, share view, and JSON endpoint
  coach/               Guided coaching UI
  onboard/             Business setup flow
  page.tsx             Landing page

components/
  brain/               Brain tabs, code viewer, share controls
  coach/               Chat UI and progress components
  ui/                  Shared shell and buttons

lib/
  ai.ts                AIML/OpenAI-compatible client setup
  brain-generator.ts   Brain generation and output normalization
  kv.ts                Supabase-backed storage adapter
  prompts.ts           Coach and generation prompts
  supabase.ts          Supabase clients
  types.ts             Shared TypeScript types

supabase/
  migrations/          Database schema
```

## Environment Variables

Create `.env.local` in the project root.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

AIML_API_KEY=
AIML_API_BASE_URL=https://api.aimlapi.com/v1
AIML_MODEL=openai/gpt-4o-mini

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Notes

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are public client values from Supabase.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only. Never commit it or expose it in client code.
- `AIML_MODEL` is set to `openai/gpt-4o-mini` because it was verified working during local testing.
- Set `NEXT_PUBLIC_APP_URL` to your production Vercel URL after deployment.

## Database Setup

Apply the initial Supabase schema from:

```txt
supabase/migrations/001_initial_schema.sql
```

The migration creates:

- `sessions` for active coaching sessions.
- `brains` for generated Company Brain records.
- expiry indexes for cleanup support.
- RLS policies for public brain reads and server-side writes.

After applying the migration, verify the tables exist in Supabase:

```sql
SELECT id, business_name, status, questions_answered
FROM sessions
ORDER BY created_at DESC
LIMIT 5;
```

```sql
SELECT id, business_name, business_type, session_duration
FROM brains
ORDER BY generated_at DESC
LIMIT 5;
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Testing Checklist

- Landing page loads.
- Onboarding captures business name and type.
- Coach asks the first question automatically.
- Chat replies stream correctly.
- The 5-question flow completes.
- Brain generation redirects to `/brain/[id]`.
- `KNOWLEDGE.md`, `PROCESSES.md`, and `JUDGMENT.md` are populated.
- Share page works at `/brain/[id]/share`.
- API endpoint works at `/brain/[id]/api`.
- Supabase receives rows in `sessions` and `brains`.

## Deployment To Vercel

1. Push the repository to GitHub.
2. Import the repository in the Vercel dashboard.
3. Select the default Next.js settings.
4. Add all environment variables in Vercel Project Settings.
5. Deploy the project.
6. Copy the production URL.
7. Update `NEXT_PUBLIC_APP_URL` in Vercel to the production URL.
8. Redeploy.

## Vercel Analytics

Vercel Analytics is already installed and mounted in `app/layout.tsx`.

After deployment:

1. Visit the production site.
2. Navigate between a few pages.
3. Open the Vercel project dashboard.
4. Check the Analytics tab after a short delay.

## Production Readiness Notes

- Rotate any service role key that was ever pasted into chat or logs.
- Keep `.env.local` out of Git.
- Confirm Supabase RLS policies before public launch.
- Use the verified AIML model in production.
- Run a full end-to-end test after every deployment.

## License

This project is currently private and created for hackathon MVP development.
