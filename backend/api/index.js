import express from 'express';
import serverless from 'serverless-http';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';

import { ENV } from '../src/config/env.js';
import { connectDB } from '../src/config/db.js';
import { functions, inngest } from '../src/config/inngest.js';

const app = express();

/* ----------------- Middleware ----------------- */
app.use(express.json());
app.use(clerkMiddleware());

/* ----------------- Inngest ----------------- */
app.use('/api/inngest', serve({ client: inngest, functions }));

/* ----------------- Health Check ----------------- */
app.get('/app/health', (req, res) => {
  res.status(200).json({ message: 'Success' });
});

/* ----------------- DB Connection ----------------- */
let isConnected = false;

async function ensureDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

/* ----------------- Wrap handler ----------------- */
export default serverless(async (req, res) => {
  await ensureDB();
  return app(req, res);
});
