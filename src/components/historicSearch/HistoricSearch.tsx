import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Link,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink, useNavigate } from "react-router-dom";

interface HistoricSearchProps {
  historicSearches: string[];
  setHistoricSearches: (searches: string[]) => void;
}

const HistoricSearch: React.FC<HistoricSearchProps> = ({ historicSearches, setHistoricSearches }) => {
  const navigate = useNavigate();
  // Load historic searches from localStorage on component mount
  useEffect(() => {
    const storedSearches = localStorage.getItem("historicSearch");
    if (storedSearches) {
      setHistoricSearches(JSON.parse(storedSearches));
    }
  }, [historicSearches, setHistoricSearches]);
  const handleRemovePostcode = (postcode: string) => {
    const updatedHistoricSearches = historicSearches.filter((search) => search !== postcode);
    setHistoricSearches(updatedHistoricSearches);
    localStorage.setItem("historicSearch", JSON.stringify(updatedHistoricSearches));

    const updatedQuery = historicSearches.filter((search) => search !== postcode).join(",");
    navigate(`?postcodes=${updatedQuery}`);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" pt={4}>
        Historic Search
      </Typography>
      <List dense>
        {historicSearches.map((postcode) => (
          <ListItem key={postcode}>
            <ListItemText
              primary={postcode.toUpperCase()}
              secondary={
                <Link
                  key={postcode}
                  component={RouterLink}
                  to={`/data-view/${postcode}`}
                  color="#000"
                  underline="hover"
                >
                  <Typography component="span" data-testid={postcode}>
                    View the data
                  </Typography>
                </Link>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemovePostcode(postcode)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default HistoricSearch;
