const Route = require("../Modal/Rout"); // Adjust the path as necessary

const addRoute = async (req, res) => {
  try {
    const { fromCity, toCity, company, fare } = req.body;

    if (!fromCity || !toCity || !company || !fare) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the route with the same fromCity, toCity, and company already exists
    const existingRoute = await Route.findOne({ fromCity, toCity, company });

    if (existingRoute) {
      return res.status(400).json({
        message: "This route already exists",
      });
    }

    // If the route doesn't exist, create a new one
    const newRoute = new Route({
      fromCity,
      toCity,
      company,
      fare,
    });

    await newRoute.save();

    res
      .status(201)
      .json({ message: "Route added successfully", route: newRoute });
  } catch (error) {
    console.error("Error adding route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.status(200).json(route);
  } catch (error) {
    res.status(400).json({ message: "Unable to update route", error });
  }
};
const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete route", error });
  }
};
const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch routes", error });
  }
};

module.exports = {
  addRoute,
  updateRoute,
  deleteRoute,
  getRoutes,
};
