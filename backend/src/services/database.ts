import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { Expense, ExpenseInput } from '../types';

const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, 'expenses.db'));

export function initDatabase(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      currency TEXT NOT NULL DEFAULT 'INR',
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      merchant TEXT,
      original_input TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
}

export function createExpense(input: ExpenseInput): Expense {
  const stmt = db.prepare(`
    INSERT INTO expenses (amount, currency, category, description, merchant, original_input)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    input.amount,
    input.currency,
    input.category,
    input.description,
    input.merchant,
    input.original_input
  );
  const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(result.lastInsertRowid) as Expense;
  return expense;
}

export function getAllExpenses(): Expense[] {
  const expenses = db.prepare('SELECT * FROM expenses ORDER BY created_at DESC').all() as Expense[];
  return expenses;
}

export function deleteExpense(id: number): boolean {
  const stmt = db.prepare('DELETE FROM expenses WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}
