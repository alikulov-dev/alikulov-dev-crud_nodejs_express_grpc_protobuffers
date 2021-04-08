const { Router }=require("express");
const clientjs=require("../grpc/client.js");
const client=clientjs.client;

const router = Router();

router.get("/Tasks", (req, res) => {
  client.getAll(null, (err, data) => {
    if (!err) {
      res.json(data);
    }
    console.log(err);
  });
});

router.post("/addTask", (req, res) => {
  const { name, contact_id } = req.body;
  const TaskObj = { name, contact_id };
  // console.log(TaskObj);
  // console.log("shotgacha kelybdi");
  client.insert(TaskObj, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});

router.put("/updateTask", (req, res) => {
  const { name, contact_id } = req.body;
  const TaskObj = { name, contact_id };
  client.update(TaskObj, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});

router.post("/deleteTask", (req, res) => {
  const { id } = req.body;
  client.remove({ id }, (err, _) => {
    err ? console.log(err) : res.json({ data: "Task Removed" });
  });
});

module.exports=router;
