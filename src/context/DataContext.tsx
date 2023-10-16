import React, { createContext, useContext, useState, ReactNode } from "react";
import CrimeType from "../types/Crime.types";

// Global state
interface DataContextProps {
  crimeData: CrimeType[];
  validPostcodes: string[];
  historicSearches: string[];
  selectedPostcode: string | null;
  setValidPostcodes: React.Dispatch<React.SetStateAction<string[]>>;
  setHistoricSearches: React.Dispatch<React.SetStateAction<string[]>>;
  setCrimeData: React.Dispatch<React.SetStateAction<CrimeType[]>>;
  setSelectedPostcode: React.Dispatch<React.SetStateAction<string | null>>;
  handleSearch: React.Dispatch<React.SetStateAction<string[]>>;
}
const DataContext = createContext<DataContextProps | undefined>(undefined);

// custom hook to access DataContext
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

type Props = {
  children?: React.ReactNode;
};

export const DataContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize global state variables
  const [crimeData, setCrimeData] = useState<CrimeType[]>([]);
  const [validPostcodes, setValidPostcodes] = useState<string[]>([]);
  const [historicSearches, setHistoricSearches] = useState<string[]>([]);
  const [selectedPostcode, setSelectedPostcode] = useState<string | null>(null);

  // handleSearch function to update global state
  const handleSearch = (newValidPostcodes: React.SetStateAction<string[]>) => {
    setValidPostcodes(newValidPostcodes);
  };

  // context value with global state and functions
  const contextValue: DataContextProps = {
    crimeData,
    validPostcodes,
    historicSearches,
    selectedPostcode,
    setCrimeData,
    setValidPostcodes,
    setHistoricSearches,
    setSelectedPostcode,
    handleSearch,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};
