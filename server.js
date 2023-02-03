//Require modules/files
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Load env configs
dotenv.config({ path: "./config.env" });

//Require app.js
const app = require("./app");

//Database Connection String
const DB = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DB_USER_PASSWORD
);
//Currently, the default is set to true, which means that Mongoose
//will only query for fields that are explicitly defined in the schema.
// However, in version 7, the default will change to false, which means
// that Mongoose will query for all fields, even those that are not explicitly
// defined in the schema.
mongoose.set("strictQuery", false);

//DATABASE Connection
// mongoose.connect is a method in the Mongoose library that establishes
//a connection to a MongoDB database
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful!"));

// Run this system on port 3000
const port = process.env.PORT || 3000;

//start server
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
