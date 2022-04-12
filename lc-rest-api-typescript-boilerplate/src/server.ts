// server.js
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import cors from 'cors';

import setupRoutes from './routes';

const app = express();
const port : number = 8000;
app.use(express.json());

app.use(cors());

// database
mongoose
  .connect('mongodb://127.0.0.1:27017/wilderdb', {
    autoIndex: true,
  })
  .then(() => console.log('Connected to database'))
  .catch((err : unknown) => console.log(err));

setupRoutes(app);

app.use((req: Request, res: Response) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => console.log(`Server started on ${port}`));
