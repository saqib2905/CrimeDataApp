import React from "react";
import { render, screen } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import CrimeTable from "./CrimeTable";

const mockCrimeData = [
  {
    category: "anti-social-behaviour",
    location_type: "Force",
    location: {
      latitude: "51.453313",
      street: {
        id: 1651700,
        name: "On or near Gould Road",
      },
      longitude: "-0.428073",
    },
    context: "",
    outcome_status: null,
    persistent_id: "",
    id: 112529357,
    location_subtype: "",
    month: "2023-08",
  },
];

const theme = createTheme();

test("renders crime table correctly", () => {
  render(
    <ThemeProvider theme={theme}>
      <CrimeTable crimeData={mockCrimeData} isLoading={false} />
    </ThemeProvider>,
  );
  expect(screen.getByText("Date of Crime")).toBeInTheDocument();
  expect(screen.getByText("Approximate Street Name")).toBeInTheDocument();
  expect(screen.getByText("Outcome Status")).toBeInTheDocument();
  expect(screen.getByText("Category of Crime")).toBeInTheDocument();
});
