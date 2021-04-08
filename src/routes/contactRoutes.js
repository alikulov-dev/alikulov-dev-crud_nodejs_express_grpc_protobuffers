const { Router }=require("express");
const client=require("../grpc/client.js");
const clientcontact=client.clientcontact;

const router = Router();

router.get("/Contacts", (req, res) => {
  clientcontact.getAll(null, (err, data) => {
    if (!err) {
      res.json(data);
    }
    console.log(err);
  });
});

router.post("/addContact", (req, res) => {
  const { name, contact } = req.body;
  const ContactObj = { name, contact };
  clientcontact.insert(ContactObj, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});

router.put("/updateContact", (req, res) => {
  const { name, contact } = req.body;
  const ContactObj = { name, contact };
  clientcontact.update(ContactObj, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});

router.post("/deleteContact", (req, res) => {
  const { id } = req.body;
  clientcontact.remove({ id }, (err, _) => {
    err ? console.log(err) : res.json({ data: "Contact Removed" });
  });
});

module.exports=router;
