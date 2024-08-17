import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const defaultTheme = createTheme();

export default function AddCompany() {
  const [companyName, setCompanyName] = React.useState("");
  const [cities, setCities] = React.useState([]);
  const [editingCityId, setEditingCityId] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  // Fetch all cities
  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:3000/cities");
      setCities(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch cities");
    }
  };

  React.useEffect(() => {
    fetchCities();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestPayload = { name: companyName };
      let response;

      if (editingCityId) {
        // Update city
        response = await axios.put(
          `http://localhost:3000/city/update/${editingCityId}`,
          requestPayload
        );

        // Update the city in the state
        setCities((prevCities) =>
          prevCities.map((city) =>
            city._id === editingCityId ? response.data : city
          )
        );
        alert("City updated successfully");
      } else {
        // Add new city
        response = await axios.post(
          "http://localhost:3000/city/add",
          requestPayload
        );

        // Add the new city directly to the state
        setCities((prevCities) => [...prevCities, response.data]);
        alert("City added successfully");
      }

      // Reset form and modal state
      setCompanyName("");
      setEditingCityId(null);
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Unable to add/update city");
    }
  };

  const handleEdit = (city) => {
    setCompanyName(city.name);
    setEditingCityId(city._id);
    setOpen(true); // Open the modal
  };

  const handleDelete = async (cityId) => {
    try {
      await axios.delete(`http://localhost:3000/city/delete/${cityId}`);
      alert("City deleted successfully");

      // Remove deleted city from the list
      setCities(cities.filter((city) => city._id !== cityId));
    } catch (error) {
      console.error(error);
      alert("Unable to delete city");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCompanyName(""); // Clear the input field when the modal is closed
    setEditingCityId(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <BusinessOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add City
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="companyName"
              label="City Name"
              name="companyName"
              autoComplete="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {editingCityId ? "Update City" : "Add City"}
            </Button>
          </Box>

          {/* List of Cities */}
          <List sx={{ width: "100%", mt: 2 }}>
            {cities.map((city) => (
              <ListItem
                key={city._id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEdit(city)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(city._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={city.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>

      {/* Edit City Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingCityId ? "Edit City" : "Add City"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="companyName"
            label="City Name"
            name="companyName"
            autoComplete="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingCityId ? "Update City" : "Add City"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
