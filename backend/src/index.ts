import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { initDatabase } from './services/database';
import expenseRoutes from './routes/expenses';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/expenses', expenseRoutes);

initDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
