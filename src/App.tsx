import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SearchInput from "./components/searchBar/SearchBar";
import DataView from "./pages/dataView/DataView";
import MapView from "./pages/mapView/MapView";
import logo from "./logo.svg";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data-view/:postcode" element={<DataView />} />
          <Route path="/map-view/:postcode" element={<MapView />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
