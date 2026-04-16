# db

A Node.js REST API with JWT authentication and a SQLite database.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```
PORT=3000
JWT_SECRET=your_secret_key
SALT_ROUNDS=10
```

### 3. Run the server

**Development** (with auto-restart on file changes):

```bash
npm run dev
```

**Production:**

```bash
node index.js
```

The server will start on `http://localhost:3000` (or the port set in `.env`).

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Log in and receive a JWT |

### Protected Routes

Include the JWT in the `Authorization` header as a Bearer token:

```
Authorization: Bearer <token>
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| * | `/admin/*` | Admin-only routes |
| * | `/*` | Authenticated user routes |
