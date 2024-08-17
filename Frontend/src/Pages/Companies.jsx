import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
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
  const [image, setImage] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [companies, setCompanies] = React.useState([]);
  const [editingCompanyId, setEditingCompanyId] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  // Fetch all companies
  React.useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error(error);
        alert("Unable to fetch companies");
      }
    };
    fetchCompanies();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestPayload = {
        logo: image,
        name: companyName,
      };

      if (editingCompanyId) {
        // Update company
        await axios.put(
          `http://localhost:3000/update/${editingCompanyId}`,
          requestPayload
        );
        alert("Company updated successfully");
      } else {
        // Add new company
        await axios.post("http://localhost:3000/companies/add", requestPayload);
        alert("Company added successfully");
      }

      // Reset the form and modal state
      setImage("");
      setCompanyName("");
      setEditingCompanyId(null);
      setOpen(false);
      // await fetchCompanies(); // Comment this line to test
    } catch (error) {
      console.error("Error during company update:", error);
      alert("Unable to add/update company");
    }
  };

  const handleEdit = (company) => {
    setCompanyName(company.name);
    setImage(company.logo);
    setEditingCompanyId(company._id);
    setOpen(true); // Open the modal
  };

  const handleDelete = async (companyId) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${companyId}`);
      alert("Company deleted successfully");
      setCompanies(companies.filter((company) => company._id !== companyId)); // Remove deleted company from the list
    } catch (error) {
      // console.error(error);
      alert("Unable to delete company");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCompanyName(""); // Clear the input field when the modal is closed
    setImage(""); // Clear the image field when the modal is closed
    setEditingCompanyId(null);
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
            {editingCompanyId ? "Edit Company" : "Add Company"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* Image URL Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="image"
              label="Company Logo URL"
              name="image"
              autoComplete="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="companyName"
              label="Company Name"
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
              {editingCompanyId ? "Update Company" : "Add Company"}
            </Button>
          </Box>

          {/* List of Companies */}
          <List sx={{ width: "100%", mt: 2 }}>
            {companies.map((company) => (
              <ListItem key={company._id}>
                <img
                  src={company.logo}
                  alt={company.name}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 16,
                    borderRadius: "4px",
                  }}
                />
                <ListItemText primary={company.name} />
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(company)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(company._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>

      {/* Edit Company Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingCompanyId ? "Edit Company" : "Add Company"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="image"
            label="Company Logo URL"
            name="image"
            autoComplete="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {image && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <img
                src={image}
                alt="Company Logo"
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                  borderRadius: "4px",
                }}
              />
            </Box>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="companyName"
            label="Company Name"
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
            {editingCompanyId ? "Update Company" : "Add Company"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
