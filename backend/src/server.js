import express from 'express';

const app = express();

app.get('/app/health', (req, res) => {
  res.status(200).json({ message: 'Success' });
});

app.listen(3000, () => console.log('Server is up in prot 3000'));
