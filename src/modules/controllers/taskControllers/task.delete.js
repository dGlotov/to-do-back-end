import fs from 'fs';
import tasks from '../../../../tasks.json' 

const deleteTask = (req, res) => {
  try {
    if (!req.params.id) throw {message: "Id not passed"}

    tasks.forEach(item => {
      if (item.uuid !== req.params.id) throw { message: "Bad id"}
    })
  
    const newArr = tasks.filter(element => element.uuid != req.params.id);
  
    fs.writeFileSync("tasks.json", JSON.stringify(newArr));
  }
  catch (err) {
    err.message
      ? res.json({message: "Bad request"})
      : res.json(err);
  }
}

export default deleteTask;