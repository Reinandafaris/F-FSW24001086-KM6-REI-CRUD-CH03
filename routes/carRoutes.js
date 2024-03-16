const carControllers = require("../controllers/carControllers");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(carControllers.getAllCars)
  .post(carControllers.createCar);

router
  .route("/:id")
  .get(carControllers.getCarById)
  .patch(carControllers.patchCar)
  .put(carControllers.putCar)
  .delete(carControllers.deleteCar);

module.exports = router;
