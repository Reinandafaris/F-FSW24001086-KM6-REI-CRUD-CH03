const defaultRoute = require("./routes/defaultRoute");
const carRoutes = require("./routes/carRoutes");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/", defaultRoute);
app.use("/api/v1/cars", carRoutes);

module.exports = app;
