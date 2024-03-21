import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { readTweets } from './readtweets';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/readTweets', async (req, res) => {
  try {
    const tweets = await readTweets();
    res.json({ tweets });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});