const mongoose=require("mongoose");

const contactSchema = mongoose.Schema({
  name: String,
  contact: String
});

const Contact = mongoose.model("contact", contactSchema);

module.exports=Contact;
