import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import HistoricSearch from "../historicSearch/HistoricSearch";
import { useDataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [postcodesInput, setPostcodesInput] = useState<string>("");
  const { historicSearches, setHistoricSearches, handleSearch } = useDataContext();
  const navigate = useNavigate();

  const validateAndSubmit = (postcodesInput: string) => {
    if (postcodesInput === "") return;

    const postcodes = postcodesInput
      .split(",")
      .map((pc) => pc.trim())
      .map((pc) => (/\s/.test(pc) ? pc : pc.slice(0, -3) + " " + pc.slice(-3)));

    const existingHistoricSearches = JSON.parse(localStorage.getItem("historicSearch") || "[]");
    const updatedHistoricSearches = Array.from(new Set([...existingHistoricSearches, ...postcodes]));

    setHistoricSearches(updatedHistoricSearches);
    localStorage.setItem("historicSearch", JSON.stringify(updatedHistoricSearches));
    handleSearch(postcodes);
    navigate(`?postcodes=${postcodes.join(",")}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostcodesInput(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: "10px", mt: 4, border: "1px solid grey" }}>
      <Typography variant="h4" pb={4}>
        Search Crime Data
      </Typography>
      <TextField
        id="outlined-search"
        label="Search For Crimes Data..."
        type="search"
        value={postcodesInput}
        onChange={handleInputChange}
        placeholder="postcodes (comma-separated)"
        size="small"
        sx={{ paddingRight: "4px" }}
      />
      <Button variant="outlined" sx={{ height: "40px" }} onClick={() => validateAndSubmit(postcodesInput)}>
        Search
      </Button>
      <HistoricSearch historicSearches={historicSearches} setHistoricSearches={setHistoricSearches} />
    </Container>
  );
};

export default SearchInput;
