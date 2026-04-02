import Groq from 'groq-sdk';
import { ParsedExpense } from '../types';

const VALID_CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Health',
  'Travel',
  'Other',
] as const;

const SYSTEM_PROMPT = `You are an expense parser. Extract expense information from natural language input.

RULES:
1. Extract the amount as a number (no currency symbols)
2. Default currency is INR unless explicitly mentioned (USD, EUR, etc.)
3. Categorize into EXACTLY one of these categories:
   - Food & Dining (restaurants, cafes, food delivery, groceries)
   - Transport (uber, ola, taxi, fuel, parking, metro)
   - Shopping (clothes, electronics, amazon, flipkart)
   - Entertainment (movies, netflix, spotify, games)
   - Bills & Utilities (electricity, water, internet, phone)
   - Health (medicine, doctor, gym, pharmacy)
   - Travel (flights, hotels, trips)
   - Other (anything that doesn't fit above)
4. Description should be a clean summary (not the raw input)
5. Merchant is the company/store name if mentioned, null otherwise

RESPOND ONLY WITH VALID JSON, no other text:
{
  "amount": <number>,
  "currency": "<string>",
  "category": "<string>",
  "description": "<string>",
  "merchant": "<string or null>"
}

If the input is invalid or you cannot extract an amount, respond:
{
  "error": "Could not parse expense. Please include an amount.",
  "amount": null
}`;

export async function parseExpense(text: string): Promise<ParsedExpense> {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      max_tokens: 256,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI service');
    }

    const parsed = JSON.parse(content);

    if (parsed.error || parsed.amount === null || parsed.amount === undefined) {
      throw new Error(parsed.error || 'Could not parse expense. Please include an amount.');
    }

    const amount = Number(parsed.amount);
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Invalid amount. Please provide a positive number.');
    }

    const category = VALID_CATEGORIES.includes(parsed.category)
      ? parsed.category
      : 'Other';

    return {
      amount,
      currency: typeof parsed.currency === 'string' ? parsed.currency : 'INR',
      category,
      description: typeof parsed.description === 'string' ? parsed.description : text,
      merchant: typeof parsed.merchant === 'string' ? parsed.merchant : null,
    };
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      throw new Error('AI returned invalid response. Please try again.');
    }
    throw error;
  }
}
