import express from 'express';
import path from 'path';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';

const app = express();

const __dirname = path.resolve();

app.use(clerkMiddleware());

app.get('/app/health', (req, res) => {
  res.status(200).json({ message: 'Success' });
});

if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../admin/dist')));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin', 'dist', 'index.html'));
  });
}

connectDB()
  .then(() => {
    app.listen(ENV.PORT, () => {
      console.log(`Server is up and running on port ${ENV.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
