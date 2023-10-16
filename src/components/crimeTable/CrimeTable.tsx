import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  CircularProgress,
  Box,
} from "@mui/material";
import CrimeType from "../../types/Crime.types";

interface CrimeTableProps {
  crimeData: CrimeType[];
  isLoading: boolean;
}
const TableCellStyle = {
  width: "100px",
};

const CrimeTable: React.FC<CrimeTableProps> = ({ crimeData, isLoading }) => {
  return (
    <Container sx={{ mt: 2 }}>
      {isLoading ? (
        <Box display="flex" alignItems="center" justifyContent="center" height="200px">
          <CircularProgress />
        </Box>
      ) : crimeData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={TableCellStyle}>
                  <h4>Date of Crime</h4>
                </TableCell>
                <TableCell style={TableCellStyle}>
                  <h4>Category of Crime</h4>
                </TableCell>
                <TableCell style={TableCellStyle}>
                  <h4>Approximate Street Name</h4>
                </TableCell>
                <TableCell style={TableCellStyle}>
                  <h4>Outcome Status</h4>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {crimeData.map((crime: CrimeType, index: number) => (
                <TableRow key={index}>
                  <TableCell>{crime.month || "N/A"}</TableCell>
                  <TableCell>{crime.category}</TableCell>
                  <TableCell>
                    {crime.location && crime.location.street ? crime.location.street.name || "N/A" : "N/A"}
                  </TableCell>
                  <TableCell>
                    {crime.outcome_status ? crime.outcome_status.category || "On Going" : "On Going"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No crime data available</p>
      )}
    </Container>
  );
};

export default CrimeTable;
