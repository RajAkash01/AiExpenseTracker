import { Expense } from '../types';

// For Android emulator use 10.0.2.2
// For physical device via Expo Go, replace with your machine's LAN IP, e.g., http://192.168.1.100:3000
const API_BASE_URL = 'http://10.0.2.2:3000';

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

export async function addExpense(input: string): Promise<Expense> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to add expense');
  }
  return data.expense;
}

export async function getExpenses(): Promise<Expense[]> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/expenses`);
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch expenses');
  }
  return data.expenses;
}

export async function deleteExpense(id: number): Promise<void> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/expenses/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to delete expense');
  }
}
