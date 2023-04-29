const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv"); // getting env for env variable
dotenv.config();
require("./dbConfig"); // get db connection
const { MESSAGE } = require("./constant");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
require('./routes/index')(app); // get all routes file

app.listen(process.env.PORT, () => {
  console.log(`${MESSAGE.SERVER_RUNNING_PORT} ${process.env.PORT}`);
});

module.exports = app;
