import { Router, Request, Response } from 'express';
import { parseExpense } from '../services/ai';
import { createExpense, getAllExpenses, deleteExpense } from '../services/database';

const router = Router();

// POST /api/expenses
router.post('/', async (req: Request, res: Response) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== 'string' || !input.trim()) {
      res.status(400).json({ success: false, error: 'Please provide an expense description' });
      return;
    }

    const parsed = await parseExpense(input.trim());
    const expense = createExpense({ ...parsed, original_input: input.trim() });

    res.status(201).json({ success: true, expense });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Failed to parse expense' });
  }
});

// GET /api/expenses
router.get('/', (_req: Request, res: Response) => {
  try {
    const expenses = getAllExpenses();
    res.status(200).json({ success: true, expenses });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// DELETE /api/expenses/:id
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      res.status(400).json({ success: false, error: 'Invalid expense ID' });
      return;
    }

    const deleted = deleteExpense(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: 'Expense not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Expense deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
