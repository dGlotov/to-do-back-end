import fs from 'fs';
import tasks from '../../../../tasks.json';

const changeTask = (req, res) => {
  try {
    if(!req.body || !req.params.id) throw {message: "Bad request"};
    
    const {name, done} =  req.body;
    
    if (name.lenght < 2) throw { message: "Need more symbols"};
    
    tasks.forEach(item => {
      if (item.name === name || item.uuid !== req.params.id) throw { message: "This name already exists or bad id"}
    })

    tasks.forEach(item => {
      if (item.uuid === req.params.id) {
        item.name = name || item.name;
        item.done = done || item.done;
        res.json(item);
        return fs.writeFileSync("tasks.json", JSON.stringify(tasks));
      } 
    })
  }
  catch (err) {
    err.message
    ? res.json({message: "Bad request"})
    : res.json(err);
  }
}

export default changeTask;
