const mongoose=require("mongoose");

const taskSchema = mongoose.Schema({
  name: String,
  contact_id: String
});

const Task = mongoose.model("task", taskSchema);

module.exports=Task;
