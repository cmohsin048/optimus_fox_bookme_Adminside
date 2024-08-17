const Company = require("../Modal/Companymodal"); // Adjust the path as needed

// Controller function to add a new company
const addCompany = async (req, res) => {
  try {
    const { logo, name } = req.body;

    // Create a new company document
    const newCompany = new Company({
      logo,
      name,
    });

    // Save the company document to the database
    await newCompany.save();

    // Send a success response
    res.status(201).json({
      message: "Company added successfully",
      company: newCompany,
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
const getallcompanies = async (req, res) => {
  try {
    const companies = await Company.find(); // Fetch only the company names
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { logo, name } = req.body;
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { logo, name },
      { new: true }
    );
    if (!updatedCompany)
      return res.status(404).json({ message: "Company not found" });
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany)
      return res.status(404).json({ message: "Company not found" });
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addCompany,
  getallcompanies,
  updateCompany,
  deleteCompany,
};
