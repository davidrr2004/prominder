# Prominder — AI-Powered Study Planner

> An intelligent, full-stack study planning application that uses conversational AI to generate personalised timetables, track progress, and adapt schedules automatically.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Running Background Workers](#running-background-workers)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [Authentication](#authentication)
  - [Timetable](#timetable)
  - [Chatbot](#chatbot)
- [Application Pages](#application-pages)
- [Architecture Overview](#architecture-overview)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## About the Project

**Prominder** is an AI-powered study planner designed to help students organise their learning efficiently. Users define their study topics, available time slots, and upcoming exam dates. The AI then generates an optimised, prioritised study timetable via a natural-language chat interface. The system monitors progress, sends reminders, and automatically re-schedules missed sessions based on user feedback.

**Key capabilities:**

- Conversational onboarding — the chatbot collects your goals, exam dates, and preferences through friendly dialogue.
- AI timetable generation — schedules study sessions intelligently, prioritising subjects closest to their exam dates.
- Adaptive re-scheduling — if you miss a session, the system analyses your reason and splits or adjusts future sessions accordingly.
- OCR exam parsing — upload a photo of your exam timetable and the system extracts dates and subjects automatically.
- Study reminders — Celery-powered notifications remind you before each session and check in afterwards.
- Progress insights — dashboards and analytics pages track completion rates and remaining workload.

---

## Features

| Feature | Description |
|---|---|
| 🤖 Conversational AI | Chat-based interface powered by the Groq API for natural planning dialogue |
| 📅 Smart Timetable | Exam-aware scheduling algorithm fills free slots with prioritised topics |
| 🔄 Adaptive Rescheduling | Keyword-analysis of missed-session reasons drives personalised adjustments |
| 📸 OCR Parsing | Upload exam timetable images; Tesseract extracts dates and subjects |
| 🔔 Smart Reminders | Automated pre-session and post-session completion check notifications |
| 📊 Insights Dashboard | Track progress, completion rates, and upcoming workload at a glance |
| 🔐 JWT Authentication | Secure email-based login with short-lived access tokens and rotating refresh tokens |
| 🎨 Modern UI | Next.js + Tailwind CSS responsive interface with Framer Motion animations |
| 🗄️ Flexible Database | SQLite for local development; PostgreSQL for production |
| ⚙️ Background Tasks | Celery + Redis for scheduled reminders and nightly auto-rescheduling |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.0 | React framework with App Router |
| [React](https://react.dev/) | 19.2.4 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | — | Animations and transitions |
| [Lucide React](https://lucide.dev/) | 0.511.0 | Icon library |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | — | Conditional class merging |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| [Django](https://www.djangoproject.com/) | 5.2.11 | Web framework |
| [Django REST Framework](https://www.django-rest-framework.org/) | 3.16.1 | REST API |
| [SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/) | 5.5.1 | JWT authentication |
| [Celery](https://docs.celeryq.dev/) | 5.4.0 | Background task queue |
| [Redis](https://redis.io/) | 5.0.0 | Message broker and cache |
| [Groq API](https://console.groq.com/) | — | LLM-powered chatbot responses |
| [SentenceTransformers](https://www.sbert.net/) | — | Document embeddings (optional) |
| [Tesseract / pytesseract](https://github.com/madmaze/pytesseract) | — | OCR for exam timetable images |
| [Pillow](https://pillow.readthedocs.io/) | 10.3.0 | Image processing |
| [NumPy](https://numpy.org/) | 1.26.4 | ML completion model maths |
| [Gunicorn](https://gunicorn.org/) | 22.0.0 | Production WSGI server |
| [psycopg](https://www.psycopg.org/) | — | PostgreSQL driver |
| [python-dotenv](https://github.com/theskumar/python-dotenv) | — | Environment variable loading |

---

## Project Structure

```
prominder/
├── backend/                          # Django REST Framework backend
│   ├── backend/                      # Django project configuration
│   │   ├── settings.py               # Database, auth, Celery settings
│   │   ├── urls.py                   # Root URL configuration
│   │   ├── celery.py                 # Celery app configuration
│   │   ├── wsgi.py                   # Production WSGI entry point
│   │   └── asgi.py                   # ASGI entry point
│   ├── users/                        # User authentication app
│   │   ├── models.py                 # User and UserProfile models
│   │   ├── views.py                  # Register, login, password reset views
│   │   ├── serializers.py            # DRF serializers
│   │   └── urls.py                   # Auth URL routes
│   ├── timetable/                    # Study timetable app
│   │   ├── models.py                 # Topic, FreeSlot, TimetableEntry, Reminder, etc.
│   │   ├── views.py                  # Timetable CRUD and notification endpoints
│   │   ├── services.py               # Greedy scheduling algorithm
│   │   ├── notification_service.py   # Reminder and notification logic
│   │   ├── tasks.py                  # Celery periodic tasks
│   │   └── urls.py                   # Timetable URL routes
│   ├── chatbot/                      # AI chatbot app
│   │   ├── models.py                 # Conversation, Message, Document, UserModelSnapshot
│   │   ├── views.py                  # Main conversation orchestrator view
│   │   ├── services/
│   │   │   ├── timetable_generator.py    # AI-powered schedule generation
│   │   │   ├── feedback_analyzer.py      # Adaptive rescheduling logic
│   │   │   ├── ocr_pipeline.py           # Image OCR and exam date parsing
│   │   │   └── ml_completion_model.py    # ML task completion predictor
│   │   └── urls.py                   # Chatbot URL routes
│   ├── manage.py                     # Django management CLI
│   ├── requirements.txt              # Core Python dependencies
│   └── requirements-ml.txt           # Optional ML/embedding dependencies
│
├── frontend/                         # Next.js frontend
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout (fonts, metadata)
│   │   ├── signin/page.tsx           # Sign in / sign up page
│   │   ├── dashboard/page.tsx        # Main dashboard
│   │   ├── timetable/page.tsx        # Timetable view
│   │   ├── chat/page.tsx             # Chat interface
│   │   ├── insights/page.tsx         # Analytics and progress
│   │   ├── notifications/page.tsx    # Notification centre
│   │   └── settings/page.tsx         # User settings
│   ├── components/
│   │   ├── landing/                  # Landing page sections
│   │   │   ├── Navbar.tsx            # Navigation bar
│   │   │   ├── Hero.tsx              # Hero section
│   │   │   ├── Features.tsx          # Features overview
│   │   │   ├── Benefits.tsx          # Benefits section
│   │   │   ├── HowItWorks.tsx        # How it works section
│   │   │   ├── Testimonials.tsx      # Testimonials
│   │   │   ├── DemoPreview.tsx       # Product demo preview
│   │   │   ├── CTA.tsx               # Call to action
│   │   │   └── Footer.tsx            # Page footer
│   │   ├── dashboard/                # Dashboard UI components
│   │   │   ├── Sidebar.tsx           # Pill-style navigation sidebar
│   │   │   ├── TopBar.tsx            # Header bar
│   │   │   ├── MainContent.tsx       # Main content area
│   │   │   ├── RightPanel.tsx        # Right side panel
│   │   │   └── InsightsContent.tsx   # Insights content component
│   │   └── ui/                       # Shared reusable components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── label.tsx
│   ├── hooks/
│   │   └── use-signup.ts             # Sign up form state hook
│   ├── lib/
│   │   └── utils.ts                  # cn() Tailwind class merge utility
│   ├── public/                       # Static assets served by Next.js
│   ├── package.json                  # Node dependencies and scripts
│   ├── tsconfig.json                 # TypeScript configuration
│   └── next.config.ts                # Next.js configuration
│
└── assets/                           # Shared design assets
    ├── images/
    ├── icons/
    └── videos/
```

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Python** 3.10 or higher
- **Node.js** 18 or higher and **npm** 9 or higher
- **Git**
- **Redis** (required for Celery background tasks; can be skipped for basic local development)
- **Tesseract OCR** (optional, required for exam timetable image parsing)
- A free **[Groq API key](https://console.groq.com/)** (required for the AI chatbot)

---

## Getting Started

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create and activate a virtual environment
python -m venv .venv

# macOS / Linux
source .venv/bin/activate

# Windows
.venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Copy the example environment file and fill in your values
#    (see Environment Variables section below)
cp .env.example .env   # or create .env manually

# 5. Apply database migrations (uses SQLite by default for local dev)
python manage.py migrate

# 6. (Optional) Create a superuser for the Django admin panel
python manage.py createsuperuser

# 7. Start the development server
python manage.py runserver
# API available at http://127.0.0.1:8000
```

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# App available at http://localhost:3000
```

Other available scripts:

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint on the codebase |

### Running Background Workers

Celery handles scheduled reminders and nightly rescheduling. You need Redis running before starting Celery.

```bash
# Terminal 1 — Celery worker (processes notification tasks)
cd backend
celery -A backend.celery:app worker -l info

# Terminal 2 — Celery beat (triggers periodic tasks on schedule)
cd backend
celery -A backend.celery:app beat -l info
```

**Scheduled tasks:**

| Task | Schedule | Description |
|---|---|---|
| `process_notifications_and_reschedule` | Every minute | Send pre-session reminders and completion-check notifications |
| `daily_reschedule_missed_entries_task` | Daily at 00:05 UTC | Auto-reschedule stale uncompleted sessions |

---

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

### Required

```env
# Django
DJANGO_SECRET_KEY=your-strong-secret-key-here
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost

# AI
GROQ_API_KEY=your-groq-api-key-here
```

### Database (choose one approach)

**Approach A — Connection URL (recommended):**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/prominder_db
```

**Approach B — Discrete variables:**
```env
POSTGRES_DB=prominder_db
POSTGRES_USER=prominder_user
POSTGRES_PASSWORD=strong_password_here
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

> If neither is set, the backend falls back to a local SQLite database (`db.sqlite3`), which is ideal for local development.

### Optional

```env
# Celery / Redis
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/1

# Deployment (auto-set by Railway)
RAILWAY_PUBLIC_DOMAIN=your-railway-domain.up.railway.app
```

---

## API Reference

All API endpoints require a `Bearer` token in the `Authorization` header unless otherwise noted.

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register/` | ❌ | Create a new account |
| `POST` | `/api/auth/token/` | ❌ | Log in — returns access + refresh tokens |
| `POST` | `/api/auth/token/refresh/` | ❌ | Exchange a refresh token for a new access token |
| `POST` | `/api/auth/logout/` | ✅ | Invalidate the current refresh token |
| `GET` | `/api/auth/me/` | ✅ | Get the authenticated user's profile |
| `POST` | `/api/auth/password-reset/` | ❌ | Request a password-reset email |
| `POST` | `/api/auth/password-reset/confirm/<uidb64>/<token>/` | ❌ | Confirm a password reset |

**Login example:**

```json
// POST /api/auth/token/
{
  "email": "student@example.com",
  "password": "securepassword"
}

// Response 200
{
  "access": "<access_token>",
  "refresh": "<refresh_token>"
}
```

---

### Timetable

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/timetable/chatbot/` | Save topics and free slots from the chatbot onboarding flow |
| `GET` | `/api/timetable/entries/` | List all scheduled timetable entries for the current user |
| `PATCH` | `/api/timetable/entries/<id>/` | Update a timetable entry (e.g. mark as done) |
| `POST` | `/api/timetable/entries/<id>/completion-response/` | Submit post-session feedback; triggers adaptive rescheduling if missed |
| `GET` | `/api/timetable/notifications/` | List all notifications for the current user |
| `PATCH` | `/api/timetable/notifications/<id>/read/` | Mark a notification as read |

**Completion response example:**

```json
// POST /api/timetable/entries/52/completion-response/
{
  "completed": false,
  "response_text": "I was busy and had no time",
  "quiz_answer": "I only revised process scheduling"
}

// Response 200
{
  "status": "rescheduled",
  "entry_done": false,
  "strategy": {
    "action": "split_topic_into_smaller_sessions",
    "max_chunk_minutes": 30,
    "priority_boost": 2
  },
  "entries": [
    {
      "id": 88,
      "topic": "Operating Systems",
      "start": "2026-03-11T11:00:00Z",
      "end": "2026-03-11T11:30:00Z",
      "done": false
    }
  ]
}
```

---

### Chatbot

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chatbot/converse/` | Send a message or invoke a tool (see tools below) |
| `GET` | `/api/chatbot/conversations/` | List all conversation threads for the current user |
| `GET` | `/api/chatbot/conversations/<id>/messages/` | Retrieve the message history of a conversation |

The `/api/chatbot/converse/` endpoint supports the following **tools**, which are invoked automatically by the AI based on conversation context:

| Tool | Description |
|---|---|
| `onboarding` | Guides the user through setting up their profile, exam dates, and goals |
| `generate_timetable` | Creates an optimised study schedule from the user's topics and free slots |
| `ocr_exam_parser` | Accepts an uploaded image and extracts exam subjects and dates |
| `rag_chat` | Answers general study questions using the knowledge base |
| `adaptive_reschedule` | Re-plans the schedule after a missed session based on user-provided reasons |

**Basic chat example:**

```json
// POST /api/chatbot/converse/
{
  "message": "How should I prepare for Data Structures in 2 weeks?"
}

// Response 200
{
  "response": "Start with arrays and linked lists, then move to trees...",
  "tool": "rag_chat",
  "context_used": true,
  "conversation_id": 14
}
```

**Continuing a conversation:**

```json
// POST /api/chatbot/converse/
{
  "conversation_id": 14,
  "message": "Can you break this into a daily plan?"
}
```

**Adaptive reschedule (direct tool invocation):**

```json
// POST /api/chatbot/converse/
{
  "tool": "adaptive_reschedule",
  "adaptive_reschedule": {
    "entry_id": 52,
    "reason": "I was exhausted and could not concentrate"
  }
}
```

---

## Application Pages

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Marketing page with features, testimonials, and sign-up CTA |
| `/signin` | Sign In / Sign Up | Authentication form with toggle between sign-in and sign-up modes |
| `/dashboard` | Dashboard | Overview of upcoming sessions, recent activity, and quick stats |
| `/timetable` | Timetable | Full timetable view with session cards and completion controls |
| `/chat` | Chat | Conversational AI interface for planning and rescheduling |
| `/insights` | Insights | Analytics charts showing completion rates, topic progress, and exam countdowns |
| `/notifications` | Notifications | Notification centre for reminders and completion check-ins |
| `/settings` | Settings | User preferences, profile information, and account management |

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                      Browser / Client                     │
│               Next.js 16 + React 19 (TypeScript)         │
└────────────────────────────┬─────────────────────────────┘
                             │ HTTPS / REST API (JWT)
┌────────────────────────────▼─────────────────────────────┐
│              Django REST Framework (Python)               │
│  ┌──────────┐  ┌─────────────┐  ┌──────────────────────┐ │
│  │  users/  │  │ timetable/  │  │      chatbot/        │ │
│  │  (auth)  │  │ (schedule)  │  │  (AI + OCR + ML)     │ │
│  └──────────┘  └──────┬──────┘  └──────────┬───────────┘ │
└─────────────────────── │──────────────────── │────────────┘
                         │                     │
             ┌───────────▼──────┐    ┌─────────▼──────────┐
             │   PostgreSQL /   │    │    Groq LLM API     │
             │     SQLite       │    │  (chat completions) │
             └──────────────────┘    └────────────────────┘
                         │
             ┌───────────▼──────────────────────┐
             │  Celery Worker + Beat (Redis)     │
             │  • Pre-session reminders          │
             │  • Completion-check notifications │
             │  • Nightly auto-reschedule        │
             └──────────────────────────────────┘
```

---

## Database Schema

```
User (email-based custom auth)
├── UserProfile           — onboarding data: goals, exam dates, knowledge level
├── Conversation          — chat session threads
│   └── Message           — individual messages (sender: user | bot)
├── Topic                 — subjects to study (name, priority, estimated_minutes)
├── FreeSlot              — recurring available study windows
├── TimetableEntry        — scheduled study sessions (topic, start, end, done)
│   ├── Reminder          — pre-session reminder records
│   └── UserNotification  — completion-check notification records
├── ExamSubject           — parsed exam subjects with exam_date
├── Document              — RAG knowledge base documents with embeddings
├── CompletionCheck       — post-session quiz records with user responses
└── UserModelSnapshot     — persisted ML model weights for completion prediction
```

---

## Deployment

The application is designed to deploy on [Railway](https://railway.app/), but works on any platform supporting Python and Node.js.

### Backend (Railway / Gunicorn)

```bash
# Web server
gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT

# Celery worker (separate service)
celery -A backend.celery:app worker -l info

# Celery beat (separate service)
celery -A backend.celery:app beat -l info
```

Set the following environment variables in your Railway project (or equivalent):

```
DJANGO_SECRET_KEY
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=<your-domain>
DATABASE_URL=<postgresql-connection-url>
GROQ_API_KEY=<your-groq-api-key>
CELERY_BROKER_URL=<redis-url>
CELERY_RESULT_BACKEND=<redis-url>
```

After deploying, run migrations:

```bash
python manage.py migrate
```

### Frontend (Vercel / Railway)

```bash
npm run build
npm run start
```

### OCR Support (Production)

For exam timetable image parsing, install system Tesseract on your server in addition to the Python packages:

```bash
# Ubuntu / Debian
sudo apt-get install tesseract-ocr

# macOS
brew install tesseract
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes with clear, focused commits
4. Run the backend tests: `cd backend && python manage.py test`
5. Run the frontend linter: `cd frontend && npm run lint`
6. Push your branch and open a Pull Request

Please keep pull requests focused on a single feature or fix and include a clear description of the changes.
