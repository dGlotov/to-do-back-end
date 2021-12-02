import express, { json, urlencoded } from 'express';
import cors from 'cors';
import apiRoutes from './src/modules/routes/index.js';
const app = express();


app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }))
app.use('/', apiRoutes);

app.listen(8000, () => {
  console.log('Example!!!');
});