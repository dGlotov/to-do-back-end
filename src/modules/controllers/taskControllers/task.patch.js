import fs from 'fs';
import db from '../../../../tasks.json';

const changeTask = (req, res) => {
  try {
    if(!req.body || !req.params.id) throw {message: "Bad request"};
    
    const {name, done} =  req.body;
    
    if (name.lenght < 2) throw { message: "Need more symbols"};
    
    db.forEach(item => {
      if (item.name === name || item.uuid !== req.params.id) throw { message: "This name already exists or bad id"}
    })

    db.forEach(item => {
      if (item.uuid === req.params.id) {
        item.name = name || item.name;
        item.done = done || item.done;
        res.send(item);
        return fs.writeFileSync("tasks.json", JSON.stringify(db));
      } 
    })
  }
  catch (err) {
    if (!err.message) {
      res.json({message: "Bad request"})
    } else res.send(err);
  }
}

export default changeTask;
