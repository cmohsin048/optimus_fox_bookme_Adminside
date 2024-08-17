const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const routes = require("./Routes/routes");
const app = express();
const port = process.env.PORT || 3200;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/", routes);
const start = async () => {
  try {
    await db(process.env.mongo_uri);
    app.listen(port, () => console.log(`app is running on port : ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
