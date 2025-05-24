import type { VercelRequest, VercelResponse } from '@vercel/node';
import { bot } from '../src/bot';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(200).send('Only POST requests are accepted');
  }

  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const update = JSON.parse(body);
        await bot.handleUpdate(update);
        res.status(200).send('ok');
      } catch (err) {
        console.error('Failed to handle update:', err);
        res.status(200).send('ok');
      }
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(200).send('ok');
  }
}