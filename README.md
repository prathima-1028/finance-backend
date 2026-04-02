# 💰 Finance Data Processing & Access Control Backend

### 🚀 Engineering Assessment – Zorvyn FinTech

A high-performance, security-first backend system designed for financial data orchestration.
This project goes beyond basic CRUD by implementing **enterprise-grade Role-Based Access Control (RBAC)** and **optimized data aggregation for real-time financial insights**.

---

## 🏗️ System Architecture: Service Layer Pattern

The system follows a clean, decoupled layered architecture:

```text
Request → Routing → Middleware (Auth/RBAC) → Controllers → Services → Models → Database
```

### 🧠 Why this Architecture?

* **Testability** → Business logic in Services can be tested independently
* **Maintainability** → Database changes affect only the Models layer
* **Security** → Centralized middleware prevents unauthorized access

---

## 🔐 Security & Access Control Matrix

The system uses **JWT-based stateless authentication** with role-driven authorization.

| Feature                 | Viewer | Analyst | Admin |
| ----------------------- | ------ | ------- | ----- |
| Dashboard Summary       | ✅      | ✅       | ✅     |
| View Records            | ❌      | ✅       | ✅     |
| Filter Records          | ❌      | ✅       | ✅     |
| Create / Delete Records | ❌      | ❌       | ✅     |
| User Management         | ❌      | ❌       | ✅     |

👉 Access control is enforced at middleware level for consistency and security.

---

## 🛠️ Advanced Engineering Highlights

### ⚡ Optimized Financial Aggregations

* Uses **SQL-level aggregation (SUM, GROUP BY)** instead of JavaScript loops
* Reduces memory usage and improves performance

---

### 📄 Scalable Pagination & Filtering

* Implemented **LIMIT & OFFSET pagination**
* Supports dynamic filtering:

  * Category
  * Type (Income / Expense)
  * Date

👉 Prevents performance issues as data scales

---

### 🧹 Audit-Ready Soft Deletes

* Uses `is_deleted` flag instead of permanent deletion
* Ensures **data recovery and audit trail support**

---

### 🔒 Identity & Data Integrity

* Password hashing using **bcrypt (salt rounds: 10)**
* JWT for secure authentication
* Input validation for:

  * Amount (numeric)
  * Date (ISO format)

---

## 🧪 Core API Specification

| Method | Endpoint           | Access   | Description                                  |
| ------ | ------------------ | -------- | -------------------------------------------- |
| POST   | /auth/login        | Public   | Generate JWT token                           |
| GET    | /dashboard/summary | All      | Financial summary (income, expense, balance) |
| GET    | /records           | Analyst+ | Paginated & filtered records                 |
| POST   | /records           | Admin    | Create financial record                      |
| PATCH  | /users/:id         | Admin    | Update user status                           |

---

## ⚙️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite
* **Authentication:** JWT
* **Security:** bcrypt
* **Architecture:** Service Layer Pattern

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/YOUR_USERNAME/finance-backend
cd finance-backend
npm install
npx nodemon app.js
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_secure_random_key
```

---

## 📈 Future Scalability

* Data ownership (user-level access control)
* Rate limiting for API protection
* Swagger/OpenAPI documentation
* Redis caching for dashboard APIs
* Deployment (AWS / Render)

---

## 👩‍💻 Author

**Prathima Koyilada**

---

## ⭐ Final Note

This project demonstrates **real-world backend engineering principles**, including:

* Clean architecture design
* Secure authentication & authorization
* Efficient data processing
* Scalable API development

The focus was on building a backend that is not just functional, but **structured, secure, and production-ready in design**.
