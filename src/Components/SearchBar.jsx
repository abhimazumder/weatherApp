import { useEffect, useState, useCallback } from "react";
import {
  Autocomplete,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  Paper,
  Popper,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ReactCountryFlag from "react-country-flag";
import PropTypes from "prop-types";
import { getGeoCode } from "../Controllers/SearchController";

const SearchBar = ({ updateSelectedOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      if (searchText?.length > 0) {
        setLoading(true);
        const res = await getGeoCode(searchText);
        setSearchResults(res);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchTextChange = useCallback((_, newInputValue) => {
    setSearchText(newInputValue);
  }, []);

  const handleClearSearchText = useCallback(() => {
    setSearchText("");
    setSelectedOption(null);
  }, []);

  const handleSelectedValueChange = useCallback(
    (_, newValue) => {
      setSelectedOption(newValue);
      localStorage.setItem("geoCode", JSON.stringify(newValue));
      newValue && updateSelectedOption(newValue);
    },
    [updateSelectedOption]
  );

  const handleClearOptions = useCallback(() => {
    setSearchResults([]);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Autocomplete
        fullWidth
        loading={loading}
        options={searchResults}
        value={selectedOption}
        noOptionsText={"No results found"}
        PaperComponent={(props) => (
          <Paper elevation={8} {...props} sx={{ borderRadius: "16px" }} />
        )}
        PopperComponent={({ style, ...props }) => (
          <Popper
            {...props}
            style={{
              ...style,
              opacity: searchText.length > 0 ? "1" : "0",
            }}
          />
        )}
        getOptionLabel={(option) => `${option.name}`}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        onInputChange={handleSearchTextChange}
        onChange={handleSelectedValueChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            border: "2px solid white",
            borderRadius: "26px",
            padding: "8px",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            onBlur={handleClearOptions}
            value={searchText}
            placeholder="Search for a city..."
            InputProps={{
              ...params.InputProps,
              style: { color: "white" },
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    position: "absolute",
                    right: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <IconButton
                    aria-label="clear"
                    onClick={handleClearSearchText}
                  >
                    <ClearIcon sx={{ color: "white" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => {
          props.key = option.id;
          return (
            <li {...props}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <ReactCountryFlag countryCode={option.country_code} svg />
                <Typography variant="body" sx={{ fontSize: "16px" }}>
                  {option.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "GrayText" }}>
                  {`${option?.admin1 || ""} `}
                  {`${option?.admin2 || ""} `}
                  {`${option?.admin3 || ""} `}
                  {`${option?.admin4 || ""} `}
                  {`${option?.country || ""}`}
                </Typography>
              </div>
            </li>
          );
        }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  updateSelectedOption: PropTypes.any,
};

export default SearchBar;
