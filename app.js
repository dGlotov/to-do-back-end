import express, { json, urlencoded } from 'express';
import cors from 'cors';
import apiRoutes from './src/modules/routes/task.js';
import dotenv from "dotenv"
const app = express();

dotenv.config();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }))
app.use('/', apiRoutes);

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Example!!! listening on port ${PORT}`);
});