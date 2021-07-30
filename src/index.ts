require('tsconfig-paths/register');
import { join } from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '../.env') });
const PORT = process.env.PORT || 3000;
import express from 'express';
import cors from 'cors';

async function main() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => res.send('Hello'));

  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
}

main();
