const carControllers = require("../controllers/carControllers");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(carControllers.defaultRoute)

module.exports = router;
