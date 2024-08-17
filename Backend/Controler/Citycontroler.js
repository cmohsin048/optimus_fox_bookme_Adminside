const City = require("../Modal/CityModal"); // Adjust the path as needed

// Controller function to add a new company
const addCity = async (req, res) => {
  try {
    const { name } = req.body;

    const newCity = new City({
      name,
    });

    await newCity.save();

    // Send a success response
    res.status(201).json({
      message: "Company added successfully",
      city: newCity,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      message: "Error adding company",
      error: error.message,
    });
  }
};
const getAllCities = async (req, res) => {
  try {
    // Fetch only the city names from the City collection
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCity = await City.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedCity) {
      return res.status(404).json({ message: "City not found" });
    }
    res
      .status(200)
      .json({ message: "City updated successfully", city: updatedCity });
  } catch (error) {
    res.status(500).json({ message: "Error updating city", error });
  }
};
const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCity = await City.findByIdAndDelete(id);
    if (!deletedCity) {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting city", error });
  }
};

module.exports = {
  addCity,
  getAllCities,
  updateCity,
  deleteCity,
};
