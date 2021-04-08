const grpc =require( "@grpc/grpc-js");
const dotenv=require("dotenv");
const protoLoader=require("@grpc/proto-loader");

dotenv.config();
const GRPC_PORT = process.env.GRPC_PORT||30043;
const PROTO_PATH = "src/grpc/tasks.proto";
const PROTO_PATH_CONTACT = "src/grpc/contacts.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});
const packageDefinitionforcontact = protoLoader.loadSync(PROTO_PATH_CONTACT, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});
const TaskService = grpc.loadPackageDefinition(packageDefinition).TaskService;
const client = new TaskService(
  `localhost:${GRPC_PORT}`,
  grpc.credentials.createInsecure()
);
const ContactService = grpc.loadPackageDefinition(packageDefinitionforcontact).ContactService;
const clientcontact = new ContactService(
  `localhost:${GRPC_PORT}`,
  grpc.credentials.createInsecure()
);
module.exports={client,clientcontact};