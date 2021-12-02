import fs from 'fs';
import db from '../../../../tasks.json';
import { randomUUID } from "crypto";

const createTask = (req, res) => {
  try {
    if (!req.body.name) throw { message: "Bad request"};

    const name =  req.body.name;
    
    if (name.lenght < 2) throw { message: "Need more symbols"};
    
    db.forEach(item => {
      if (item.name === name) throw { message: "This name already exists"}
    })
    
    const task = {
      uuid: randomUUID(),
      name,
      done: false,
      created_at: new Date(),
    };
  
    db.push(task);
  
    fs.writeFileSync("tasks.json", JSON.stringify(db));
    res.send(task);

  }
  catch(err) {
    if (!err.message) {
      res.json({message: "Bad request"})
    } else res.send(err);
  }
}

export default createTask;