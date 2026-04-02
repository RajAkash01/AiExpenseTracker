# AI Expense Tracker

A full-stack expense tracking app that uses AI to parse natural language input and automatically categorize expenses.

## Tech Stack

- **Mobile:** React Native 0.79, Expo SDK 54, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** SQLite (better-sqlite3)
- **AI:** Groq API (llama-3.1-70b-versatile)

## Demo

[Link to screen recording — add after recording]

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo Go app on your phone
- Groq API key (free at console.groq.com)

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your Groq API key to .env
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npx expo start
# Scan QR code with Expo Go app
```

## How It Works

1. Type an expense in plain English (e.g., "Spent 850 on lunch at Taj")
2. AI extracts the amount, category, description, and merchant
3. Expense is saved to SQLite database
4. View, refresh, and delete expenses from the mobile app
