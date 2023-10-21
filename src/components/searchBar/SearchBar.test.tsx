import React from "react";
import { render, screen } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import Searchbar from "./SearchBar";
import { DataContextProvider } from "../../context/DataContext";

const theme = createTheme();

describe("SearchInput Component", () => {
  it("renders the SearchInput component", () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <DataContextProvider>
            <Searchbar />
          </DataContextProvider>
        </MemoryRouter>
      </ThemeProvider>,
    );

    const searchBarElement = screen.getByText("Search");
    expect(searchBarElement).toBeInTheDocument();
  });
});
