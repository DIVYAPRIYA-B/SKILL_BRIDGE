# SkillBridge AI

### AI-Powered Rural Skill, Internship & Industry Empowerment Platform

**"From Learning to Livelihood."**

SkillBridge AI connects underserved students from rural and underserved communities with personalized learning, career guidance, mentors, and real industry opportunities — powered by a local mock AI engine that works without any external API keys.

Built for the **AI for Public Good** hackathon theme: *Inclusive AI, Social Impact and Empowerment of Underserved Communities*.

---

## Features

- **Three role-based dashboards** — Student, Industry, and Admin
- **AI Career Assistant** — local mock AI engine with Tamil/English support
- **AI Skill Gap Analyzer** — animated skill breakdown with career readiness score
- **Personalized Learning Roadmap** — 6-week plans with progress tracking
- **Internship Discovery** — search and multi-filter (location, role, stipend, remote, duration, skill)
- **Top 10 AI Recommendations** — consistent match scoring based on profile data
- **Application System** — apply, track status timeline, prevent duplicates
- **AI Resume Assistant** — resume score, AI recommendations, editable sections
- **Mentor Connect** — filter mentors and request mentorship
- **Industry Portal** — post internships, view applications, shortlist, schedule interviews
- **Admin Dashboard** — platform analytics with Recharts visualizations
- **Multilingual** — English and Tamil (தமிழ்) with local translation dictionary
- **Accessibility** — normal, large text, and high contrast modes
- **Low Bandwidth Mode** — disables animations for limited connectivity
- **LocalStorage persistence** — all data survives page reloads

---

## Demo Accounts

| Role      | Email                     | Password    |
|-----------|---------------------------|-------------|
| Student   | student@skillbridge.demo  | student123  |
| Industry  | company@skillbridge.demo  | company123  |
| Admin     | admin@skillbridge.demo    | admin123    |

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool and dev server
- **Tailwind CSS** — styling
- **React Router** — routing
- **Lucide React** — icons
- **Recharts** — charts and analytics
- **LocalStorage** — demo data persistence (no backend required)

---

## Prerequisites

- **Node.js** 18 or higher
- **npm** (comes with Node.js)

Check your versions:

```bash
node --version
npm --version
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 3. Build for production

```bash
npm run build
```

The optimized output will be in the `dist/` folder.

### 4. Preview the production build

```bash
npm run preview
```

### 5. Type checking

```bash
npm run typecheck
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Sidebar, DashboardLayout
│   ├── ui/              # Reusable UI components (Modal, Toast, cards, etc.)
│   ├── ErrorBoundary.tsx
│   └── ProtectedRoute.tsx
├── context/
│   └── AppContext.tsx   # Global state: auth, data, language, accessibility
├── data/
│   └── demoData.ts      # Seeded demo data (students, internships, mentors, etc.)
├── lib/
│   ├── i18n.ts          # English/Tamil translation dictionary
│   ├── mockAI.ts        # Local mock AI engine (no API key needed)
│   └── storage.ts       # LocalStorage wrapper with in-memory fallback
├── pages/
│   ├── admin/           # Admin dashboard and management pages
│   ├── industry/        # Industry portal pages
│   ├── student/         # Student dashboard and all feature pages
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Onboarding.tsx
│   └── NotFound.tsx
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
└── index.css           # Global styles and Tailwind config
```

---

## Demo Flow (for judges)

1. **Login as Student** using `student@skillbridge.demo` / `student123`
2. Explore the **Dashboard** — view career readiness and stats
3. Open **AI Assistant** — ask "What skills should I learn for Java?"
4. Open **Skill Gap Analyzer** — select "Java Developer" and generate analysis
5. Click **Generate Learning Roadmap** — view the 6-week plan
6. Open **Top 10 Opportunities** — see AI-ranked internships
7. Click any internship → **View Details** → **Apply Now**
8. Open **Applications** — track your application status
9. Open **Mentors** — filter and request mentorship
10. **Logout** and **Login as Industry** using `company@skillbridge.demo` / `company123`
11. View **Applications** → shortlist a candidate → schedule an interview
12. **Logout** and **Login as Admin** using `admin@skillbridge.demo` / `admin123`
13. View **Dashboard** and **Analytics** for platform-wide impact metrics

---

## Notes

- All data is stored in LocalStorage. Use **Admin → Settings → Reset Demo Data** to restore the initial state.
- The mock AI engine produces realistic responses based on keywords — no API key or internet connection required.
- The app works fully offline once loaded.
