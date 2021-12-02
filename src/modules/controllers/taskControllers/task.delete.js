import fs from 'fs';
import db from '../../../../tasks.json' 

const deleteTask = (req, res) => {
  try {
    if (!req.params.id) throw {message: "Bad request"}

    db.forEach(item => {
      if (item.uuid !== req.params.id) throw { message: "Bad id"}
    })
  
    const newArr = db.filter(element => element.uuid != req.params.id);
  
    fs.writeFileSync("tasks.json", JSON.stringify(newArr));
  }
  catch (err) {
    if (!err.message) {
      res.json({message: "Bad request"})
    } else res.send(err);
  }
}

export default deleteTask;