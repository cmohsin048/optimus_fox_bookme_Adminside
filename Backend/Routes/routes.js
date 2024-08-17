const express = require("express");
const router = express.Router();
const {
  addCompany,
  getallcompanies,
  updateCompany,
  deleteCompany,
} = require("../Controler/Companycontroler");
const {
  addCity,
  getAllCities,
  updateCity,
  deleteCity,
} = require("../Controler/Citycontroler");
const {
  addRoute,
  getRoutes,
  updateRoute,
  deleteRoute,
} = require("../Controler/Routcontroler");

router.post("/companies/add", addCompany);
router.post("/city/add", addCity);
router.post("/routes", addRoute);

router.get("/companies", getallcompanies);
router.get("/cities", getAllCities);

router.put("/city/update/:id", updateCity);
router.delete("/city/delete/:id", deleteCity);

router.put("/update/:id", updateCompany);
router.delete("/delete/:id", deleteCompany);

router.get("/routes", getRoutes);
router.put("/routes/:id", updateRoute);
router.delete("/routes/:id", deleteRoute);

module.exports = router;
