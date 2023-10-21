import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useDataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [postcodesInput, setPostcodesInput] = useState<string>("");
  const { setHistoricSearches, handleSearch } = useDataContext();
  const navigate = useNavigate();

  const validateAndSubmit = (postcodesInput: string) => {
    if (postcodesInput === "") return;

    const postcodes = postcodesInput.split(",").map((pc) => {
      const formattedPostcode = pc.replace(/\s+/g, "").slice(0, 3) + " " + pc.replace(/\s+/g, "").slice(3);
      return formattedPostcode;
    });

    const existingHistoricSearches = new Set(JSON.parse(localStorage.getItem("historicSearch") || "[]") as string[]);
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
    <>
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
    </>
  );
};

export default SearchBar;
