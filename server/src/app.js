const express = require("express");
const cors = require("cors");

const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/category", categoryRoutes);

module.exports = app;