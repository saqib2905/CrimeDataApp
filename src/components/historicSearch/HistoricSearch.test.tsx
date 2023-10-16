import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HistoricSearch from "./HistoricSearch";
import { fireEvent } from "@testing-library/react";

describe("HistoricSearch Component", () => {
  it("renders historic search items and handles removal", () => {
    const historicSearches = ["AB1 2CD", "DE3 4FG", "GH5 6IJ"];
    const setHistoricSearches = jest.fn();

    render(
      <MemoryRouter>
        <HistoricSearch historicSearches={historicSearches} setHistoricSearches={setHistoricSearches} />
      </MemoryRouter>,
    );
    const viewDataLinks = screen.getAllByText("View the data");

    // interact and assert on each link separately
    viewDataLinks.forEach((link) => {
      fireEvent.click(link);

      // Check if items are rendered
      historicSearches.forEach((postcode) => {
        expect(screen.getByText(postcode.toUpperCase())).toBeInTheDocument();
      });

      // Check if "View the data" link rendered
      expect(link).toBeInTheDocument();

      // Check if delete btns rendered and simulate a click to remove a postcode
      const deleteButtons = screen.getAllByLabelText("delete");
      fireEvent.click(deleteButtons[0]);

      // Ensure setHistoricSearches is called with updated searches
      expect(setHistoricSearches).toHaveBeenCalledWith(["DE3 4FG", "GH5 6IJ"]);
    });
  });
});
