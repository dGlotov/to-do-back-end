const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./src/modules/routes/index.js');


app.use(cors());
app.use(express.json());
app.use('/', apiRoutes);

app.listen(8000, () => {
  console.log('Example!!!');
});