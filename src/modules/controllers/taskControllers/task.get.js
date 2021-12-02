import fs from 'fs';
import db from '../../../../tasks.json';

const allTask = (req, res) => {
  res.send(db);
}

export default allTask;