import express from 'express';
import cors from 'cors';
import colors, { black } from 'colors';
import * as dotenv from 'dotenv';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Port = process.env.PORT || 5022;

app.listen(() => {
  console.log(`server running on port: ${Port}`.bgCyan);
});

black;
