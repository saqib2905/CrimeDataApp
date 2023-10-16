import React from "react";
import { render, screen } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import SearchInput from "./SearchBar";
import { DataContextProvider } from "../../context/DataContext";

const theme = createTheme();

describe("SearchInput Component", () => {
  it("renders the SearchInput component", () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          {/* Use MemoryRouter to provide routing context */}
          <DataContextProvider>
            <SearchInput />
          </DataContextProvider>
        </MemoryRouter>
      </ThemeProvider>,
    );

    // Assert that the component renders as expected
    const searchBarElement = screen.getByText("Search");
    expect(searchBarElement).toBeInTheDocument();
  });
});
