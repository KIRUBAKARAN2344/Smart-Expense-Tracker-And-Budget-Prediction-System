# Smart-Expense-Tracker-And-Budget-Prediction-System
================================================================================
       PRODUCT REQUIREMENTS DOCUMENT (PRD)
       Smart Expense Tracker And Budget Prediction System
================================================================================
TABLE OF CONTENTS
================================================================================

  1. Executive Summary
  2. Product Overview
  3. Goals & Objectives
  4. Target Users & Personas
  5. Scope
  6. System Architecture Overview
  7. Frontend Specifications
  8. Backend Specifications
  9. Database Specifications
 10. API Design
 11. Functional Requirements
 12. Non-Functional Requirements
 13. Security Requirements
 14. Tech Stack Summary
 15. Data Flow Diagram
 16. Milestones & Timeline
 17. Risks & Mitigations
 18. Glossary

================================================================================
1. EXECUTIVE SUMMARY
================================================================================

The Smart Expense Tracker And Budget Prediction System is a full-stack personal
finance management platform that empowers users to log, categorize, and analyze
their daily expenses while leveraging AI-driven budget prediction models to
forecast future spending patterns. The system provides real-time dashboards,
intelligent alerts, and actionable financial insights through an intuitive web
and mobile-responsive interface.

This document defines all product requirements — covering frontend, backend,
and database layers exclusively — to guide the engineering and design teams
toward a consistent, scalable, and production-ready build.

================================================================================
2. PRODUCT OVERVIEW
================================================================================

Product Name     : Smart Expense Tracker And Budget Prediction System
Short Name       : SETBPS
Type             : Web Application (Mobile-Responsive)
Core Value       : Automated expense intelligence + predictive budgeting
Primary Platform : Browser (Desktop & Mobile Responsive)

Key Capabilities:
  - Manual & automated expense entry
  - Smart categorization using ML classification
  - Monthly / weekly budget goal setting
  - AI-powered budget prediction (next 30 / 60 / 90 days)
  - Visual analytics dashboard (charts, trends, summaries)
  - Recurring expense detection
  - Export reports (CSV / PDF)
  - Multi-currency support
  - Notification & alert engine

================================================================================
3. GOALS & OBJECTIVES
================================================================================

Business Goals:
  BG-01  Provide users a single platform for all personal finance tracking.
  BG-02  Reduce financial anxiety through predictive forecasting and alerts.
  BG-03  Drive engagement via personalized spending insights.

Product Goals:
  PG-01  Enable expense logging in under 10 seconds per entry.
  PG-02  Achieve budget prediction accuracy of >= 85% for 30-day forecasts.
  PG-03  Support up to 10,000 concurrent users at launch.
  PG-04  Deliver sub-2-second page load times on standard broadband.

Technical Goals:
  TG-01  Build a decoupled frontend/backend architecture for independent scaling.
  TG-02  Implement RESTful + WebSocket APIs for real-time updates.
  TG-03  Ensure data persistence and recovery with automated DB backups.
  TG-04  Maintain 99.9% system uptime SLA.

================================================================================
4. TARGET USERS & PERSONAS
================================================================================

Persona 1 — The Salaried Professional (Primary)
  Name         : Arjun, 28
  Goal         : Track monthly salary spending, avoid overspending
  Pain Point   : Loses track of small daily purchases
  Usage        : Daily expense entry, weekly review, monthly budget check

Persona 2 — The Freelancer (Secondary)
  Name         : Meera, 32
  Goal         : Manage irregular income vs. variable expenses
  Pain Point   : Unpredictable cash flow, multiple income sources
  Usage        : Income logging, category analysis, cash-flow forecasting

Persona 3 — The Student (Tertiary)
  Name         : Ravi, 21
  Goal         : Stay within a fixed monthly allowance
  Pain Point   : Tends to overspend on food and entertainment
  Usage        : Budget goal setting, alert notifications, simple dashboard

================================================================================
5. SCOPE
================================================================================

IN SCOPE:
  - User authentication & profile management
  - Expense CRUD (Create, Read, Update, Delete)
  - Income entry & tracking
  - Category management (system-defined + user-defined)
  - Budget goal setup per category and overall
  - AI/ML budget prediction module
  - Interactive analytics dashboard
  - Notification & alert system (in-app + email)
  - Multi-currency handling
  - Data export (CSV, PDF)
  - Frontend UI (Web, Mobile-Responsive)
  - RESTful Backend API
  - Relational + NoSQL Database layer

OUT OF SCOPE (v1.0):
  - Native mobile apps (iOS / Android)
  - Bank account / UPI integration
  - Investment tracking
  - Tax filing modules
  - Third-party payment processing

================================================================================
6. SYSTEM ARCHITECTURE OVERVIEW
================================================================================

The system follows a 3-tier architecture:

  +---------------------------+
  |       FRONTEND LAYER      |   React.js SPA (Mobile-Responsive)
  |  (Client Browser / PWA)   |
  +---------------------------+
               |
         REST API / WebSocket
               |
  +---------------------------+
  |       BACKEND LAYER       |   Node.js + Express.js
  |   (API Server + ML Engine)|   Python FastAPI (Prediction Service)
  +---------------------------+
               |
  +---------------------------+
  |       DATABASE LAYER      |   PostgreSQL (Primary)
  |                           |   MongoDB (Analytics/Logs)
  |                           |   Redis (Cache/Sessions)
  +---------------------------+

Communication:
  - Frontend <-> Backend   : HTTPS REST API + WebSocket (Socket.IO)
  - Backend  <-> Database  : Sequelize ORM (PostgreSQL), Mongoose (MongoDB)
  - Backend  <-> Cache     : ioredis
  - Prediction Service     : Internal HTTP (FastAPI microservice on port 8001)

================================================================================
7. FRONTEND SPECIFICATIONS
================================================================================

7.1 Technology Stack
--------------------
  Framework       : React.js 18 (with Hooks & Context API)
  Build Tool      : Vite
  Styling         : Tailwind CSS + shadcn/ui component library
  State Mgmt      : Zustand (global state) + React Query (server state)
  Charts          : Recharts + Chart.js
  Form Handling   : React Hook Form + Zod (validation)
  Routing         : React Router v6
  HTTP Client     : Axios (with interceptors for auth tokens)
  WebSocket       : Socket.IO Client
  Date Handling   : date-fns
  Currency        : currency.js
  Export          : jsPDF + PapaParse (CSV)
  PWA             : Vite PWA Plugin (service worker, offline support)

7.2 Pages & Screens
-------------------

  PAGE                     ROUTE                    DESCRIPTION
  -----------------------------------------------------------------------
  Landing / Login          /                        Auth entry point
  Register                 /register                New user signup
  Dashboard                /dashboard               Main analytics overview
  Expense List             /expenses                All expenses with filters
  Add Expense              /expenses/new            Quick expense entry form
  Edit Expense             /expenses/:id/edit       Edit an existing entry
  Income                   /income                  Income entries list
  Add Income               /income/new              Add income entry
  Budget Goals             /budget                  Set and view budget goals
  Predictions              /predictions             AI budget forecast view
  Categories               /categories              Manage expense categories
  Reports                  /reports                 Generate and export reports
  Notifications            /notifications           Alert history and settings
  Settings                 /settings                Profile, currency, preferences
  404 Not Found            *                        Error boundary page

7.3 Component Architecture
---------------------------

  src/
  ├── components/
  │   ├── layout/
  │   │   ├── Navbar.jsx
  │   │   ├── Sidebar.jsx
  │   │   ├── Footer.jsx
  │   │   └── PageWrapper.jsx
  │   ├── dashboard/
  │   │   ├── SummaryCard.jsx        (Total spent, income, balance)
  │   │   ├── SpendingTrendChart.jsx  (Line chart - daily/weekly/monthly)
  │   │   ├── CategoryPieChart.jsx    (Donut chart by category)
  │   │   ├── BudgetProgressBar.jsx   (Per-category budget usage)
  │   │   ├── RecentTransactions.jsx  (Last 5 entries)
  │   │   └── PredictionWidget.jsx    (Next 30-day forecast card)
  │   ├── expenses/
  │   │   ├── ExpenseForm.jsx
  │   │   ├── ExpenseTable.jsx
  │   │   ├── ExpenseFilters.jsx
  │   │   └── ExpenseCard.jsx (mobile)
  │   ├── budget/
  │   │   ├── BudgetGoalForm.jsx
  │   │   ├── BudgetOverview.jsx
  │   │   └── CategoryBudgetRow.jsx
  │   ├── predictions/
  │   │   ├── ForecastChart.jsx
  │   │   ├── PredictionInsight.jsx
  │   │   └── SpendingAlert.jsx
  │   ├── reports/
  │   │   ├── ReportFilters.jsx
  │   │   ├── ReportTable.jsx
  │   │   └── ExportButtons.jsx
  │   └── common/
  │       ├── Modal.jsx
  │       ├── Loader.jsx
  │       ├── Toast.jsx
  │       ├── Badge.jsx
  │       ├── EmptyState.jsx
  │       └── ConfirmDialog.jsx
  ├── pages/
  │   ├── DashboardPage.jsx
  │   ├── ExpensesPage.jsx
  │   ├── BudgetPage.jsx
  │   ├── PredictionsPage.jsx
  │   ├── ReportsPage.jsx
  │   └── SettingsPage.jsx
  ├── hooks/
  │   ├── useAuth.js
  │   ├── useExpenses.js
  │   ├── useBudget.js
  │   ├── usePredictions.js
  │   └── useNotifications.js
  ├── store/
  │   ├── authStore.js
  │   ├── expenseStore.js
  │   └── uiStore.js
  ├── services/
  │   ├── api.js              (Axios instance + interceptors)
  │   ├── expenseService.js
  │   ├── budgetService.js
  │   ├── predictionService.js
  │   └── reportService.js
  ├── utils/
  │   ├── formatCurrency.js
  │   ├── formatDate.js
  │   ├── categoryColors.js
  │   └── validators.js
  └── assets/
      ├── icons/
      └── images/

7.4 Dashboard UI Specifications
---------------------------------

  Top Row — Summary Cards (4 cards):
    Card 1 : Total Expenses This Month  (with % change vs last month)
    Card 2 : Total Income This Month
    Card 3 : Net Balance (Income - Expenses)
    Card 4 : Budget Used % (overall budget utilization)

  Middle Row — Charts:
    Chart 1 : Spending Trend Line Chart (last 30 days, daily breakdown)
    Chart 2 : Category Donut Chart (% by category for current month)

  Bottom Row:
    Left  : Budget Progress (bar per category, color-coded: green/yellow/red)
    Right : Recent Transactions (last 5, with category icon + amount)

  Floating Widget : AI Prediction Banner
    "Based on your spending, you are predicted to spend ₹X this month.
     You are Y% over/under your budget goal."

7.5 Expense Entry Form Fields
-------------------------------

  Field             Type          Required   Validation
  -----------------------------------------------------------
  Amount            Number        Yes        > 0, max 10,000,000
  Currency          Select        Yes        ISO 4217 code list
  Category          Select        Yes        From categories list
  Description       Text          No         Max 255 characters
  Date              Date Picker   Yes        <= Today
  Payment Method    Select        No         Cash/Card/UPI/Bank Transfer
  Is Recurring      Toggle        No         Default: false
  Recurrence Type   Select        If Toggle  Daily/Weekly/Monthly
  Notes             Textarea      No         Max 500 characters
  Attachment        File Upload   No         JPG/PNG/PDF, max 5MB (receipt)

7.6 Responsive Design Breakpoints
-----------------------------------

  Breakpoint    Width         Layout
  ------------------------------------------
  xs            < 480px       Single column, bottom nav
  sm            480–768px     Single column, bottom nav
  md            768–1024px    2 columns, side nav (collapsible)
  lg            1024–1280px   2–3 columns, full side nav
  xl            > 1280px      3 columns, full side nav, wide charts

7.7 Color Theme & Design System
----------------------------------

  Primary Color        : #6366F1  (Indigo)
  Secondary Color      : #22D3EE  (Cyan)
  Success              : #22C55E  (Green)
  Warning              : #F59E0B  (Amber)
  Danger               : #EF4444  (Red)
  Background (Light)   : #F9FAFB
  Background (Dark)    : #111827
  Text Primary         : #111827
  Text Secondary       : #6B7280
  Card Background      : #FFFFFF / #1F2937 (dark mode)
  Font                 : Inter (sans-serif), monospace for amounts

  Dark Mode            : Supported via Tailwind dark: classes
  Theme Toggle         : Stored in localStorage and user preferences

================================================================================
8. BACKEND SPECIFICATIONS
================================================================================

8.1 Technology Stack
---------------------

  Runtime             : Node.js 20 LTS
  Framework           : Express.js 4.x
  Language            : JavaScript (ES2022) / TypeScript (optional)
  ORM                 : Sequelize v6 (PostgreSQL)
  ODM                 : Mongoose v7 (MongoDB)
  Cache Client        : ioredis
  Auth                : JWT (access token: 15min, refresh token: 7 days)
  Password Hashing    : bcrypt (rounds: 12)
  Validation          : Joi / express-validator
  File Upload         : Multer + AWS S3 (or local storage for dev)
  Email               : Nodemailer + SendGrid
  Scheduler           : node-cron (recurring expense processing)
  Logging             : Winston + Morgan
  Testing             : Jest + Supertest
  Documentation       : Swagger (OpenAPI 3.0)

  Prediction Microservice:
  Runtime             : Python 3.11
  Framework           : FastAPI
  ML Libraries        : scikit-learn, Prophet (by Meta), pandas, numpy
  Model Storage       : Joblib (serialized models per user)
  Communication       : HTTP REST (called by Node.js backend)

8.2 Folder Structure
----------------------

  server/
  ├── src/
  │   ├── config/
  │   │   ├── db.js              (PostgreSQL + MongoDB connections)
  │   │   ├── redis.js
  │   │   ├── env.js             (dotenv + validation)
  │   │   └── swagger.js
  │   ├── controllers/
  │   │   ├── authController.js
  │   │   ├── userController.js
  │   │   ├── expenseController.js
  │   │   ├── incomeController.js
  │   │   ├── budgetController.js
  │   │   ├── categoryController.js
  │   │   ├── predictionController.js
  │   │   ├── reportController.js
  │   │   └── notificationController.js
  │   ├── models/
  │   │   ├── postgres/
  │   │   │   ├── User.js
  │   │   │   ├── Expense.js
  │   │   │   ├── Income.js
  │   │   │   ├── Budget.js
  │   │   │   ├── Category.js
  │   │   │   └── RecurringExpense.js
  │   │   └── mongo/
  │   │       ├── AnalyticsEvent.js
  │   │       ├── NotificationLog.js
  │   │       └── PredictionResult.js
  │   ├── routes/
  │   │   ├── auth.routes.js
  │   │   ├── user.routes.js
  │   │   ├── expense.routes.js
  │   │   ├── income.routes.js
  │   │   ├── budget.routes.js
  │   │   ├── category.routes.js
  │   │   ├── prediction.routes.js
  │   │   ├── report.routes.js
  │   │   └── notification.routes.js
  │   ├── middleware/
  │   │   ├── authenticate.js    (JWT verification)
  │   │   ├── authorize.js       (Role-based access)
  │   │   ├── rateLimiter.js
  │   │   ├── errorHandler.js
  │   │   ├── requestLogger.js
  │   │   └── validate.js
  │   ├── services/
  │   │   ├── authService.js
  │   │   ├── expenseService.js
  │   │   ├── budgetService.js
  │   │   ├── predictionService.js   (calls FastAPI microservice)
  │   │   ├── notificationService.js
  │   │   ├── reportService.js
  │   │   ├── currencyService.js     (exchange rate fetching)
  │   │   └── recurringService.js    (cron job logic)
  │   ├── utils/
  │   │   ├── jwt.js
  │   │   ├── email.js
  │   │   ├── formatResponse.js
  │   │   └── pagination.js
  │   └── app.js                 (Express app setup)
  ├── prediction_service/        (Python FastAPI microservice)
  │   ├── main.py
  │   ├── models/
  │   │   ├── prophet_model.py
  │   │   └── linear_model.py
  │   ├── routes/
  │   │   └── predict.py
  │   ├── utils/
  │   │   ├── preprocess.py
  │   │   └── feature_engineering.py
  │   └── requirements.txt
  ├── migrations/                (Sequelize migrations)
  ├── seeders/                   (Default categories, test data)
  ├── tests/
  ├── .env.example
  └── server.js                  (Entry point)

8.3 Authentication Flow
-------------------------

  REGISTRATION:
    1. POST /api/auth/register
    2. Validate email + password
    3. Hash password with bcrypt
    4. Create User record in PostgreSQL
    5. Send email verification link
    6. Return 201 with user profile (no token yet)

  LOGIN:
    1. POST /api/auth/login
    2. Verify credentials
    3. Generate accessToken (JWT, 15 min) + refreshToken (JWT, 7 days)
    4. Store refreshToken hash in Redis (key: userId)
    5. Set refreshToken in HTTP-only cookie
    6. Return accessToken in response body

  TOKEN REFRESH:
    1. POST /api/auth/refresh
    2. Read refreshToken from cookie
    3. Validate against Redis store
    4. Issue new accessToken
    5. Rotate refreshToken (old invalidated)

  LOGOUT:
    1. POST /api/auth/logout
    2. Delete refreshToken from Redis
    3. Clear cookie

8.4 Budget Prediction Engine (Python FastAPI)
----------------------------------------------

  Endpoint            : POST /predict
  Input               :
    {
      "user_id"       : "uuid",
      "expenses"      : [ { "date": "YYYY-MM-DD", "amount": 0.00,
                            "category": "string" } ],
      "forecast_days" : 30 | 60 | 90
    }
  Output              :
    {
      "predicted_total"     : 0.00,
      "predicted_by_day"    : [ { "date": "...", "amount": 0.00 } ],
      "predicted_by_category": { "Food": 0.00, "Transport": 0.00, ... },
      "confidence_score"    : 0.00,  (0–1)
      "trend"               : "increasing" | "decreasing" | "stable",
      "alerts"              : [ "string" ]
    }

  Models Used:
    Model 1 : Facebook Prophet (time-series, captures seasonality)
    Model 2 : Linear Regression (fallback for new users < 30 days data)
    Model 3 : Category-wise weighted average (short-term accuracy boost)

  Feature Engineering:
    - Day of week encoding
    - Day of month
    - Is weekend flag
    - Is salary week flag (user-defined)
    - Rolling 7-day average
    - Monthly category ratio
    - Exponential smoothing weights

  Retraining Trigger:
    - Automatic: Every time user logs 20+ new expenses
    - Manual: User clicks "Refresh Prediction" on UI
    - Scheduled: Nightly cron job for active users

8.5 Notification & Alert Engine
----------------------------------

  Alert Types:
    AL-01  Budget threshold alert (50%, 80%, 100% of category budget used)
    AL-02  Daily spending spike (day amount > 2x 7-day average)
    AL-03  Predicted overspend (AI forecast > budget goal by > 10%)
    AL-04  Recurring expense reminder (day before due)
    AL-05  Monthly summary (1st of each month, previous month recap)
    AL-06  Unusual category spike (> 3x category average for the day)

  Delivery Channels:
    - In-app: Real-time via WebSocket (Socket.IO)
    - Email: SendGrid HTML templates
    - Push: Browser Push API (via service worker) [PWA]

  Alert Processing:
    - Evaluated on every new expense save (real-time check)
    - Nightly cron job for scheduled alerts (midnight IST)
    - Throttle: Max 3 alerts per category per day

8.6 Recurring Expense Processor
----------------------------------

  Cron Schedule  : Every day at 6:00 AM
  Logic          :
    1. Query all RecurringExpense records where next_due_date = today
    2. Auto-create Expense records for each
    3. Update next_due_date based on recurrence_type
    4. Trigger budget threshold check
    5. Send reminder notification if amount > threshold

8.7 Currency Service
---------------------

  Provider       : Open Exchange Rates API (or ExchangeRate-API)
  Cache TTL      : 1 hour (Redis)
  Base Currency  : INR (user-configurable in settings)
  Supported      : 150+ ISO 4217 currencies
  Conversion     : All amounts stored in base currency (INR) in DB
                   Display conversion done at frontend using cached rates

8.8 Report Generation
-----------------------

  CSV Export:
    - All expenses filtered by date range, category, payment method
    - Headers: Date, Category, Description, Amount, Currency, Payment Method
    - Generated server-side, streamed to client

  PDF Export:
    - Summary statistics + charts (server-side rendering via Puppeteer)
    - Sections: Monthly Summary, Category Breakdown, Budget vs Actual,
                Prediction Forecast, Transaction List
    - Branding: App logo + user name + date range header

================================================================================
9. DATABASE SPECIFICATIONS
================================================================================

9.1 Primary Database — PostgreSQL 15
--------------------------------------

  Purpose  : Core transactional data (users, expenses, budgets)
  ORM      : Sequelize v6
  Hosting  : AWS RDS PostgreSQL (production) / Docker (development)

  -----------------------------------------------------------------------
  TABLE: users
  -----------------------------------------------------------------------
  Column              Type              Constraints
  -----------------------------------------------------------
  id                  UUID              PRIMARY KEY, DEFAULT gen_random_uuid()
  email               VARCHAR(255)      UNIQUE, NOT NULL
  password_hash       VARCHAR(255)      NOT NULL
  full_name           VARCHAR(100)      NOT NULL
  avatar_url          TEXT              NULL
  currency            VARCHAR(10)       DEFAULT 'INR'
  timezone            VARCHAR(50)       DEFAULT 'Asia/Kolkata'
  email_verified      BOOLEAN           DEFAULT false
  is_active           BOOLEAN           DEFAULT true
  role                VARCHAR(20)       DEFAULT 'user'  (user | admin)
  created_at          TIMESTAMPTZ       DEFAULT NOW()
  updated_at          TIMESTAMPTZ       DEFAULT NOW()
  last_login_at       TIMESTAMPTZ       NULL

  Indexes:
    - idx_users_email (email) UNIQUE
    - idx_users_active (is_active)

  -----------------------------------------------------------------------
  TABLE: categories
  -----------------------------------------------------------------------
  Column              Type              Constraints
  -----------------------------------------------------------
  id                  UUID              PRIMARY KEY
  user_id             UUID              FK -> users.id, NULL (system categories)
  name                VARCHAR(100)      NOT NULL
  icon                VARCHAR(50)       NOT NULL   (icon key/emoji)
  color               VARCHAR(7)        NOT NULL   (hex color)
  type                VARCHAR(20)       NOT NULL   (expense | income | both)
  is_system           BOOLEAN           DEFAULT false
  is_active           BOOLEAN           DEFAULT true
  created_at          TIMESTAMPTZ       DEFAULT NOW()

  Default System Categories (is_system = true):
    Food & Dining, Transport, Shopping, Entertainment, Health & Medical,
    Education, Utilities, Rent & Housing, Travel, Personal Care,
    Investments, Salary, Freelance, Business Income, Other

  Indexes:
    - idx_categories_user (user_id)
    - idx_categories_type (type)

  -----------------------------------------------------------------------
  TABLE: expenses
  -----------------------------------------------------------------------
  Column              Type              Constraints
  -----------------------------------------------------------
  id                  UUID              PRIMARY KEY
  user_id             UUID              FK -> users.id, NOT NULL
  category_id         UUID              FK -> categories.id, NOT NULL
  amount              DECIMAL(15, 2)    NOT NULL, CHECK (amount > 0)
  amount_base         DECIMAL(15, 2)    NOT NULL  (converted to base currency)
  currency            VARCHAR(10)       NOT NULL
  exchange_rate       DECIMAL(10, 6)    DEFAULT 1.0
  description         VARCHAR(255)      NULL
  notes               TEXT              NULL
  payment_method      VARCHAR(30)       DEFAULT 'cash'
  date                DATE              NOT NULL
  receipt_url         TEXT              NULL
  is_recurring        BOOLEAN           DEFAULT false
  recurring_id        UUID              FK -> recurring_expenses.id, NULL
  created_at          TIMESTAMPTZ       DEFAULT NOW()
  updated_at          TIMESTAMPTZ       DEFAULT NOW()

  Indexes:
    - idx_expenses_user_date (user_id, date DESC)
    - idx_expenses_user_category (user_id, category_id)
    - idx_expenses_date (date)
    - idx_expenses_recurring (recurring_id)

  -----------------------------------------------------------------------
  TABLE: income
  -----------------------------------------------------------------------
  Column              Type              Constraints
  -----------------------------------------------------------
  id                  UUID              PRIMARY KEY
  user_id             UUID              FK -> users.id, NOT NULL
  category_id         UUID              FK -> categories.id, NOT NULL
  amount              DECIMAL(15, 2)    NOT NULL, CHECK (amount > 0)
  amount_base         DECIMAL(15, 2)    NOT NULL
  currency            VARCHAR(10)       NOT NULL
  exchange_rate       DECIMAL(10, 6)    DEFAULT 1.0
  description         VARCHAR(255)      NULL
  date                DATE              NOT NULL
  source              VARCHAR(100)      NULL
  created_at          TIMESTAMPTZ       DEFAULT NOW()
  updated_at          TIMESTAMPTZ       DEFAULT NOW()

  Indexes:
    - idx_income_user_date (user_id, date DESC)

  -----------------------------------------------------------------------
  TABLE: budgets
  -----------------------------------------------------------------------
  Column              Type              Constraints
  -----------------------------------------------------------
  id                  UUID              PRIMARY KEY
  user_id             UUID              FK -> users.id, NOT NULL
  category_id         UUID              FK -> categories.id, NULL (overall budget)
  amount              DECIMAL(15, 2)    NOT NULL, CHECK (amount > 0)
  currency            VARCHAR(10)       NOT NULL
  period_type         VARCHAR(20)       NOT NULL  (monthly | weekly | yearly)
  period_year         SMALLINT          NOT NULL
  period_month        SMALLINT          NULL      (1–12 for monthly)
  period_week         SMALLINT          NULL      (1–52 for weekly)
  alert_50            BOOLEAN           DEFAULT true
  alert_80            BOOLEAN           DEFAULT true
  alert_100           BOOLEAN           DEFAULT true
  created_at          TIMESTAMPTZ       DEFAULT NOW()
  updated_at          TIMESTAMPTZ       DEFAULT NOW()

  Unique Constraint: (user_id, category_id, period_type, period_year,
                      period_month, period_week)

  Indexes:
    - idx_budgets_user_period (user_id, period_year, period_month)

  -----------------------------------------------------------------------
  TABLE: recurring_expenses
  -----------------------------------------------------------------------
  Column              Type              Constraints
  -----------------------------------------------------------
  id                  UUID              PRIMARY KEY
  user_id             UUID              FK -> users.id, NOT NULL
  category_id         UUID              FK -> categories.id, NOT NULL
  amount              DECIMAL(15, 2)    NOT NULL
  currency            VARCHAR(10)       NOT NULL
  description         VARCHAR(255)      NOT NULL
  payment_method      VARCHAR(30)       DEFAULT 'auto'
  recurrence_type     VARCHAR(20)       NOT NULL  (daily | weekly | monthly)
  start_date          DATE              NOT NULL
  end_date            DATE              NULL
  next_due_date       DATE              NOT NULL
  is_active           BOOLEAN           DEFAULT true
  last_processed_at   TIMESTAMPTZ       NULL
  created_at          TIMESTAMPTZ       DEFAULT NOW()

  Indexes:
    - idx_recurring_user (user_id)
    - idx_recurring_due (next_due_date, is_active)

  -----------------------------------------------------------------------
  TABLE: notification_preferences
  -----------------------------------------------------------------------
  Column                  Type          Constraints
  -----------------------------------------------------------
  id                      UUID          PRIMARY KEY
  user_id                 UUID          FK -> users.id, UNIQUE
  in_app_enabled          BOOLEAN       DEFAULT true
  email_enabled           BOOLEAN       DEFAULT true
  push_enabled            BOOLEAN       DEFAULT false
  budget_alert_enabled    BOOLEAN       DEFAULT true
  spending_spike_enabled  BOOLEAN       DEFAULT true
  prediction_alert_enabled BOOLEAN      DEFAULT true
  recurring_reminder_enabled BOOLEAN   DEFAULT true
  monthly_summary_enabled BOOLEAN       DEFAULT true
  quiet_hours_start       TIME          DEFAULT '22:00'
  quiet_hours_end         TIME          DEFAULT '07:00'
  created_at              TIMESTAMPTZ   DEFAULT NOW()
  updated_at              TIMESTAMPTZ   DEFAULT NOW()

  -----------------------------------------------------------------------
  TABLE: user_sessions
  -----------------------------------------------------------------------
  Column              Type              Constraints
  -----------------------------------------------------------
  id                  UUID              PRIMARY KEY
  user_id             UUID              FK -> users.id, NOT NULL
  refresh_token_hash  VARCHAR(255)      NOT NULL
  ip_address          INET              NULL
  user_agent          TEXT              NULL
  expires_at          TIMESTAMPTZ       NOT NULL
  created_at          TIMESTAMPTZ       DEFAULT NOW()

  Indexes:
    - idx_sessions_user (user_id)
    - idx_sessions_token (refresh_token_hash)
    - idx_sessions_expiry (expires_at)

9.2 Secondary Database — MongoDB (Atlas / Docker)
---------------------------------------------------

  Purpose  : Analytical events, logs, and ML prediction results
  ODM      : Mongoose v7
  Hosting  : MongoDB Atlas M10 (production) / Docker (development)

  -----------------------------------------------------------------------
  COLLECTION: analytics_events
  -----------------------------------------------------------------------
  Schema:
  {
    _id          : ObjectId,
    user_id      : String (UUID reference),
    event_type   : String,    (page_view | expense_added | budget_set |
                               prediction_requested | report_exported)
    payload      : Object,    (flexible per event type)
    session_id   : String,
    ip_address   : String,
    user_agent   : String,
    timestamp    : Date,
    created_at   : Date
  }

  Indexes:
    - { user_id: 1, timestamp: -1 }
    - { event_type: 1, timestamp: -1 }
    - TTL: { timestamp: 1 } expireAfterSeconds: 7776000  (90 days)

  -----------------------------------------------------------------------
  COLLECTION: prediction_results
  -----------------------------------------------------------------------
  Schema:
  {
    _id                   : ObjectId,
    user_id               : String,
    generated_at          : Date,
    forecast_days         : Number,
    predicted_total       : Number,
    predicted_by_day      : [ { date: String, amount: Number } ],
    predicted_by_category : Object,
    confidence_score      : Number,
    trend                 : String,
    alerts                : [ String ],
    model_version         : String,
    input_data_points     : Number,
    created_at            : Date
  }

  Indexes:
    - { user_id: 1, generated_at: -1 }
    - TTL: { created_at: 1 } expireAfterSeconds: 2592000  (30 days)

  -----------------------------------------------------------------------
  COLLECTION: notification_logs
  -----------------------------------------------------------------------
  Schema:
  {
    _id           : ObjectId,
    user_id       : String,
    alert_type    : String,
    title         : String,
    message       : String,
    channel       : String,   (in_app | email | push)
    is_read       : Boolean,
    metadata      : Object,   (e.g., category, budget amount, threshold %)
    sent_at       : Date,
    read_at       : Date,
    created_at    : Date
  }

  Indexes:
    - { user_id: 1, is_read: 1, created_at: -1 }
    - { user_id: 1, alert_type: 1 }
    - TTL: { created_at: 1 } expireAfterSeconds: 7776000  (90 days)

  -----------------------------------------------------------------------
  COLLECTION: expense_audit_logs
  -----------------------------------------------------------------------
  Schema:
  {
    _id          : ObjectId,
    user_id      : String,
    expense_id   : String,
    action       : String,    (created | updated | deleted)
    old_values   : Object,
    new_values   : Object,
    changed_by   : String,
    ip_address   : String,
    timestamp    : Date
  }

  Indexes:
    - { user_id: 1, timestamp: -1 }
    - { expense_id: 1 }
    - TTL: { timestamp: 1 } expireAfterSeconds: 15552000  (180 days)

9.3 Cache Layer — Redis 7
---------------------------

  Purpose  : Session management, rate limiting, currency cache, real-time data
  Client   : ioredis
  Hosting  : Redis Cloud (production) / Docker (development)

  KEY SCHEMA                            TTL           DESCRIPTION
  -----------------------------------------------------------------------
  session:{userId}                      7 days        Refresh token hash
  currency:rates:{base}                 1 hour        Exchange rates JSON
  user:profile:{userId}                 15 min        Cached user profile
  user:budget:{userId}:{month}          10 min        Monthly budget summary
  user:expenses:summary:{userId}        5 min         Dashboard summary data
  ratelimit:{ip}:{endpoint}             1 min         Rate limit counter
  prediction:queue:{userId}             24 hours      Prevent duplicate predict
  notification:throttle:{userId}:{type} 1 hour        Alert throttle flag

================================================================================
10. API DESIGN
================================================================================

Base URL         : https://api.setbps.app/v1
Auth Header      : Authorization: Bearer <accessToken>
Content-Type     : application/json
Response Format  :
  {
    "success" : true | false,
    "data"    : { ... } | [ ... ],
    "message" : "string",
    "meta"    : { "page": 1, "limit": 20, "total": 100 }  (paginated)
  }

10.1 Auth Endpoints
--------------------
  POST   /auth/register              Register new user
  POST   /auth/login                 Login, get tokens
  POST   /auth/logout                Logout, invalidate tokens
  POST   /auth/refresh               Refresh access token
  POST   /auth/forgot-password       Send reset email
  POST   /auth/reset-password        Reset with token
  GET    /auth/verify-email/:token   Verify email

10.2 User Endpoints
--------------------
  GET    /users/me                   Get current user profile
  PUT    /users/me                   Update profile
  PUT    /users/me/password          Change password
  PUT    /users/me/preferences       Update notification preferences
  DELETE /users/me                   Deactivate account

10.3 Expense Endpoints
-----------------------
  GET    /expenses                   List expenses (filters + pagination)
  POST   /expenses                   Create expense
  GET    /expenses/:id               Get single expense
  PUT    /expenses/:id               Update expense
  DELETE /expenses/:id               Delete expense
  GET    /expenses/summary/monthly   Monthly summary stats
  GET    /expenses/summary/category  Category-wise breakdown

  Query Parameters (GET /expenses):
    page         : int (default 1)
    limit        : int (default 20, max 100)
    start_date   : YYYY-MM-DD
    end_date     : YYYY-MM-DD
    category_id  : UUID
    payment_method: string
    sort         : date_desc | date_asc | amount_desc | amount_asc
    search       : string (description search)

10.4 Income Endpoints
----------------------
  GET    /income                     List income entries
  POST   /income                     Create income entry
  GET    /income/:id                 Get single income
  PUT    /income/:id                 Update income
  DELETE /income/:id                 Delete income

10.5 Budget Endpoints
----------------------
  GET    /budgets                    List all budget goals
  POST   /budgets                    Create budget goal
  GET    /budgets/:id                Get single budget
  PUT    /budgets/:id                Update budget goal
  DELETE /budgets/:id                Delete budget goal
  GET    /budgets/status/:month      Budget vs actual for month (YYYY-MM)

10.6 Category Endpoints
------------------------
  GET    /categories                 List categories (system + user)
  POST   /categories                 Create custom category
  PUT    /categories/:id             Update custom category
  DELETE /categories/:id             Delete custom category

10.7 Prediction Endpoints
--------------------------
  POST   /predictions/generate       Generate new prediction
  GET    /predictions/latest         Get latest prediction result
  GET    /predictions/history        List past predictions

10.8 Report Endpoints
----------------------
  GET    /reports/summary            Summary stats for date range
  GET    /reports/export/csv         Download CSV
  GET    /reports/export/pdf         Download PDF

10.9 Notification Endpoints
-----------------------------
  GET    /notifications              List notifications
  PATCH  /notifications/:id/read     Mark as read
  PATCH  /notifications/read-all     Mark all as read
  DELETE /notifications/:id          Delete notification

10.10 WebSocket Events (Socket.IO)
------------------------------------
  Client -> Server:
    subscribe:notifications    { userId }
    subscribe:dashboard        { userId }

  Server -> Client:
    notification:new           { alert_type, title, message, metadata }
    budget:threshold           { category, percent, amount }
    dashboard:refresh          { summary_data }

================================================================================
11. FUNCTIONAL REQUIREMENTS
================================================================================

AUTH & USER
  FR-01  Users must register with email and password.
  FR-02  Passwords must be min 8 chars, 1 uppercase, 1 number, 1 special char.
  FR-03  Email verification required before first login.
  FR-04  JWT-based auth with auto-refresh on token expiry.
  FR-05  Users can reset password via email token (valid 1 hour).
  FR-06  Profile includes name, avatar, preferred currency, timezone.

EXPENSE MANAGEMENT
  FR-07  Users can add expenses with amount, category, date, description.
  FR-08  Users can edit and delete their own expenses.
  FR-09  Expenses can be filtered by date, category, payment method.
  FR-10  Users can search expenses by description text.
  FR-11  Expense list supports pagination (20 per page default).
  FR-12  Users can attach a receipt image/PDF to an expense.
  FR-13  Users can mark expenses as recurring with a schedule.
  FR-14  Recurring expenses auto-generate on their due date via cron job.

BUDGET MANAGEMENT
  FR-15  Users can set monthly budget goals — overall and per category.
  FR-16  Budget status shows amount spent vs. goal with progress bar.
  FR-17  Alerts triggered at 50%, 80%, and 100% of budget usage.
  FR-18  Budget goals can be set for past months (for historical edit).

PREDICTION
  FR-19  System predicts total spending for next 30 / 60 / 90 days.
  FR-20  Prediction breaks down forecast by category.
  FR-21  System identifies spending trend (increasing/decreasing/stable).
  FR-22  Prediction requires minimum 7 days of expense data.
  FR-23  Predictions auto-refresh when 20+ new expenses are logged.
  FR-24  Confidence score displayed with each prediction.

ANALYTICS DASHBOARD
  FR-25  Dashboard shows total expenses, income, and net balance for current month.
  FR-26  Spending trend line chart displays daily totals for last 30 days.
  FR-27  Category donut chart shows expense distribution for current month.
  FR-28  Budget progress bars show per-category utilization.
  FR-29  Recent transactions list shows last 5 entries.
  FR-30  Prediction widget shows AI forecast on dashboard.

NOTIFICATIONS
  FR-31  In-app notifications delivered in real-time via WebSocket.
  FR-32  Email notifications sent via SendGrid templates.
  FR-33  Users can configure which alert types they receive.
  FR-34  Quiet hours setting prevents alerts between defined times.
  FR-35  Notification history available for last 90 days.

REPORTS
  FR-36  Users can export expenses as CSV for any custom date range.
  FR-37  PDF reports include charts and summary statistics.
  FR-38  Reports filterable by category, payment method, date range.

CURRENCY
  FR-39  Users select a default display currency in settings.
  FR-40  Expenses can be entered in any supported currency.
  FR-41  All amounts stored in base currency (INR); conversion at display time.
  FR-42  Exchange rates refreshed every hour from external API.

================================================================================
12. NON-FUNCTIONAL REQUIREMENTS
================================================================================

PERFORMANCE
  NFR-01  API response time < 300ms for 95th percentile (p95).
  NFR-02  Dashboard load time < 2 seconds on 10 Mbps connection.
  NFR-03  Support 10,000 concurrent WebSocket connections.
  NFR-04  Database queries must use indexed columns; no full table scans.
  NFR-05  Redis cache hit rate > 80% for dashboard summary data.

SCALABILITY
  NFR-06  Horizontal scaling via container orchestration (Docker + K8s).
  NFR-07  Stateless backend (session data in Redis, not in memory).
  NFR-08  PostgreSQL read replicas for analytics queries.
  NFR-09  CDN delivery for frontend static assets.

AVAILABILITY
  NFR-10  System uptime SLA: 99.9% (< 8.7 hours downtime/year).
  NFR-11  Automated health checks every 30 seconds.
  NFR-12  Graceful degradation: prediction service failure does not block core.

DATA INTEGRITY
  NFR-13  All financial amounts use DECIMAL(15,2) — no floating-point.
  NFR-14  All monetary operations wrapped in database transactions.
  NFR-15  Soft deletes for expenses (deleted_at timestamp, not hard delete).
  NFR-16  Audit log maintained for all expense modifications.

COMPATIBILITY
  NFR-17  Browser support: Chrome 100+, Firefox 100+, Safari 15+, Edge 100+.
  NFR-18  Mobile responsive on screens 320px and above.
  NFR-19  API versioned (/v1/) for backward compatibility.

================================================================================
13. SECURITY REQUIREMENTS
================================================================================

  SEC-01  All API communication over HTTPS (TLS 1.3).
  SEC-02  Passwords hashed with bcrypt (min 12 rounds).
  SEC-03  JWT stored in memory (access) + HTTP-only cookie (refresh).
  SEC-04  CSRF protection on all state-changing endpoints.
  SEC-05  Input sanitization and parameterized queries (SQL injection prevention).
  SEC-06  Rate limiting: 100 req/min per IP globally; 10 req/min on auth endpoints.
  SEC-07  Content Security Policy (CSP) headers on all responses.
  SEC-08  CORS configured to whitelist only frontend domain.
  SEC-09  Sensitive fields (password_hash, tokens) never returned in API responses.
  SEC-10  File uploads scanned for MIME type; restricted to image/PDF only.
  SEC-11  PII data (email, name) excluded from logs.
  SEC-12  Database credentials and API keys stored in environment variables.
  SEC-13  Automated vulnerability scanning in CI/CD pipeline (OWASP ZAP).
  SEC-14  User can only access their own data (user_id ownership check on every query).

================================================================================
14. TECH STACK SUMMARY
================================================================================

  LAYER              TECHNOLOGY             VERSION      PURPOSE
  -----------------------------------------------------------------------
  Frontend           React.js               18.x         SPA Framework
  Frontend           Vite                   5.x          Build Tool
  Frontend           Tailwind CSS           3.x          Styling
  Frontend           shadcn/ui              Latest        Component Library
  Frontend           Zustand                4.x          Global State
  Frontend           React Query            5.x          Server State + Cache
  Frontend           Recharts               2.x          Charts & Graphs
  Frontend           React Hook Form        7.x          Form Management
  Frontend           Zod                    3.x          Schema Validation
  Frontend           Axios                  1.x          HTTP Client
  Frontend           Socket.IO Client       4.x          WebSocket
  Frontend           jsPDF                  2.x          PDF Export
  Backend            Node.js                20 LTS       Runtime
  Backend            Express.js             4.x          Web Framework
  Backend            Sequelize              6.x          PostgreSQL ORM
  Backend            Mongoose               7.x          MongoDB ODM
  Backend            ioredis                5.x          Redis Client
  Backend            bcrypt                 5.x          Password Hashing
  Backend            jsonwebtoken           9.x          JWT Auth
  Backend            node-cron              3.x          Scheduled Jobs
  Backend            Nodemailer             6.x          Email Sending
  Backend            Multer                 1.x          File Uploads
  Backend            Winston                3.x          Logging
  Backend            Swagger UI             5.x          API Documentation
  Prediction         Python                 3.11         ML Runtime
  Prediction         FastAPI                0.110+       Prediction API
  Prediction         Prophet                1.1+         Time-Series Model
  Prediction         scikit-learn           1.4+         ML Algorithms
  Prediction         pandas                 2.x          Data Processing
  Prediction         numpy                  1.x          Numerical Computing
  Database           PostgreSQL             15.x         Primary Database
  Database           MongoDB                7.x          Analytics & Logs
  Cache              Redis                  7.x          Cache & Sessions
  DevOps             Docker                 25.x         Containerization
  DevOps             Docker Compose         2.x          Local Dev Stack
  DevOps             GitHub Actions         -            CI/CD Pipeline

================================================================================
15. DATA FLOW DIAGRAM
================================================================================

  USER ADDS EXPENSE:

  [Browser]
    → POST /api/v1/expenses
    → [Express Middleware: Auth, Validate, RateLimit]
    → [expenseController.create()]
    → [expenseService.create()]
        → [PostgreSQL: INSERT into expenses]
        → [Redis: Invalidate user:expenses:summary cache]
        → [budgetService.checkThreshold()]
            → If threshold crossed → [notificationService.send()]
                → [MongoDB: INSERT notification_logs]
                → [Socket.IO: emit notification:new to user]
                → [SendGrid: queue email if email_enabled]
        → [MongoDB: INSERT analytics_events (expense_added)]
    → [Return 201 with expense data]
    → [Frontend: React Query invalidates /expenses + /dashboard]
    → [Dashboard re-fetches from cache or DB]

  AI PREDICTION REQUEST:

  [Browser]
    → POST /api/v1/predictions/generate
    → [predictionController.generate()]
    → [predictionService.generate()]
        → [PostgreSQL: SELECT expenses for user (last 90 days)]
        → [HTTP POST to FastAPI :8001/predict with expense data]
        → [FastAPI: Prophet + Linear Regression model inference]
        → [FastAPI returns prediction JSON]
        → [MongoDB: INSERT prediction_results]
        → [Redis: SET prediction:queue:{userId} = "done" TTL 24h]
    → [Return 200 with prediction data]
    → [Frontend: Render ForecastChart + PredictionInsight]

================================================================================
16. MILESTONES & TIMELINE
================================================================================

  PHASE 1 — Foundation (Weeks 1–3)
    - Project setup, repo structure, CI/CD pipeline
    - PostgreSQL schema + migrations
    - Auth module (register, login, JWT, email verification)
    - Basic expense CRUD API
    - Frontend scaffolding (Vite + Tailwind + routing)
    - Login / Register pages

  PHASE 2 — Core Features (Weeks 4–6)
    - Budget goals API + frontend
    - Categories API + management UI
    - Income tracking API + UI
    - Dashboard UI (summary cards + charts)
    - Expense list with filters, search, pagination
    - Recurring expense setup + cron processor

  PHASE 3 — Analytics & Prediction (Weeks 7–9)
    - MongoDB integration (analytics + notifications)
    - Notification system (in-app via WebSocket + email)
    - Redis caching layer
    - Python FastAPI prediction microservice
    - Predictions page UI + forecast charts
    - Currency service + multi-currency support

  PHASE 4 — Reports & Polish (Weeks 10–11)
    - CSV and PDF export
    - Settings page (profile, preferences, notifications)
    - Mobile responsive refinements
    - Dark mode implementation
    - API documentation (Swagger)
    - Performance optimization + Redis cache tuning

  PHASE 5 — Testing & Launch (Week 12)
    - Unit tests (Jest + Supertest) — 80% coverage target
    - Integration tests
    - Security audit (OWASP checklist)
    - Load testing (k6)
    - Staging environment validation
    - Production deployment

================================================================================
17. RISKS & MITIGATIONS
================================================================================

  RISK                           LIKELIHOOD   IMPACT   MITIGATION
  -----------------------------------------------------------------------
  Prediction accuracy < 70%      Medium       High     Use Prophet + fallback
                                                        linear model; show
                                                        confidence score to user
  PostgreSQL query slowdown       Low          High     Proper indexes; query
  at scale                                              explain plan review
  ML model retraining cost        Medium       Medium   Batch nightly, not real-
  (compute)                                             time; cache results
  Exchange rate API downtime      Low          Medium   Cache last known rates;
                                                        graceful fallback
  WebSocket connection limit      Medium       Medium   Load balancer + Redis
                                                        pub/sub for multi-node
  File upload abuse               Low          Medium   MIME check + size limit
                                                        + virus scan (ClamAV)
  JWT token theft                 Low          High     HTTP-only cookie for
                                                        refresh; short access
                                                        token TTL (15 min)

================================================================================
18. GLOSSARY
================================================================================

  Term                  Definition
  -----------------------------------------------------------------------
  SETBPS                Smart Expense Tracker And Budget Prediction System
  JWT                   JSON Web Token — stateless auth mechanism
  ORM                   Object Relational Mapper (Sequelize for PostgreSQL)
  ODM                   Object Document Mapper (Mongoose for MongoDB)
  TTL                   Time To Live — expiry duration for cache entries
  Prophet               Open-source time-series forecasting library by Meta
  DXA                   Document Xref Address — unit used in DOCX files
  PWA                   Progressive Web App — installable web application
  CRUD                  Create, Read, Update, Delete — basic data operations
  Cron                  Time-based job scheduler in Unix-like systems
  CSP                   Content Security Policy — HTTP security header
  CORS                  Cross-Origin Resource Sharing
  SLA                   Service Level Agreement — uptime/performance commitment
  ISO 4217              International currency code standard (USD, INR, EUR...)
  p95                   95th percentile — response time metric
  Socket.IO             Real-time bidirectional event-based communication library

================================================================================
END OF DOCUMENT
Product: Smart Expense Tracker And Budget Prediction System
Version: 1.0.0 | June 2026
================================================================================
