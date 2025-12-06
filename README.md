# hmcts-task-app

A simple task application built with **Spring Boot** (backend API) and **React** (frontend UI).  
The backend API lives in the `backend/` folder and uses **Docker** to run a **PostgreSQL** database.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Docker** (to run PostgreSQL)
- **Java + Maven** (to run the Spring Boot backend)
- **Node.js + npm** (to run the React frontend)

---

### 1) Start the PostgreSQL database (Docker)

Run the database container:

```bash
docker run --name tasks-db \
  -e POSTGRES_DB=tasks \
  -e POSTGRES_USER=tasks \
  -e POSTGRES_PASSWORD=tasks \
  -p 5432:5432 \
  -d postgres:16
```

### 2) Start the Spring Boot backend API

```bash
cd backend
mvn spring-boot:run
```
The backend will be available at:
```bash
http://localhost:8080
```

### 3) Start the frontend app

```bash
cd frontend
npm install
npm run dev
```
The frontend will typically run at:
```bash
http://localhost:5173
```
