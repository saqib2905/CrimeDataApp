import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CrimeTable from "../../components/crimeTable/CrimeTable";
import { useDataContext } from "../../context/DataContext";
import CrimeType from "../../types/Crime.types";
import { useParams } from "react-router-dom";
import { fetchCrimeData, fetchPostcodeData } from "../../utils/utils";

const DataView: React.FC = () => {
  const { setSelectedPostcode, setCrimeData } = useDataContext();
  const { postcode } = useParams<{ postcode: string }>();
  const [crimeData, setLocalCrimeData] = useState<CrimeType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize as loading
  useEffect(() => {
    const fetchData = async () => {
      if (postcode) {
        try {
          const postcodeData = await fetchPostcodeData(postcode);
          const { latitude, longitude } = postcodeData.data;
          const crimePostcodeData = await fetchCrimeData(latitude, longitude);
          setLocalCrimeData(crimePostcodeData);
          setSelectedPostcode(postcode);
          setCrimeData(crimePostcodeData); // Set global crimeData here
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [postcode, setSelectedPostcode, setCrimeData]);

  return (
    <div>
      <Typography variant="h3">Postcode: {postcode?.toUpperCase()}</Typography>
      <CrimeTable crimeData={crimeData} isLoading={isLoading} />
    </div>
  );
};

export default DataView;
