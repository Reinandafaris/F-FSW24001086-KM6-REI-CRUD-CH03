const fs = require("fs");
const uuid = require("uuid");
const uniqeId = uuid.v4();

const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/data.json`)
);

const defaultRoute = (req, res) => {
  res.status(200).json({
    message: "Ping Successfully",
  });
};

const getAllCars = (req, res) => {
  res.status(200).json({
    status: "success",
    totalData: cars.length,
    data: cars,
    message: "Get all cars successfully",
  });
};

const getCarById = (req, res) => {
  const id = req.params.id;
  const car = cars.find((car) => car.id === id);

  if (!car) {
    return res.status(404).json({
      status: "fail",
      message: `Car ID: ${id} not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: car,
    message: "Get car successfully",
  });
};

const createCar = (req, res) => {
  const inputCar = req.body;

  if (Object.keys(inputCar).length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide car data",
    });
  }

  const newCar = {
    id: uniqeId,
    ...inputCar,
  };

  cars.push(newCar);

  fs.writeFile(
    `${__dirname}/../data/data.json`,
    JSON.stringify(cars, null, 2),
    (err) => {
      res.status(201).json({
        status: "success",
        data: newCar,
        message: "Car created successfully",
      });
    }
  );
};

const patchCar = (req, res) => {
  const id = req.params.id;
  const inputCar = req.body;

  const index = cars.findIndex((car) => car.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: `Car ID: ${id} not found`,
    });
  }

  const changedProperties = Object.keys(req.body);

  for (const property of changedProperties) {
    cars[index][property] = inputCar[property];
  }

  fs.writeFile(
    `${__dirname}/../data/data.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        data: cars[index],
        message: "Car updated successfully",
      });
    }
  );
};

const putCar = (req, res) => {
  const id = req.params.id;
  const inputCar = req.body;

  const index = cars.findIndex((car) => car.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: `Car ID: ${id} not found`,
    });
  }

  cars[index] = {
    id,
    ...inputCar,
  };

  fs.writeFile(
    `${__dirname}/../data/data.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        data: cars[index],
        message: "Car updated successfully",
      });
    }
  );
};

const deleteCar = (req, res) => {
  const id = req.params.id;
  const index = cars.findIndex((car) => car.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: `Car ID: ${id} not found`,
    });
  }

  cars.splice(index, 1);

  fs.writeFile(
    `${__dirname}/../data/data.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        data: null,
        message: "Car deleted successfully",
      });
    }
  );
};

module.exports = {
  defaultRoute,
  getAllCars,
  getCarById,
  createCar,
  patchCar,
  putCar,
  deleteCar,
};
