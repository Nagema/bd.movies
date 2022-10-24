const express = require("express");
require("dotenv").config();

const { connectDb } = require("./utils/db");

connectDb();

const PORT = process.env.PORT || 8080;

const server = express();

server.use("/", router);

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
