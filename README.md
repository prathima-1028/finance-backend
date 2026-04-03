# Finance Data Processing & Access Control Backend

🚀 **Engineering Assessment – Zorvyn FinTech**  
High-performance, secure backend for financial data orchestration. Implements **Role-Based Access Control (RBAC)** and optimized financial aggregations.

---

## Live Demo / API Docs
- **Deployed API:** [https://finance-backend.onrender.com](https://finance-backend.onrender.com)  
- **Swagger Documentation:** [https://finance-backend.onrender.com/api-docs](https://finance-backend.onrender.com/api-docs)  

---

## Features
- ✅ User and Role Management (Admin, Analyst, Viewer)  
- ✅ Financial Records CRUD  
- ✅ Record Filtering by Date, Category, Type  
- ✅ Dashboard Summary APIs (Income, Expense, Balance)  
- ✅ Role-Based Access Control (RBAC)  
- ✅ Input Validation and Error Handling  
- ✅ Data Persistence with SQLite  
- ⚡ Soft deletes for auditability (`is_deleted` flag)  
- ⚡ SQL-level aggregations for performance  

---

## System Architecture

**Service Layer Pattern:**  
Sequest → Routing → Middleware (Auth/RBAC) → Controllers → Services → Models → Database

**Why this architecture?**  
- Testability: Business logic isolated in Services.  
- Maintainability: Database changes impact only Models.  
- Security: Centralized middleware ensures consistent authorization.  

**Access Control Matrix:**

| Feature | Viewer | Analyst | Admin |
|---------|-------|--------|-------|
| Dashboard Summary | ✅ | ✅ | ✅ |
| View Records | ❌ | ✅ | ✅ |
| Filter Records | ❌ | ✅ | ✅ |
| Create / Delete Records | ❌ | ❌ | ✅ |
| User Management | ❌ | ❌ | ✅ |

---

## Tech Stack
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** SQLite (better-sqlite3)  
- **Authentication:** JWT  
- **Security:** bcrypt (password hashing, salt rounds 10)  
- **Architecture:** Service Layer Pattern  
- **Deployment:** Render  

---

## Setup Instructions

```bash
# Clone the repository
git clone https://github.com/prathima-1028/finance-backend.git
cd finance-backend

# Install dependencies
npm install

# Start development server
npx nodemon app.js
Environment Variables

Create a .env file in the project root:

PORT=5000
JWT_SECRET=your_secure_random_key
Technical Decisions & Trade-offs
Node.js + Express: Scalable, modular, widely used.
SQLite: Lightweight, easy to deploy.
Service Layer Architecture: Clean separation of concerns.
JWT Authentication: Stateless and secure.
RBAC Enforcement in Middleware: Consistent authorization.
Soft Deletes: Keeps audit trail and allows recovery.
SQL-level Aggregation: Optimized dashboard queries.
Trade-offs: SQLite over Postgres/MySQL for simplicity; future improvements include caching, rate-limiting, multi-tenant support.
Future Enhancements
Redis caching for dashboard APIs
Rate limiting for API protection
User-level data ownership for multi-tenant support
API versioning for backward compatibility
Advanced analytics and reporting
Author

Prathima Koyilada