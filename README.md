                                  ##Smart-Expense-Tracker-And-Budget-Prediction-System
 
#1. Introduction
1.1 Project Overview
The Smart Expense Tracker & Budget Prediction System is a full-stack web application that empowers individuals and households to monitor daily expenditures, categorize transactions, visualize spending patterns, and receive AI-driven budget forecasts. By combining intuitive frontend interfaces with a robust Java + Spring Boot backend and a multi-model database strategy, the system delivers real-time financial insights and predictive analytics to help users achieve their financial goals.

1.2 Purpose of This Document
This Product Requirements Document (PRD) defines the functional and non-functional requirements, system architecture, technology stack, database schema, API contracts, and acceptance criteria for Version 1.0 of the Smart Expense Tracker & Budget Prediction System. It serves as the authoritative reference for developers, QA engineers, and stakeholders throughout the development lifecycle.

1.3 Scope
•	Web application accessible via modern browsers (Chrome, Firefox, Edge, Safari).
•	User registration, authentication, and role-based access control.
•	Expense entry, editing, deletion, and categorization.
•	Budget configuration and real-time threshold alerts.
•	Charts, trend analysis, and AI-powered monthly budget predictions.
•	Export of reports in PDF and Excel format.
•	REST API backend for all client-server communication.

1.4 Definitions & Acronyms
Term / Acronym	Definition
PRD	Product Requirements Document
JWT	JSON Web Token – used for stateless authentication
REST	Representational State Transfer – architectural style for APIs
ORM	Object-Relational Mapping (Hibernate/JPA)
SPA	Single Page Application (React)
ML	Machine Learning – used for budget prediction module
CORS	Cross-Origin Resource Sharing
CI/CD	Continuous Integration / Continuous Deployment

 
2. Stakeholders & User Personas
2.1 Primary Stakeholders
•	End Users – Individuals tracking personal or household finances.
•	Product Owner – Defines priorities and acceptance criteria.
•	Development Team – Frontend, backend, and database engineers.
•	QA Team – Responsible for testing and validation.

2.2 User Personas
Persona 1 – Riya, 26, Software Engineer
Riya wants to track her monthly expenses across categories (food, travel, subscriptions) and receive alerts when she overspends. She accesses the app primarily via desktop browser.

Persona 2 – Suresh, 45, Small Business Owner
Suresh needs a clear monthly budget overview and visual charts to understand spending trends. He wants to export reports for his accountant in PDF format.

Persona 3 – College Student – Arun, 21
Arun has a tight monthly allowance and wants the system to predict how much he can spend for the rest of the month based on historical patterns.

 
3. Technology Stack
The following technology stack is derived directly from the project specification. All technology choices are mandatory for Version 1.0.

3.1 Stack Overview
Layer	Technology	Key Libraries / Tools
Frontend	HTML5, CSS3, Bootstrap 5, React	React Router, Axios, Recharts / Chart.js, React Hook Form
Backend	Java 17 + Spring Boot 3	Spring Security, Spring Data JPA, Spring Web, Hibernate, Lombok, ModelMapper
Database	MySQL / MongoDB / PostgreSQL	MySQL 8 (relational data), MongoDB (analytics/logs), PostgreSQL (alt relational)
Auth	JWT + Spring Security	jjwt library, BCryptPasswordEncoder, Role-based access
APIs	REST API	JSON request/response, Swagger/OpenAPI 3.0 documentation
Analytics	Charts & Budget Analytics	Recharts (React), Chart.js, custom ML prediction (Spring service)
Build & Deploy	Maven / npm / Docker	Maven Wrapper, Vite (React build), Docker Compose, GitHub Actions CI/CD

3.2 Frontend – Detailed Specification
The frontend is a React Single Page Application (SPA) styled with Bootstrap 5 and custom CSS. HTML5 provides semantic markup; CSS3 handles animations, transitions, and responsive layouts. React manages component state, routing (React Router v6), and API communication via Axios.

3.2.1 Core React Components
•	AuthPage – Login / Register forms with client-side validation.
•	Dashboard – Summary cards (total income, total expenses, savings rate, prediction widget).
•	ExpenseList – Paginated, filterable, sortable table of all transactions.
•	AddEditExpense – Modal form for creating and editing expense entries.
•	BudgetConfig – Set monthly budget limits per category.
•	Charts – Bar, Pie, and Line chart views of spending data.
•	PredictionWidget – Displays AI-computed budget forecast for the current month.
•	Reports – Date-range selection and export controls (PDF / Excel).
•	Navbar / Sidebar – Navigation with role-aware menu items.

3.3 Backend – Detailed Specification
The backend is a RESTful service built with Spring Boot 3 and Java 17. It follows a layered architecture: Controller → Service → Repository → Database. JWT tokens are issued on login and validated on every protected endpoint via a Spring Security filter chain.

3.3.1 Spring Boot Application Modules
•	auth – Registration, login, JWT issuance, token refresh.
•	user – User profile management, password change.
•	expense – CRUD for expense entries, category management.
•	budget – Budget limit configuration, real-time alert calculation.
•	prediction – Monthly budget prediction engine (linear regression / moving average).
•	report – PDF and Excel generation, data aggregation for charts.
•	analytics – Aggregation queries fed to the frontend chart components.

 
4. Database Design
4.1 Database Strategy
The system employs a polyglot persistence approach to leverage the strengths of multiple database technologies within the same application:

Database	Type	Usage in This Project
MySQL 8.x	Relational (RDBMS)	Core transactional data: users, expenses, budgets, categories. Enforces ACID compliance and referential integrity.
MongoDB 7.x	Document (NoSQL)	Audit logs, user activity events, analytics snapshots, and flexible metadata storage that does not require a fixed schema.
PostgreSQL 16.x	Relational (RDBMS)	Alternative or supplementary relational store. Can replace MySQL for deployments requiring advanced JSON query support (JSONB) or full-text search.

4.2 MySQL – Relational Schema
4.2.1 users Table
Column	Type	Constraints	Description
id	BIGINT	PK, AUTO_INCREMENT	Unique user identifier
full_name	VARCHAR(100)	NOT NULL	User's display name
email	VARCHAR(150)	UNIQUE, NOT NULL	Login credential & notifications
password_hash	VARCHAR(255)	NOT NULL	BCrypt-hashed password
role	ENUM	DEFAULT 'USER'	USER | ADMIN
created_at	DATETIME	NOT NULL	Account creation timestamp
updated_at	DATETIME	NOT NULL	Last profile update timestamp
is_active	BOOLEAN	DEFAULT TRUE	Soft delete / account status

4.2.2 categories Table
Column	Type	Constraints	Description
id	BIGINT	PK, AUTO_INCREMENT	Category identifier
name	VARCHAR(80)	NOT NULL	e.g. Food, Travel, Rent
icon	VARCHAR(50)	NULLABLE	Icon class or emoji code
user_id	BIGINT	FK → users.id	NULL = system category; set = user-defined

4.2.3 expenses Table
Column	Type	Constraints	Description
id	BIGINT	PK, AUTO_INCREMENT	Expense record ID
user_id	BIGINT	FK → users.id, NOT NULL	Owner of the expense
category_id	BIGINT	FK → categories.id	Expense category
title	VARCHAR(200)	NOT NULL	Short description of the expense
amount	DECIMAL(12,2)	NOT NULL, > 0	Expense amount in base currency
expense_date	DATE	NOT NULL	Date the expense occurred
payment_method	ENUM	DEFAULT 'CASH'	CASH | CARD | UPI | BANK_TRANSFER
notes	TEXT	NULLABLE	Optional additional details
is_recurring	BOOLEAN	DEFAULT FALSE	Marks recurring monthly expenses
created_at	DATETIME	NOT NULL	Record creation timestamp

4.2.4 budgets Table
Column	Type	Constraints	Description
id	BIGINT	PK, AUTO_INCREMENT	Budget record ID
user_id	BIGINT	FK → users.id, NOT NULL	Owner of the budget
category_id	BIGINT	FK → categories.id	NULL = overall monthly budget
limit_amount	DECIMAL(12,2)	NOT NULL, > 0	Budget ceiling for the period
month	INT	NOT NULL (1–12)	Budget month
year	INT	NOT NULL	Budget year
alert_threshold	DECIMAL(5,2)	DEFAULT 80.00	% of limit at which to fire alert

4.2.5 budget_predictions Table
Column	Type	Constraints	Description
id	BIGINT	PK, AUTO_INCREMENT	Prediction record ID
user_id	BIGINT	FK → users.id, NOT NULL	Target user
month	INT	NOT NULL	Forecast month
year	INT	NOT NULL	Forecast year
predicted_amount	DECIMAL(12,2)	NOT NULL	ML-predicted total spend
model_used	VARCHAR(80)	NOT NULL	e.g. MOVING_AVG_3M, LINEAR_REG
confidence_score	DECIMAL(5,2)	NULLABLE	Model confidence 0–100%
generated_at	DATETIME	NOT NULL	When prediction was computed

4.3 MongoDB – Document Schema
MongoDB stores audit logs, activity events, and analytics snapshots. The flexible document model allows storage of heterogeneous event types without schema migrations.

4.3.1 activity_logs Collection
Field	BSON Type	Description
_id	ObjectId	MongoDB auto-generated document ID
userId	Long	References MySQL users.id
eventType	String	LOGIN | LOGOUT | ADD_EXPENSE | DELETE_EXPENSE | EXPORT | etc.
payload	Document	Contextual data specific to the event (e.g. expenseId, amount)
ipAddress	String	Client IP for security auditing
timestamp	Date	Event occurrence time (UTC)

4.3.2 monthly_analytics Collection
Field	BSON Type	Description
_id	ObjectId	Document ID
userId	Long	References MySQL users.id
month	Int32	Month (1–12)
year	Int32	Year (e.g. 2026)
totalSpend	Double	Aggregate spend for the month
categoryBreakdown	Array<Document>	[ { categoryId, categoryName, amount } ]
topCategory	String	Category with highest spend
computedAt	Date	Snapshot generation timestamp

 
5. Functional Requirements
5.1 Authentication & Authorization
FR-ID	Module	Requirement	Priority
FR-01	Auth	Users must be able to register with full name, email, and password. Email must be unique.	Must Have
FR-02	Auth	Users must be able to log in with email and password. A valid JWT access token (15 min expiry) and refresh token (7 days) must be returned.	Must Have
FR-03	Auth	All protected API endpoints must validate the Authorization: Bearer <token> header using Spring Security JWT filter.	Must Have
FR-04	Auth	Passwords must be stored using BCrypt with strength factor 12.	Must Have
FR-05	Auth	The system must support two roles: USER and ADMIN. Admin users can view aggregate statistics across all users.	Should Have

5.2 Expense Management
FR-ID	Module	Requirement	Priority
FR-06	Expense	Authenticated users must be able to create a new expense with: title, amount, date, category, payment method, and optional notes.	Must Have
FR-07	Expense	Users must be able to view all their expenses in a paginated list (default 20 per page) with sort by date, amount, or category.	Must Have
FR-08	Expense	Users must be able to filter expenses by date range, category, payment method, and amount range.	Must Have
FR-09	Expense	Users must be able to edit any field of an existing expense they own.	Must Have
FR-10	Expense	Users must be able to delete an expense (soft delete initially; hard delete upon confirmation).	Must Have
FR-11	Expense	Users must be able to mark an expense as recurring. Recurring expenses are automatically copied to the next month.	Should Have

5.3 Budget Management
FR-ID	Module	Requirement	Priority
FR-12	Budget	Users must be able to set a monthly overall budget and per-category budget limits.	Must Have
FR-13	Budget	The dashboard must display real-time progress bars showing actual spend vs budget limit per category.	Must Have
FR-14	Budget	The system must trigger an in-app alert when spending reaches the configured alert threshold (default 80%) of the budget.	Must Have
FR-15	Budget	Users must receive an email notification when the budget threshold is breached (Spring Mail + SMTP).	Should Have

5.4 Budget Prediction
FR-ID	Module	Requirement	Priority
FR-16	Prediction	The system must compute a predicted total spend for the current month based on at least 3 months of historical data using a moving average or linear regression model.	Must Have
FR-17	Prediction	The prediction widget on the dashboard must show: predicted spend, remaining safe spend, and a confidence indicator.	Must Have
FR-18	Prediction	Predictions must be stored in the budget_predictions table and regenerated nightly via a Spring Scheduler (@Scheduled) job.	Must Have
FR-19	Prediction	When fewer than 3 months of history exist, the system must display a 'Not enough data' message and skip prediction.	Must Have

5.5 Charts & Analytics
FR-ID	Module	Requirement	Priority
FR-20	Analytics	The system must provide a Pie Chart showing expense distribution by category for the selected month.	Must Have
FR-21	Analytics	The system must provide a Bar Chart comparing monthly totals across the last 6 months.	Must Have
FR-22	Analytics	The system must provide a Line Chart showing daily spending trend for the current month.	Must Have
FR-23	Analytics	The system must provide a Budget vs Actual comparison chart per category.	Should Have

5.6 Reports & Export
FR-ID	Module	Requirement	Priority
FR-24	Report	Users must be able to generate and download a PDF expense report for any custom date range using iText or Apache PDFBox.	Must Have
FR-25	Report	Users must be able to export their expense data as an Excel (.xlsx) file using Apache POI.	Must Have

 
6. REST API Specification
6.1 Base URL
http://localhost:8080/api/v1  (Development)
https://<production-domain>/api/v1  (Production)

6.2 Authentication Endpoints
Method	Endpoint	Auth Required	Description
POST	/auth/register	No	Register new user
POST	/auth/login	No	Login, returns JWT
POST	/auth/refresh	Refresh Token	Issue new access token
POST	/auth/logout	Yes	Invalidate refresh token

6.3 Expense Endpoints
Method	Endpoint	Auth Required	Description
POST	/expenses	Yes (USER)	Create new expense
GET	/expenses	Yes (USER)	List expenses (paginated)
GET	/expenses/{id}	Yes (USER)	Get single expense
PUT	/expenses/{id}	Yes (USER)	Update expense
DELETE	/expenses/{id}	Yes (USER)	Delete expense

6.4 Budget & Prediction Endpoints
Method	Endpoint	Auth Required	Description
GET	/budgets	Yes (USER)	Get all budgets for authenticated user
POST	/budgets	Yes (USER)	Create or update budget limit
GET	/predictions/current	Yes (USER)	Fetch latest prediction for current month
GET	/analytics/summary	Yes (USER)	Dashboard summary (totals, top category)
GET	/analytics/monthly	Yes (USER)	Monthly breakdown for charts
GET	/reports/export/pdf	Yes (USER)	Download PDF report
GET	/reports/export/excel	Yes (USER)	Download Excel report

 
7. Non-Functional Requirements
NFR-ID	Category	Requirement
NFR-01	Performance	API response time must be < 300 ms for 95% of requests under 100 concurrent users.
NFR-02	Security	All HTTP communication must use HTTPS (TLS 1.2+) in production.
NFR-03	Security	JWT tokens must have a 15-minute expiry; refresh tokens must be rotated on each use.
NFR-04	Security	SQL injection prevention via JPA parameterized queries. Input validation on all DTOs using Jakarta Bean Validation.
NFR-05	Availability	Target 99.5% uptime in production. Health-check endpoint: GET /actuator/health.
NFR-06	Scalability	Backend must be stateless to support horizontal scaling behind a load balancer.
NFR-07	Maintainability	Code coverage must be >= 70% (JUnit 5 + Mockito for backend; Jest + RTL for frontend).
NFR-08	Accessibility	Frontend must meet WCAG 2.1 Level AA for color contrast and keyboard navigation.
NFR-09	Usability	All primary user flows (add expense, view charts, download report) must be completable within 3 clicks from the dashboard.
NFR-10	Compatibility	Frontend must render correctly on Chrome 120+, Firefox 120+, Edge 120+, Safari 17+, and mobile viewports >= 375 px.

 
8. System Architecture
8.1 High-Level Architecture
The application follows a classic three-tier architecture separated into presentation, business logic, and data tiers, deployed as containerized services via Docker Compose.

Tier	Components
Presentation Tier	React SPA (HTML5 + CSS3 + Bootstrap 5). Communicates exclusively via REST API calls over HTTPS. Bundled by Vite and served by Nginx in production.
Application Tier	Spring Boot 3 (Java 17). Handles all business logic, JWT authentication, prediction scheduling, PDF/Excel generation, and CORS configuration.
Data Tier	MySQL 8 (primary relational store), MongoDB 7 (audit logs & analytics), PostgreSQL 16 (optional alternative relational store).

8.2 Folder Structure
Backend (Spring Boot)
src/main/java/com/expensetracker/
•	config/          — SecurityConfig, JwtConfig, CorsConfig, SwaggerConfig
•	controller/      — AuthController, ExpenseController, BudgetController, AnalyticsController, ReportController
•	service/         — AuthService, ExpenseService, BudgetService, PredictionService, ReportService
•	repository/      — JPA Repositories (MySQL) + MongoRepository (MongoDB)
•	model/entity/    — User, Category, Expense, Budget, BudgetPrediction (JPA entities)
•	model/document/  — ActivityLog, MonthlyAnalytics (MongoDB documents)
•	dto/             — Request/Response DTOs with Bean Validation annotations
•	security/        — JwtTokenProvider, JwtAuthFilter, UserDetailsServiceImpl
•	scheduler/       — PredictionScheduler (@Scheduled nightly job)
•	exception/       — GlobalExceptionHandler (@ControllerAdvice)

Frontend (React + Vite)
src/
•	components/      — Reusable UI components (Navbar, Sidebar, Card, Modal, Chart wrappers)
•	pages/           — AuthPage, Dashboard, Expenses, Budget, Analytics, Reports
•	hooks/           — useAuth, useExpenses, useBudget, usePrediction
•	services/        — api.js (Axios instance with interceptors), authService.js, expenseService.js
•	context/         — AuthContext (JWT storage and user state)
•	utils/           — formatCurrency, formatDate, chartHelpers
•	assets/          — Images, icons, global CSS

 
9. Security Design
9.1 Authentication Flow
•	User submits credentials to POST /api/v1/auth/login.
•	Spring Security authenticates against BCrypt-hashed password in MySQL.
•	On success, JwtTokenProvider generates an access token (15 min) and refresh token (7 days).
•	Tokens are returned in the response body; the frontend stores the access token in memory (not localStorage) and the refresh token in an HttpOnly cookie.
•	Every subsequent request includes Authorization: Bearer <accessToken> in the header.
•	JwtAuthFilter validates the token, extracts userId and role, and sets the SecurityContext.

9.2 Authorization Matrix
Endpoint Group	USER Role	ADMIN Role
/auth/**	Public	Public
/expenses/**	Own records only	All records
/budgets/**	Own records only	All records
/predictions/**	Own data only	All users
/analytics/**	Own data only	Aggregate data
/admin/**	Forbidden (403)	Full access

 
10. Development Milestones
Phase	Sprint	Deliverables	Duration
1	Sprint 1	Project setup, Docker Compose, DB schema (MySQL + MongoDB), Spring Boot skeleton, React + Vite scaffold.	Week 1–2
2	Sprint 2	Auth module (register, login, JWT), User entity, Security config, Login/Register UI in React.	Week 3–4
3	Sprint 3	Expense CRUD API + React expense list, filter, and add/edit forms. Category management.	Week 5–6
4	Sprint 4	Budget module, real-time alerts, email notifications, budget progress bars in Dashboard.	Week 7–8
5	Sprint 5	Analytics charts (Pie, Bar, Line), MongoDB analytics snapshots, Chart components in React.	Week 9–10
6	Sprint 6	Budget Prediction engine (moving average), scheduler job, Prediction widget on Dashboard.	Week 11–12
7	Sprint 7	PDF and Excel export, Report page in React, Swagger UI integration.	Week 13–14
8	Sprint 8	Testing (JUnit, Jest, Integration tests), Bug fixes, Docker production build, README and GitHub documentation.	Week 15–16

 
11. Acceptance Criteria
11.1 Definition of Done
•	All Must Have functional requirements (FR-01 to FR-25) are implemented and passing.
•	Unit test coverage >= 70% for backend services and frontend components.
•	API documentation available and accurate in Swagger UI at /swagger-ui.html.
•	Docker Compose brings up the full stack (React + Spring Boot + MySQL + MongoDB) with a single docker-compose up command.
•	No critical or high-severity security vulnerabilities detected by OWASP Dependency-Check.
•	README.md contains complete setup instructions, environment variable reference, and architecture diagram.

11.2 Key Test Scenarios
TC-ID	Test Scenario	Expected Result
TC-01	Register with a duplicate email	400 Bad Request with error message
TC-02	Login with correct credentials	200 OK + JWT access token returned
TC-03	Access protected endpoint without token	401 Unauthorized
TC-04	Add expense with negative amount	400 Bad Request – validation error
TC-05	Delete expense owned by another user	403 Forbidden
TC-06	Set budget and spend 81% of limit	In-app alert triggered; email sent
TC-07	Request prediction with < 3 months data	Widget shows 'Not enough data' message
TC-08	Export expenses as Excel for last 30 days	.xlsx file downloaded with correct rows

 
12. Appendix
12.1 Environment Variables
Variable	Example Value	Description
MYSQL_HOST	localhost	MySQL server host
MYSQL_PORT	3306	MySQL port
MYSQL_DB	expense_tracker	Schema/database name
MYSQL_USER	root	MySQL username
MYSQL_PASSWORD	secret123	MySQL password
MONGO_URI	mongodb://localhost:27017/expense_logs	MongoDB connection string
JWT_SECRET	<256-bit base64 key>	HMAC-SHA256 signing key
JWT_EXPIRY_MS	900000	Access token expiry (15 min)
SMTP_HOST	smtp.gmail.com	Email server host
SMTP_PORT	587	SMTP port (TLS)
VITE_API_BASE_URL	http://localhost:8080/api/v1	React env var for API base URL

12.2 Key Dependencies
Backend (pom.xml)
•	spring-boot-starter-web — REST controller support
•	spring-boot-starter-security — Security filter chain
•	spring-boot-starter-data-jpa — ORM / Hibernate
•	spring-boot-starter-data-mongodb — MongoDB integration
•	spring-boot-starter-mail — Email notifications
•	jjwt-api / jjwt-impl / jjwt-jackson — JWT generation and validation
•	mysql-connector-j — MySQL JDBC driver
•	postgresql — PostgreSQL JDBC driver
•	lombok — Boilerplate reduction
•	modelmapper — DTO-entity mapping
•	itext7-core / Apache POI — PDF and Excel generation
•	springdoc-openapi-starter-webmvc-ui — Swagger UI

Frontend (package.json)
•	react + react-dom — UI framework
•	react-router-dom — Client-side routing
•	axios — HTTP client with interceptors
•	recharts — Pie, Bar, Line chart components
•	bootstrap + react-bootstrap — Responsive UI grid and components
•	react-hook-form — Form state and validation
•	date-fns — Date formatting utilities

12.3 References
•	Spring Boot Documentation: https://docs.spring.io/spring-boot/docs/current/reference/html/
•	React Documentation: https://react.dev/
•	JWT Standard: RFC 7519 — https://tools.ietf.org/html/rfc7519
•	Bootstrap 5: https://getbootstrap.com/docs/5.3/
•	MongoDB Manual: https://www.mongodb.com/docs/manual/
•	MySQL 8 Reference: https://dev.mysql.com/doc/refman/8.0/en/

                                     ##— End of Document -

