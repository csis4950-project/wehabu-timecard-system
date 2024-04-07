# Wehabu Timecard System

Wehabu Timecard is a clock in/out system built with Next.js, integrated within the Wehabu Platform.

Site Link: Wehabu Timecard System - https://wehabu-timecard-system.vercel.app/

## 1 Technologies

- Next.js (14.1.0)
- Prisma ORM
- Sass

## 2.Installation

### 1.1 Environment Variables

#### Create .env file in the root directory

- DATABASE_URL: CockroachDB database url
- JWT_SECRET: Secret key to encrypt user session
- API_URL: Domain url

### 1.2 Install Commands

Make sure environment variables are properly set

#### Wehabu Timecard System

```sh
# Clone repository
git clone https://github.com/csis4950-project/wehabu-timecard-system.git

cd wehabu-timecard-system

# Install dependencies
npm i

# Load database models
npx prisma generate

# Run application
npm run dev
```
