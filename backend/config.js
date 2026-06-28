// config.js — налаштування
// OPENAI_API_KEY задається через змінну оточення (Render Dashboard → Environment Variables)
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const PORT = process.env.PORT || 3001;
export const MODEL = process.env.MODEL || 'gpt-5-nano-2025-08-07';
