import React, { useState, useEffect } from "react";
import axios from "axios";
import Phonebook from "../Component/Phonebook";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AddRoute = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [fare, setFare] = useState("");
  const [cities, setCities] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [editingRoute, setEditingRoute] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // State for search terms
  const [fromCitySearchTerm, setFromCitySearchTerm] = useState("");
  const [toCitySearchTerm, setToCitySearchTerm] = useState("");
  const [companySearchTerm, setCompanySearchTerm] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cities");
        setCities(response.data.map((city) => city.name));
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/companies");
        setCompanies(response.data.map((company) => company.name));
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/routes");
        setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchCities();
    fetchCompanies();
    fetchRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const routeData = {
        fromCity,
        toCity,
        company: selectedCompany,
        fare,
      };

      if (editingRoute) {
        // Update existing route
        await axios.put(
          `http://localhost:3000/routes/${editingRoute._id}`,
          routeData
        );
        alert("Route updated successfully");
      } else {
        // Add new route
        await axios.post("http://localhost:3000/routes", routeData);
        alert("Route added successfully");
      }

      // Reset form and fetch updated routes
      setFromCity("");
      setToCity("");
      setSelectedCompany("");
      setFare("");
      setFromCitySearchTerm("");
      setToCitySearchTerm("");
      setCompanySearchTerm("");
      setEditingRoute(null);
      setOpenEditDialog(false);

      // Refresh the route list
      const response = await axios.get("http://localhost:3000/routes");
      setRoutes(response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred while adding/updating the route");
      }
      console.error(
        "Error adding/updating route:",
        error.response ? error.response.data : error
      );
    }
  };

  const handleEdit = (route) => {
    setFromCity(route.fromCity);
    setToCity(route.toCity);
    setSelectedCompany(route.company);
    setFare(route.fare);
    setEditingRoute(route);
    setOpenEditDialog(true);
  };

  const handleDelete = async (routeId) => {
    try {
      await axios.delete(`http://localhost:3000/routes/${routeId}`);
      alert("Route deleted successfully");

      // Remove deleted route from the list
      setRoutes(routes.filter((route) => route._id !== routeId));
    } catch (error) {
      console.error("Error deleting route:", error);
      alert("Unable to delete route");
    }
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setEditingRoute(null);
  };

  // Function to get company logo (placeholder function)
  const getCompanyLogo = (companyName) => {
    // Replace this with your logic to get the company logo
    return `path_to_logos/${companyName}.png`;
  };

  return (
    <div className="route">
      <h2>Select Route</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Phonebook
            placeholder="From"
            selectedNames={[toCity]}
            onSelectName={setFromCity}
            searchTerm={fromCitySearchTerm}
            onSearchTermChange={setFromCitySearchTerm}
            data={cities}
          />
        </div>
        <div>
          <Phonebook
            placeholder="To"
            selectedNames={[fromCity]}
            onSelectName={setToCity}
            searchTerm={toCitySearchTerm}
            onSearchTermChange={setToCitySearchTerm}
            data={cities}
          />
        </div>
        <div>
          <Phonebook
            placeholder="Company"
            selectedNames={[]}
            onSelectName={setSelectedCompany}
            searchTerm={companySearchTerm}
            onSearchTermChange={setCompanySearchTerm}
            data={companies}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Fare"
            className="search-input"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="search-button">
          {editingRoute ? "Update Route" : "Add Route"}
        </button>
      </form>

      {/* List of Routes */}
      <div className="routes-list">
        {routes.map((route, index) => (
          <div key={index} className="detail-card">
            <div className="cn">
              <h5>{route.company}</h5>
            </div>
            <div className="details">
              <div className="tf">
                <div>{route.fromCity}</div>
                <div>
                  <svg
                    className="img-fluid"
                    width="47"
                    height="16"
                    viewBox="0 0 47 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.5 8C0.5 8.236 0.598 8.462 0.772 8.628C0.946 8.795 1.182 8.889 1.429 8.889L43.328 8.889L37.484 14.481C37.398 14.563 37.329 14.662 37.283 14.77C37.236 14.878 37.212 14.994 37.212 15.11C37.212 15.227 37.236 15.343 37.283 15.451C37.329 15.559 37.398 15.657 37.484 15.739C37.571 15.822 37.673 15.888 37.786 15.932C37.899 15.977 38.02 16 38.142 16C38.264 16 38.385 15.977 38.497 15.932C38.61 15.888 38.713 15.822 38.799 15.739L46.227 8.629C46.314 8.547 46.382 8.449 46.429 8.341C46.476 8.233 46.5 8.117 46.5 8C46.5 7.883 46.476 7.767 46.429 7.659C46.382 7.551 46.314 7.453 46.227 7.371L38.799 0.261C38.713 0.178 38.61 0.113 38.497 0.068C38.385 0.023 38.264 0 38.142 0C38.02 0 37.899 0.023 37.786 0.068C37.673 0.113 37.571 0.178 37.484 0.261C37.398 0.343 37.329 0.441 37.283 0.549C37.236 0.657 37.212 0.773 37.212 0.89C37.212 1.007 37.236 1.123 37.283 1.23C37.329 1.338 37.398 1.437 37.484 1.519L43.328 7.111L1.429 7.111C1.182 7.111 0.946 7.206 0.772 7.373C0.598 7.539 0.5 7.766 0.5 8Z"
                      fill="#9F9F9F"
                    ></path>
                  </svg>
                </div>
                <div>{route.toCity}</div>
              </div>
              <div className="fb">{route.fare} PKR</div>
              <div className="actions">
                <IconButton color="primary" onClick={() => handleEdit(route)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(route._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Route Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingRoute ? "Edit Route" : "Add Route"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="From City"
            type="text"
            fullWidth
            variant="outlined"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
          />
          <TextField
            margin="dense"
            label="To City"
            type="text"
            fullWidth
            variant="outlined"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Company"
            type="text"
            fullWidth
            variant="outlined"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Fare"
            type="number"
            fullWidth
            variant="outlined"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingRoute ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRoute;
