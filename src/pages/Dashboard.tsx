import React from "react";
import { Container } from "@mui/material";
import { useDataContext } from "../context/DataContext";
import HistoricSearch from "../components/historicSearch/HistoricSearch";
import SearchInput from "../components/searchBar/SearchBar";

const Dashboard = () => {
  const { historicSearches, setHistoricSearches } = useDataContext();

  return (
    <Container maxWidth="md" sx={{ paddingTop: "10px", mt: 4, border: "1px solid grey" }}>
      <SearchInput />
      <HistoricSearch historicSearches={historicSearches} setHistoricSearches={setHistoricSearches} />
    </Container>
  );
};

export default Dashboard;
