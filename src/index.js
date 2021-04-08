// dependencies
const express=require("express");
const dotenv=require("dotenv");
const bodyParser=require("body-parser");
const morgan=require("morgan");

// routers
const taskRoutes=require("./routes/taskRoutes");
const contactRoutes=require("./routes/contactRoutes");

// utils
dotenv.config();
const app = express();
const PORT = process.env.NODE_PORT||3000;
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(taskRoutes);
app.use(contactRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
