const grpc=require("@grpc/grpc-js");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const { loadSync }=require("@grpc/proto-loader");
const Task=require("../models/Task");
const Contact=require("../models/Contact");

dotenv.config();

const PROTO_PATH = "./tasks.proto";
const PROTO_PATH_CONTACT = "./contacts.proto";
const GRPC_PORT = process.env.GRPC_PORT||30043;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;

mongoose.connect(`mongodb://localhost:27017/RoadmapSix`,
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
},
(err) => {
    if (err) {
        throw Error(err);
    }
    console.log('connect DB')
});

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const packageDefinitionforcontact = loadSync(PROTO_PATH_CONTACT, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});

let tasks = grpc.loadPackageDefinition(packageDefinition);
let contacts = grpc.loadPackageDefinition(packageDefinitionforcontact);

const server = new grpc.Server();

server.addService(tasks.TaskService.service, {
  getAll: (_, callback) => {
    Task.find().exec((err, blogs) => {
      err ? console.log(err) : callback(null, { blogs });
    });
  },
  get: (call, callback) => {
    const { id } = call.request;
    Task.find({ _id: id }).exec((err, blog) => {
      err
        ? console.log(err)
        : blog
        ? callback(null, blog)
        : callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
    });
  },
  insert: (call, callback) => {
    const task = call.request;
    console.log(task);
    Task.create(task, (err, createdBlog) => {
      err ? console.log(err) : callback(null, createdBlog);
    });
  },
  update: (call, callback) => {
    const { id, name, contact_id } = call.request;
    Task.findOneAndUpdate(
      { _id: id },
      { name: name, contact_id: contact_id }
    ).exec((err, updatedBlog) => {
      err ? console.log(err) : callback(null, updatedBlog);
    });
  },
  remove: (call, callback) => {
    const { id } = call.request;
    Task.findOneAndDelete({ _id: id }).exec((err) => {
      if (err) {
        console.log(err);
        callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
      } else {
        callback(null, {});
      }
    });
  },
});
server.addService(contacts.ContactService.service, {
  getAll: (_, callback) => {
    Contact.find().exec((err, blogs) => {
      err ? console.log(err) : callback(null, { blogs });
    });
  },
  get: (call, callback) => {
    const { id } = call.request;
    Contact.find({ _id: id }).exec((err, blog) => {
      err
        ? console.log(err)
        : blog
        ? callback(null, blog)
        : callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
    });
  },
  insert: (call, callback) => {
    const task = call.request;
    console.log(task);
    Contact.create(task, (err, createdBlog) => {
      err ? console.log(err) : callback(null, createdBlog);
    });
  },
  update: (call, callback) => {
    const { id, name, contact_id } = call.request;
    Contact.findOneAndUpdate(
      { _id: id },
      { name: name, contact_id: contact_id }
    ).exec((err, updatedBlog) => {
      err ? console.log(err) : callback(null, updatedBlog);
    });
  },
  remove: (call, callback) => {
    const { id } = call.request;
    Contact.findOneAndDelete({ _id: id }).exec((err) => {
      if (err) {
        console.log(err);
        callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
      } else {
        callback(null, {});
      }
    });
  },
});
server.bindAsync(`localhost:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
  try {
      server.start();
      console.log('started on the ' + port);
  }
  catch (e) {
      console.log(e);
  }
});
console.log("Server running on localhost:30043");
