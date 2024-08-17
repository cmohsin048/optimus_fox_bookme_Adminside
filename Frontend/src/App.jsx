import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Companies from "./Pages/Companies";
import Cities from "./Pages/Cities";
import RoutesPage from "./Pages/Routes";
import Nav from "./Component/Nav";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Companies />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/routes" element={<RoutesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
