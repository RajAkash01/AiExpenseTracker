# AI Expense Tracker

Type your expenses in plain English like **"Spent 850 on lunch at Taj"** and AI will automatically figure out the amount, category, merchant, and description for you. No forms, no dropdowns — just type and go.

## What Does This App Do?

1. You type something like **"uber to airport 450"** in the app
2. AI reads your text and extracts:
   - **Amount:** 450
   - **Category:** Transport
   - **Merchant:** Uber
   - **Description:** Uber to airport
3. The expense gets saved and shows up in your list
4. You can pull down to refresh, or swipe to delete any expense

## Tech Stack

| Part       | Technology                                      |
|------------|-------------------------------------------------|
| Mobile App | React Native 0.81, Expo SDK 54, TypeScript      |
| Backend    | Node.js, Express 5, TypeScript                  |
| Database   | SQLite (via better-sqlite3)                      |
| AI Engine  | Groq API — llama-3.3-70b-versatile (free tier)  |

## How to Run This Project (Step by Step)

### What You Need Before Starting

Make sure you have these installed on your computer:

1. **Node.js** (version 18 or higher) — [download here](https://nodejs.org)
2. **npm** (comes with Node.js)
3. **Expo Go app** on your phone — download from [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) or [App Store](https://apps.apple.com/app/expo-go/id982107779)
4. **A Groq API key** (free) — get one at [console.groq.com](https://console.groq.com)

To check if Node.js is installed, open a terminal and run:
```bash
node --version
```
You should see something like `v18.x.x` or higher.

---

### Step 1: Clone or Download the Project

If you have the zip file, extract it. If it's on GitHub:
```bash
git clone <your-repo-url>
cd ai-expense-tracker
```

---

### Step 2: Set Up the Backend

The backend is the server that handles saving expenses and talking to the AI.

**2a. Go to the backend folder:**
```bash
cd backend
```

**2b. Install the required packages:**
```bash
npm install
```
This will download all the libraries the backend needs. Wait until it finishes.

**2c. Create your environment file:**

Copy the example file:
```bash
cp .env.example .env
```

> **On Windows (if `cp` doesn't work):** Just copy the file `.env.example` and rename the copy to `.env`

**2d. Add your Groq API key:**

Open the `.env` file in any text editor. It looks like this:
```
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
```

Replace `your_groq_api_key_here` with your actual API key from [console.groq.com](https://console.groq.com). For example:
```
PORT=3000
GROQ_API_KEY=gsk_abc123xyz456...
```

> **Don't have an API key?** Go to [console.groq.com](https://console.groq.com), sign up for free, go to "API Keys" in the sidebar, and create a new key.

**2e. Build the TypeScript code:**
```bash
npm run build
```
This compiles all TypeScript files into JavaScript inside the `dist/` folder. You should see no errors.

**2f. Start the backend server:**

For **development** (auto-restarts when you edit files):
```bash
npm run dev
```

For **production** (uses the compiled code from step 2e):
```bash
npm start
```

Either way, you should see:
```
Server running on port 3000
```

**2g. Test that it's working:**

Open a new terminal (keep the backend running) and run:
```bash
curl http://localhost:3000/health
```

You should see:
```json
{"status":"ok","timestamp":"2025-..."}
```

If you see this, the backend is working. Keep this terminal running.

---

### Step 3: Set Up the Mobile App

Open a **new terminal window** (don't close the backend one).

**3a. Go to the mobile folder:**
```bash
cd mobile
```
(If you're in the project root, run `cd mobile`. If you're in the backend folder, run `cd ../mobile`.)

**3b. Install the required packages:**
```bash
npm install
```

**3c. Start the Expo development server:**
```bash
npx expo start
```

You'll see a QR code in the terminal.

**3d. Open the app on your phone:**

- Open the **Expo Go** app on your phone
- Scan the QR code shown in the terminal
- The app should load on your phone

> **Important:** Your phone and computer must be on the **same Wi-Fi network**.

---

### Step 4: Connect the Mobile App to the Backend

By default, the mobile app tries to connect to `http://10.0.2.2:3000` which only works on Android emulators.

**If you're using a physical phone (most common):**

1. Find your computer's local IP address:
   - **Windows:** Open terminal, run `ipconfig`, look for `IPv4 Address` (e.g., `192.168.1.105`)
   - **Mac:** Open terminal, run `ifconfig | grep inet`, look for `192.168.x.x`
2. Open the file `mobile/src/services/api.ts`
3. Change line 5 from:
   ```typescript
   const API_BASE_URL = 'http://10.0.2.2:3000';
   ```
   To your computer's IP:
   ```typescript
   const API_BASE_URL = 'http://192.168.1.105:3000';
   ```
   (Replace `192.168.1.105` with YOUR actual IP address)

4. Save the file. The app will auto-reload.

**If you're using Android Emulator:** The default `10.0.2.2` should work — no changes needed.

**If you're using iOS Simulator:** Change the URL to `http://localhost:3000`.

---

### Step 5: Try It Out!

1. Type **"Spent 500 on coffee at Starbucks"** in the input box
2. Tap **"Add Expense"**
3. Wait 1-2 seconds for the AI to process
4. You should see a green success card with the parsed details
5. The expense will appear in the list below

**More things to try:**
- `"uber to airport 450"` — categorized as Transport
- `"Netflix 649"` — categorized as Entertainment
- `"bought shoes 4500"` — categorized as Shopping
- `"electricity bill 2300"` — categorized as Bills & Utilities
- `"coffee"` (without amount) — should show an error

---

## Project Structure

```
ai-expense-tracker/
│
├── backend/                    # The server (runs on your computer)
│   ├── src/
│   │   ├── index.ts            # Starts the Express server
│   │   ├── routes/
│   │   │   └── expenses.ts     # API endpoints (add, list, delete)
│   │   ├── services/
│   │   │   ├── ai.ts           # Talks to Groq AI to parse expenses
│   │   │   └── database.ts     # Saves/reads expenses from SQLite
│   │   └── types/
│   │       └── index.ts        # TypeScript type definitions
│   ├── .env                    # Your secret API key (never share this)
│   └── .env.example            # Template for .env
│
├── mobile/                     # The phone app
│   ├── App.tsx                 # App entry point
│   └── src/
│       ├── components/
│       │   ├── ExpenseInput.tsx # Text input + Add button
│       │   ├── SuccessCard.tsx  # Green card shown after adding
│       │   ├── ExpenseItem.tsx  # Single expense row in the list
│       │   └── ExpenseList.tsx  # Scrollable list of expenses
│       ├── screens/
│       │   └── ExpenseTrackerScreen.tsx  # Main screen (ties everything together)
│       ├── services/
│       │   └── api.ts          # Calls the backend API
│       ├── theme/
│       │   └── index.ts        # Colors, fonts, spacing, shadows
│       └── types/
│           └── index.ts        # TypeScript type definitions
│
└── README.md                   # This file
```

## API Endpoints

The backend exposes 3 endpoints:

| Method | URL                   | What It Does                          |
|--------|-----------------------|---------------------------------------|
| POST   | `/api/expenses`       | Add a new expense (send natural language text) |
| GET    | `/api/expenses`       | Get all saved expenses (newest first) |
| DELETE | `/api/expenses/:id`   | Delete a specific expense by its ID   |

**Example — Adding an expense with curl:**
```bash
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"input": "Spent 850 on lunch at Taj"}'
```

## Supported Categories

| Emoji | Category         | Examples                                    |
|-------|------------------|---------------------------------------------|
| 🍔    | Food & Dining    | Restaurants, cafes, food delivery, groceries |
| 🚗    | Transport        | Uber, Ola, taxi, fuel, parking, metro       |
| 🛒    | Shopping         | Clothes, electronics, Amazon, Flipkart      |
| 📺    | Entertainment    | Movies, Netflix, Spotify, games             |
| 📄    | Bills & Utilities| Electricity, water, internet, phone         |
| 💊    | Health           | Medicine, doctor, gym, pharmacy             |
| ✈️    | Travel           | Flights, hotels, trips                      |
| 📦    | Other            | Anything that doesn't fit above             |

## AI Prompt Design

The backend uses this system prompt to tell the AI how to parse expenses:

> "You are an expense parser. Extract expense information from natural language input. Respond ONLY with valid JSON containing amount, currency, category, description, and merchant."

**Why this works well:**
- **JSON-only output** — the AI returns structured data we can directly save to the database
- **Explicit category list** — prevents the AI from inventing its own categories
- **Default values** — if no currency is mentioned, it defaults to INR; if category is unclear, it defaults to "Other"
- **Error handling** — if the AI can't find an amount, it returns an error message instead of guessing

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm run dev` fails with "GROQ_API_KEY" error | Make sure you created the `.env` file and added your API key |
| App shows "Network Error" | Check that the backend is running AND the API_BASE_URL in `api.ts` matches your computer's IP |
| App loads but expenses don't appear | Pull down to refresh the list |
| AI returns wrong categories | This is normal occasionally — the AI is not 100% perfect |
| `expo start` shows errors | Try deleting `node_modules` and running `npm install` again |
| Phone can't scan QR code | Make sure phone and computer are on the same Wi-Fi network |

## AI Tools Used

- **Groq API** (llama-3.3-70b-versatile) — Parses natural language into structured expense data
- **Claude Code** — Used for code generation and development assistance

## License

MIT — Feel free to use this for your own projects!
